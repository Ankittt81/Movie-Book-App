import { Tabs } from "antd";
import Bookings from "./Bookings";

const User = () => {
  const items = [{ key: "1", label: "Bookings", children: <Bookings /> }];
  return (
    <>
      <h1>My Profile</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default User;