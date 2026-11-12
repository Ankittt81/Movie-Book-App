import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../apiCalls/user";
import { setUser } from "../../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginData = async (values) => {
    try {
      const result = await loginUser(values);
      localStorage.setItem("token", result.token);
      dispatch(setUser(result.user));
      message.success(result.message);
      navigate("/");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <main className="App-header">
      <h1>Login for Movie Book</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={loginData}>
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
            rules={[{ required: true, message: "Please input your password!" }]}
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <div>
          <p>
            New User? <Link to="/register">Register Here!</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;