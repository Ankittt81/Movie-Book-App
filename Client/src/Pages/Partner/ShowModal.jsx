import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Modal, Row, Select, Table, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";
import { createShow, getShowsOfTheatre } from "../../apiCalls/shows";
import { getMovies } from "../../apiCalls/movies";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const ShowModal = ({ theatre, onClose }) => {
  const [view, setView] = useState("table"); // "table" | "form"
  const [shows, setShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      dispatch(showLoading());
      const [movieRes, showRes] = await Promise.all([
        getMovies({ pageSize: 50 }),
        getShowsOfTheatre(theatre.id, 0, 50),
      ]);
      setMovies(movieRes.data);
      setShows(
        [...showRes.data].sort((a, b) => a.startTime.localeCompare(b.startTime))
      );
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await createShow({
        movieId: values.movieId,
        theatreId: theatre.id,
        startTime: values.startTime, // "YYYY-MM-DDTHH:mm" from datetime-local
        ticketPrice: Number(values.ticketPrice),
        rowCount: Number(values.rowCount),
        seatsPerRow: Number(values.seatsPerRow),
      });
      message.success(response.message);
      setView("table");
      await loadData();
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const columns = [
    { title: "Movie", dataIndex: "movieTitle" },
    {
      title: "Starts",
      dataIndex: "startTime",
      render: (t) => moment(t).format("MMM Do YYYY, hh:mm A"),
    },
    {
      title: "Ends",
      dataIndex: "endTime",
      render: (t) => moment(t).format("hh:mm A"),
    },
    { title: "Ticket Price", dataIndex: "ticketPrice", render: (p) => `Rs. ${Number(p)}` },
    {
      title: "Seats",
      render: (_, s) => `${s.totalSeats} (${s.rowCount} x ${s.seatsPerRow})`,
    },
  ];

  return (
    <Modal centered open title={theatre.name} onCancel={onClose} footer={null} width={1000}>
      <div className="d-flex justify-content-between">
        <h3>{view === "table" ? "List of Shows" : "Add Show"}</h3>
        {view === "table" && (
          <Button type="primary" onClick={() => setView("form")}>
            Add Show
          </Button>
        )}
      </div>

      {view === "table" && <Table rowKey="id" dataSource={shows} columns={columns} />}

      {view === "form" && (
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Movie"
                name="movieId"
                rules={[{ required: true, message: "Select a movie!" }]}
              >
                <Select
                  placeholder="Select movie"
                  options={movies.map((m) => ({ value: m.id, label: m.title }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Start date & time"
                name="startTime"
                rules={[{ required: true, message: "Start time is required!" }]}
              >
                <Input type="datetime-local" min={moment().format("YYYY-MM-DDTHH:mm")} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Ticket price (Rs.)"
                name="ticketPrice"
                rules={[{ required: true, message: "Ticket price is required!" }]}
              >
                <Input type="number" min={1} placeholder="e.g. 250" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Rows (1 to 26)"
                name="rowCount"
                rules={[{ required: true, message: "Rows are required!" }]}
              >
                <Input type="number" min={1} max={26} placeholder="e.g. 8" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Seats per row (1 to 30)"
                name="seatsPerRow"
                rules={[{ required: true, message: "Seats per row are required!" }]}
              >
                <Input type="number" min={1} max={30} placeholder="e.g. 12" />
              </Form.Item>
            </Col>
          </Row>
          <div className="d-flex gap-10">
            <Button block htmlType="button" onClick={() => setView("table")}>
              <ArrowLeftOutlined /> Go Back
            </Button>
            <Button block type="primary" htmlType="submit" style={{ fontWeight: 600 }}>
              Add the Show
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
};

export default ShowModal;