import { Typography, Row, Col, Space, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import Header from "../components/Header";
import TeamCard from "../components/TeamCard";

export default function Main({teams}) {
    const router = useRouter()
    return(<>
        <Header props={{
            title: "Am League - Главная",
            desc: "Футбол - твой ритм жизни"
        }} />
        <div className="container">
            <Typography.Title level={1}>
                Команды готовые к матчам
            </Typography.Title>
            <Space 
                size={[16, 16]} 
                wrap>
                {teams.map((team, i) => {
                    return(<TeamCard team={team} key={i} />)
                })}
            </Space>
            <Button 
                style={{
                    display: 'block',
                    margin: '40px auto'
                }}
                type="primary" 
                onClick={() => router.push("/teams")}>
                Больше команд
            </Button>
        </div>
    </>);
}

export async function getServerSideProps({req, res}) {
    const teams = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_GET_TEAMS_URL}=10`
    }).then(async res => await res.data)

    return {
        props: {teams}
    }
}