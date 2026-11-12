import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../apiCalls/user";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/loaderSlice";

const { Header } = Layout;

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
  </div>
);

// roles (optional): e.g. roles={["ADMIN"]} lets only admins see the page
function ProtectedRoute({ children, roles }) {
  const { user } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      dispatch(setUser(response.data));
    } catch (err) {
      dispatch(setUser(null));
      localStorage.removeItem("token");
      message.error("Please login again");
      navigate("/login");
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    if (!user) {
      loadUser();
    }
  }, []);

  const hasAccess = !roles || (user && roles.some((r) => user.roles.includes(r)));

  useEffect(() => {
    if (user && !hasAccess) {
      message.error("You do not have access to that page");
      navigate("/");
    }
  }, [user, hasAccess]);

  if (!user) {
    return loading ? <Loader /> : null;
  }
  if (!hasAccess) {
    return null;
  }

  const isPartner = user.roles.includes("PARTNER");
  const isAdmin = user.roles.includes("ADMIN");

  const navItems = [
    { key: "/", label: "Home", icon: <HomeOutlined /> },
    {
      key: "account",
      label: user.name,
      icon: <UserOutlined />,
      children: [
        { key: "/profile", label: "My Bookings", icon: <ProfileOutlined /> },
        ...(isPartner
          ? [{ key: "/partner", label: "Partner Panel", icon: <VideoCameraOutlined /> }]
          : []),
        ...(isAdmin
          ? [{ key: "/admin", label: "Admin Panel", icon: <SettingOutlined /> }]
          : []),
        { key: "logout", label: "Log Out", icon: <LogoutOutlined /> },
      ],
    },
  ];

  const onMenuClick = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token");
      dispatch(setUser(null));
      navigate("/login");
    } else {
      navigate(key);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h3 className="text-white m-0">Book My Show</h3>
          <Menu
            theme="dark"
            mode="horizontal"
            items={navItems}
            selectable={false}
            onClick={onMenuClick}
          />
        </Header>
        <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
          {children}
        </div>
      </Layout>
    </>
  );
}

export default ProtectedRoute;