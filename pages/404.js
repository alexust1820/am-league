import { Typography } from "antd";
import Header from "../components/Header";

export default function NotFound() {
    return(<>
        <Header props={{
            title: "404 не найдено",
            desc: "Футбол - твой ритм жизни"
        }} />
        <div className="container">
            <Typography.Title level={2}>
                Такой страницы не существует 😞
            </Typography.Title>
        </div>
    </>);
}