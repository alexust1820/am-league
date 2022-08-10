import { Card } from "antd";

export default function TeamCard(props) {
    const { team } = props
    const { Meta } = Card

    return(<Card
                hoverable
                // добавить вызов команд на матч
                // onClick={() => alert('hello')}
                style={{
                width: 300,
                }}
                cover={
                <img
                    alt="example"
                    src="/team-card-img.jpg"
                />
            }>
            <Meta
                title={team.team_name}
                description={`Капитан ${team.name} ${team.surname}`}
            />
        </Card>);
}