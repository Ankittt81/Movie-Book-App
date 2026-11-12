import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { createTheatre, updateTheatre } from "../../apiCalls/theatres";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

const { TextArea } = Input;

// theatre = null means "add", otherwise "edit"
const TheatreFormModal = ({ theatre, onClose, onSaved }) => {
  const dispatch = useDispatch();
  const isEdit = !!theatre;

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = isEdit
        ? await updateTheatre(theatre.id, values)
        : await createTheatre(values);
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
      title={isEdit ? "Edit Theatre" : "Add Theatre"}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Form layout="vertical" initialValues={theatre} onFinish={onFinish}>
        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Theatre name is required!" }]}
        >
          <Input placeholder="Enter the theatre name" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <TextArea rows={3} placeholder="Enter the address" />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "City is required!" }]}
            >
              <Input placeholder="Enter the city" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Phone is required!" }]}
            >
              <Input type="tel" placeholder="Enter the phone number" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required!" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="Enter the email" />
        </Form.Item>
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

export default TheatreFormModal;