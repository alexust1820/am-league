import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageHeader, Button } from "antd";
import { playerContext } from "../../hooks/PlayerAuth";

export default function Header({props}) {
    const { title, desc } = props
    const router = useRouter()
    const player = useContext(playerContext)

    if(player) {
        return(<>
                <Head>
                    <title>{title}</title>
                    <link rel="shortcut icon" href="/favicon/favicon.ico" />
                    <meta property="og:description" content={desc} />
                </Head>
                <PageHeader
                    className="site-page-header"
                    title="Am League"
                    subTitle="Футбол - твой ритм жизни"
                    extra={[
                        <Button
                            key="2" 
                            type="link" 
                            onClick={() => {
                                router.push("/")
                            }}>
                            На главную
                        </Button>,
                
                        <Button 
                            key="1" 
                            type="dashed"
                            onClick={() => {
                                router.push("/profile")
                            }}>
                            {player.name}
                        </Button>
                    ]}
                />
        </>);
    }

    return(<>
            <Head>
                <title>{title}</title>
                <link rel="shortcut icon" href="/favicon/favicon.ico" />
                <meta property="og:description" content={desc} />
            </Head>
            <PageHeader
                className="site-page-header"
                title="Am League"
                subTitle="Футбол - твой ритм жизни"
                extra={[
                    <Button
                        key="3" 
                        type="link" 
                        onClick={() => {
                            router.push("/")
                        }}>
                        На главную
                    </Button>,
            
                    <Button
                        key="2" 
                        onClick={() => {
                            router.push("/login")
                        }}>
                        Войти
                    </Button>,
            
                    <Button 
                        key="1" 
                        type="primary"
                        onClick={() => {
                            router.push("/registration")
                        }}>
                        Регистрация
                    </Button>
                ]}
            />
    </>);
}