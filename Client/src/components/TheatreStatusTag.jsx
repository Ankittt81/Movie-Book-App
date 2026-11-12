import { Tag } from "antd";

const VIEW = {
  ACTIVE: { color: "green", text: "Approved" },
  PENDING: { color: "orange", text: "Pending approval" },
  BLOCKED: { color: "red", text: "Blocked" },
};

const TheatreStatusTag = ({ status }) => {
  const v = VIEW[status] || { color: "default", text: status };
  return <Tag color={v.color}>{v.text}</Tag>;
};

export default TheatreStatusTag;