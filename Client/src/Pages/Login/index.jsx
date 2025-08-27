import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../../apiCalls/user";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  //console.log(localStorage.getItem("token"));
  const loginData = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        message.error(response.message);
      }
      console.log(response);
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <>
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your Password"
              />
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
              New User? <Link to={"/register"}>Register Here!</Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
