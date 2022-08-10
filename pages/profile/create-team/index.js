import { useRouter } from "next/router";
import Header from "../../../components/Header";
import { Button, Form, Input, Typography } from "antd";
import { getCookie } from "cookies-next";
import axios from "axios";

const onFinish = async e => {
    const token = getCookie("token")
    const team = await axios({
        method: "post",
        url: process.env.NEXT_PUBLIC_CREATE_TEAM_URL,
        data: {
            name: e.teamName
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => res)
    alert(team.data.message)
}

export default function CreateTeam({isAuthorized}) {
    const router = useRouter()

    if(isAuthorized)  {
        return(<>
            <Header props={{
                title: "Am League - Создание команды",
                desc: "Создай свою команду и выиграй всех"
            }} />
            <div className="container">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Название команды"
                        name="teamName"
                        rules={[{ required: true, message: 'Пожалуйста, введите название команды!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="danger" htmlType="submit">
                            Создать команду
                        </Button>
                    </Form.Item>
                </Form>
                <Typography.Text>
                    Вы автоматически становитесь капитаном команды
                </Typography.Text>
            </div>
        </>);
    } else {
        router.push("/login")
    }
}

export async function getServerSideProps({req, res}) {
    const isAuthorized = Boolean(req.cookies.token)
    if(!isAuthorized) {
        res.setHeader("location", "/login")
        res.statusCode = 302
        res.end()

    }
    return {
        props: {isAuthorized}
    }
}