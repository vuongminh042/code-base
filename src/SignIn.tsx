
import React from 'react';
import { Button, Form, FormProps, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

type FormData = {
    email?: string;
    password?: string;
};

const onFinish: FormProps<FormData>['onFinish'] = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/signin', user)
        message.success('Sign in successful')
        return response.data
    } catch (error) {
        console.error(error);
        message.error('Sign in failed')
    }
}

const onFinishFailed: FormProps<FormData>['onFinishFailed'] = (error) => {
    console.log('Failed', error)
}

const SignIn: React.FC = () => (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1>Sign In</h1>
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

            <Form.Item<FormData>
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FormData>
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
                <Link type="primary" to="/products">
                    Back to product list
                </Link>
            </Form.Item>
        </Form>
    </div>
);

export default SignIn;
