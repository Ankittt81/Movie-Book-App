import { Form, Input, Button,message } from "antd";
import React from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { LoginUser } from "../apiCalls/user";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate=useNavigate()

  const loginData=async (values)=>{
    try {
       const response = await LoginUser(values);
      if (response.success) {
        message.success("Successfully Registered");
        navigate("/");
        localStorage.setItem("token",response.token)
        
      } else {
        message.error(response.message || "Registration failed");
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      message.error("An unexpected network error occurred.");
    }
  }
  return (
    <div className="auth-container">
      <h1>Login for Movie Book</h1>
      <Form layout="vertical" onFinish={loginData}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your Email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p className="switch-text">
        New User? <Link to={"/register"}>Register Here!</Link>
      </p>
    </div>
  );
}

export default Login;
