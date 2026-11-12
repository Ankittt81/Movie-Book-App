import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Table, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { getMyTheatres } from "../../apiCalls/theatres";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import TheatreStatusTag from "../../components/TheatreStatusTag";
import TheatreFormModal from "./TheatreFormModal";
import ShowModal from "./ShowModal";

const TheatreList = () => {
  const [theatres, setTheatres] = useState([]);
  const [selected, setSelected] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [showsOpen, setShowsOpen] = useState(false);
  const dispatch = useDispatch();

  const loadTheatres = async () => {
    try {
      dispatch(showLoading());
      const response = await getMyTheatres(0, 50);
      setTheatres(response.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    loadTheatres();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Address",
      render: (_, t) => `${t.address}, ${t.city}`,
    },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <TheatreStatusTag status={status} />,
    },
    {
      title: "Action",
      render: (_, t) => (
        <div className="d-flex align-items-center gap-10">
          <Button
            onClick={() => {
              setSelected(t);
              setFormOpen(true);
            }}
          >
            <EditOutlined />
          </Button>
          {t.status === "ACTIVE" && (
            <Button
              onClick={() => {
                setSelected(t);
                setShowsOpen(true);
              }}
            >
              Shows
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button
          type="primary"
          onClick={() => {
            setSelected(null);
            setFormOpen(true);
          }}
        >
          Add Theatre
        </Button>
      </div>

      <Table rowKey="id" dataSource={theatres} columns={columns} />

      {formOpen && (
        <TheatreFormModal
          theatre={selected}
          onClose={() => setFormOpen(false)}
          onSaved={loadTheatres}
        />
      )}
      {showsOpen && <ShowModal theatre={selected} onClose={() => setShowsOpen(false)} />}
    </>
  );
};

export default TheatreList;