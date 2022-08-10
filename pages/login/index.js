import { Button, Form, Input, Alert } from "antd";
import Header from "../../components/Header";
import LoginCSS from "./login.module.css";
import axios from "axios";
import { setCookie } from "cookies-next";

const onFinish = async (e) => {
    const player = await axios
        .post(process.env.NEXT_PUBLIC_LOGIN_URL, {
            email: e.email,
            password: e.password
        })
        .then(async response => await response)
    setCookie("token", player.data.token)
    alert(player.data.message)
}

export default function Login() {
    return(<>
        <Header props={{
            title: "Am League - Авторизация",
            desc: "Входи в аккаунт и продолжай играть"
        }} />
        <div className="container">
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={() => null}
            autoComplete="off"
            className={LoginCSS.form}
            >
                <Form.Item
                    label="Электронная почта"
                    name="email"
                    rules={[{ required: true, message: 'Пожалуйста, введите электронную почту!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Авторизироваться
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>);
}