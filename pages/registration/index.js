import { Button, Form, Input, Select } from "antd";
import Header from "../../components/Header";
import axios from "axios";
import { setCookie } from "cookies-next";

const { Option } = Select

const onFinish = async e => {
    const candidat = await axios
        .post(process.env.NEXT_PUBLIC_REGIN_URL, {
            name: e.name,
            surname: e.surname,
            email: e.email,
            position_id: e.position_id,
            password: e.password
        })
        .then(async response => await response)
    setCookie('token', await candidat.data.token)
    alert(candidat.data.message)
}

export default function Registration() {
    return(<>
        <Header props={{
            title: "Am League - Регистрация",
            desc: "Создавай аккаунт и начинай играть"
        }} />
        <Form
            name="Registration"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 8,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={() => {}}
            autoComplete="on"
            >
            <Form.Item
                label="Имя"
                name="name"
                rules={[
                {
                    required: true,
                    message: 'Пожалуйста, введите свое имя!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Фамилия"
                name="surname"
                rules={[
                {
                    required: true,
                    message: 'Пожалуйста, введите свою фамилию!',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Электронная почта"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Пожалуйста, введите свою электронную почту!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Позиция"
                name="position_id"
                rules={[
                {
                    required: true,
                    message: 'Пожалуйста, введите свою позицию!',
                },
                ]} 
                >
                <Select>
                    <Option value={1}>Не определено</Option>
                    <Option value={2}>Вратарь</Option>
                    <Option value={3}>Защитник</Option>
                    <Option value={4}>Полузащитник</Option>
                    <Option value={5}>Нападающий</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Пароль"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Пожалуйста, введите свой пароль!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>
            
            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </Form.Item>
        </Form>
    </>)
}