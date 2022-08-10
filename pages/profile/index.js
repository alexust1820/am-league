import axios from "axios";
import { Button } from "antd";
import { useRouter } from "next/router";
import Header from "../../components/Header";

export default function Profile({player}) {
    const router = useRouter()

    return(<>
        <Header props={{
            title: "Am League - Профиль",
            desc: "Страничка победителя 🏆"
        }} />
        <div className="container">
            {player.name} <br/>
            {player.surname} <br/>
            {player.email} <br/>
            {player.position} <br/>
            <Button 
                type="primary" 
                onClick={() => router.push("/profile/create-team")}
            >
                Создать команду
            </Button>
        </div>
    </>);
}

export async function getServerSideProps({req, res}) {
    const isAuthorized = Boolean(req.cookies.token)
    if(!isAuthorized) {
        res.setHeader("location", "/login")
        res.statusCode = 302
        res.end()
        return {
            props: {}
        }
    } else {
        const player = await axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_GET_PLAYER_URL,
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        }).then(async res => await res.data)

        return {
            props: {player}
        }
    }
}