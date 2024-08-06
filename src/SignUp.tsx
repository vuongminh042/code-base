import { Button, Form, FormProps, Input, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

type FieldType = {
    username?: string;
    email?: string;
    password?: string;
};

const onFinish: FormProps<FormData>['onFinish'] = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/signup', user)
        message.success('Sign up successful')
        return response.data
    } catch (error) {
        console.error(error);
        message.error('Sign up failed')
    }
}

const onFinishFailed: FormProps<FormData>['onFinishFailed'] = (error) => {
    console.log('Failed', error);
}

const SignUp: React.FC = () => (
    <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
            <Link to='/signin' type="primary">
                Sign In
            </Link>
        </Form.Item>
    </Form>
);

export default SignUp;