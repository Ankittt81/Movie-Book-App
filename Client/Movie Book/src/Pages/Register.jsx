import React from "react";
import { Form, Input, Button, message } from "antd";
import "./auth.css";
import { Link } from "react-router-dom";
import {RegisterUser} from '../apiCalls/user'

function Register() {
 const registerData = async (values) => {
   // console.log('values',values)
   try {
    const response = await RegisterUser(values);
    if (response.success) {
      message.success("Successfully Registered");
    } else {
      message.error(response.message || "Registration failed");
    }
    console.log(response);
   } catch (error) {
     console.error(error);
     message.error("An unexpected network error occurred.");
   }
   
 };
 

  return (
    <div className="auth-container">
      <h1>Register for Movie Book</h1>
      <Form layout="vertical" onFinish={registerData}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

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
            Register
          </Button>
        </Form.Item>
      </Form>
      <p className="switch-text">
        Already a user? <Link to={"/login"}>Login Now</Link>
      </p>
    </div>
  );
}

export default Register;
