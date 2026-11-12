import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import { createMovie, updateMovie } from "../../apiCalls/movies";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const { TextArea } = Input;

const LANGUAGES = ["English", "Hindi", "Punjabi", "Telugu", "Bengali", "German"];
const GENRES = ["Action", "Comedy", "Horror", "Love", "Patriot", "Bhakti", "Thriller", "Mystery"];
const toOptions = (list) => list.map((v) => ({ value: v, label: v }));

// movie = null means "add", otherwise "edit"
const MovieForm = ({ movie, onClose, onSaved }) => {
  const dispatch = useDispatch();
  const isEdit = !!movie;

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const payload = { ...values, duration: Number(values.duration) };
      const response = isEdit
        ? await updateMovie(movie.id, payload)
        : await createMovie(payload);
      message.success(response.message);
      onSaved();
      onClose();
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <Modal
      centered
      open
      title={isEdit ? "Edit Movie" : "Add Movie"}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form layout="vertical" initialValues={movie} onFinish={onFinish}>
        <Form.Item
          label="Movie Name"
          name="title"
          rules={[{ required: true, message: "Movie name is required!" }]}
        >
          <Input placeholder="Enter the movie name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea rows={4} placeholder="Enter the description" />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Duration (min)"
              name="duration"
              rules={[{ required: true, message: "Duration is required!" }]}
            >
              <Input type="number" min={1} placeholder="e.g. 130" />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Language"
              name="language"
              rules={[{ required: true, message: "Language is required!" }]}
            >
              <Select placeholder="Select language" options={toOptions(LANGUAGES)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[{ required: true, message: "Release date is required!" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[{ required: true, message: "Genre is required!" }]}
            >
              <Select placeholder="Select genre" options={toOptions(GENRES)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={16}>
            <Form.Item label="Poster URL" name="poster">
              <Input placeholder="https://..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button block type="primary" htmlType="submit" style={{ fontWeight: 600 }}>
            {isEdit ? "Save changes" : "Submit"}
          </Button>
          <Button className="mt-3" block onClick={onClose}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MovieForm;