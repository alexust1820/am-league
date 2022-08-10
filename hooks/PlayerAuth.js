// Этот файл отвечает за получение данных игрока с сервера. Исполняется один раз

import { createContext, useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

export const playerContext = createContext()

export function PlayerContextProvider({children}) {
    const [player, setPlayer] = useState()
    useEffect(() => {
        const token = getCookie('token')
        if(!player && token) {
            axios({
                method: "post",
                url: process.env.NEXT_PUBLIC_GET_PLAYER_URL,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res, err) => {
                if(err) return 0
                else setPlayer(res.data)
            })
        }
    })
    
    return(<playerContext.Provider value={player}>
        {children}
    </playerContext.Provider>)
}