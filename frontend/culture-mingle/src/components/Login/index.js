import styles from "./login.module.css"
import axios from 'axios';
import { Layout, Space } from 'antd';
import { Button, Form, Input} from 'antd';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const { Footer,Content } = Layout;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
    textalign: 'center'
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
    textalign: 'center',
};

const Login = () => {
    const [form] = Form.useForm();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const wholeform = {
        username: name,
        password: password,
    }
    const onFinish = async(e) => {
        console.log(wholeform);
        console.log(e);
        try {
            axios.post(
                'http://localhost:8080/api/auth/signin',
                wholeform,
            ).then(
                res=>{
                    console.log(res.data.id);
                    setUserId(res.data.id);
                    localStorage.setItem("userId", res.data.id);
                    localStorage.setItem("userName", res.data.username);
                    localStorage.setItem("userEmail", res.data.email);
                    navigate('/',{replace:true});
                    window.location.reload();
                }
            ).catch((error)=>{
                console.log(error.response.data.message);
                setMessage("Invalid account or password!");
            })
        } catch (err) {
            console.log(err);
            alert('Invalid account or password!');
        }
    };
    const onReset = () => {
        form.resetFields();
    };

    return (
        <Space direction="vertical" size={[0, 48]} className={styles.spaceStyle}>
            <Layout>
                <Layout>
                    <Content className={styles.contentStyle} data-testid="content">
                        <div className={styles.logo}>
                            <br/>
                        </div>
                        <div className={styles.content}>
                            <Form {...layout} form={form} name="control-hooks"
                                onFinish={onFinish}
                                className={styles.formStyle} size="large">
                                {/* email */}
                                {/* <Form.Item name="email" label="E-mail"
                                    rules={[
                                        { required: true, message: "Please input your email address.", },
                                        { type: 'email', message: "Please input a valid email address." }
                                    ]}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                    <Input size="large" />
                                </Form.Item> */}

                                {/* name */}
                                <Form.Item name="name" label="Username"
                                    rules={[
                                        { required: true, message: "Please input your name." },
                                        {min: 3, message:'Username should be at least 3 characters in length.'},
                                        {max: 20, message:'Username should be at most 20 characters in length.'}
                                    ]}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                    <Input />
                                </Form.Item>
                                {/* Password */}
                                <Form.Item name='password' label="Password"
                                    rules={[
                                        { required: true, message: 'Please input your password.', }
                                    ]}
                                    onChange={(e) => setPassWord(e.target.value)}
                                >
                                    <Input.Password size="large" />
                                </Form.Item>

                                {/* Button */}
                                <Form.Item {...tailLayout}>
                                    <div className={styles.hint}>{message}</div>
                                    <Button type="primary" htmlType="submit" className={styles.buttonStyle} data-testid="submit">
                                        Submit
                                    </Button>
                                    <Button htmlType="button" onClick={onReset} style={{ background: "white" }} className={styles.buttonStyle}>
                                        Reset
                                    </Button>
                                    <div className={styles.hint}>
                                        <br/><br/><br/><br/><br/><br/>
                                        Not a member yet?
                                        <br />
                                        <NavLink to="/signup">Sign up here!</NavLink>
                                    </div>
                                </Form.Item>
                            </Form>
                        </div>
                    </Content>
                </Layout>
                <Footer className={styles.footStyle}></Footer>
            </Layout>
        </Space>
    )
};
export default Login;