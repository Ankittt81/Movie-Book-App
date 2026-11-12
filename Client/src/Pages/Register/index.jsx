import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../apiCalls/user";

function Register() {
  const navigate = useNavigate();

  const registerData = async (values) => {
    try {
      const response = await registerUser(values);
      message.success(response.message);
      navigate("/login");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <main className="App-header">
      <h1>Register for Movie Book</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={registerData}>
          <Form.Item
            label="Name"
            htmlFor="name"
            name="name"
            className="d-block"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input id="name" type="text" placeholder="Enter your Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            htmlFor="email"
            name="email"
            className="d-block"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your Email!" },
            ]}
          >
            <Input id="email" type="text" placeholder="Enter your Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            htmlFor="password"
            name="password"
            className="d-block"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 8, message: "Password must be at least 8 characters" },
              { max: 72, message: "Password must be at most 72 characters" },
            ]}
          >
            <Input id="password" type="password" placeholder="Enter your Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p>
            Already a user? <Link to="/login">Login Now</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;