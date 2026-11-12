import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Segmented, Table, message } from "antd";
import { changeTheatreStatus, getTheatresByStatus } from "../../apiCalls/theatres";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import TheatreStatusTag from "../../components/TheatreStatusTag";

const TheatreTable = () => {
  const [status, setStatus] = useState("PENDING");
  const [theatres, setTheatres] = useState([]);
  const dispatch = useDispatch();

  const loadTheatres = async () => {
    try {
      dispatch(showLoading());
      const response = await getTheatresByStatus(status, 0, 50);
      setTheatres(response.data);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    loadTheatres();
  }, [status]);

  const updateStatus = async (id, newStatus) => {
    try {
      dispatch(showLoading());
      const response = await changeTheatreStatus(id, newStatus);
      message.success(response.message);
      await loadTheatres();
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Address", render: (_, t) => `${t.address}, ${t.city}` },
    { title: "Owner", dataIndex: "ownerName" },
    { title: "Phone", dataIndex: "phone" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "status",
      render: (s) => <TheatreStatusTag status={s} />,
    },
    {
      title: "Action",
      render: (_, t) => (
        <div className="d-flex gap-10">
          {t.status === "PENDING" && (
            <Button type="primary" onClick={() => updateStatus(t.id, "ACTIVE")}>
              Approve
            </Button>
          )}
          {t.status === "BLOCKED" && (
            <Button onClick={() => updateStatus(t.id, "ACTIVE")}>Unblock</Button>
          )}
          {t.status !== "BLOCKED" && (
            <Button danger onClick={() => updateStatus(t.id, "BLOCKED")}>
              Block
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Segmented
        className="mb-3"
        value={status}
        onChange={setStatus}
        options={[
          { label: "Pending", value: "PENDING" },
          { label: "Approved", value: "ACTIVE" },
          { label: "Blocked", value: "BLOCKED" },
        ]}
      />
      <Table rowKey="id" dataSource={theatres} columns={columns} />
    </>
  );
};

export default TheatreTable;