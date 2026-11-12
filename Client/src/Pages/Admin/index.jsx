import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatreTable from "./TheatreTable";

const Admin = () => {
  const items = [
    { key: "1", label: "Movies", children: <MovieList /> },
    { key: "2", label: "Theatres", children: <TheatreTable /> },
  ];
  return (
    <>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default Admin;