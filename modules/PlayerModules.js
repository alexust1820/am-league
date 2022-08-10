const yup = require("yup")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(7)
const { playerCreateSchema, playerLoginSchema } = require("./yupSchemas/PlayerSchemas")
const { AddCandidatToDB, GetPlayerFromDB } = require("../db/PlayerDBModel")

async function CheckCandidatFields(candidat) {
    if(await playerCreateSchema.isValid(candidat)) {
        candidat.password = bcrypt.hashSync(candidat.password, salt)
        return await AddCandidatToDB(candidat).then(res => {
            if(res.isNewPlayer) {
                const token = CreateJWT(candidat.email)
                return {
                    token: token,
                    message: "Поздравляю, вы зарегистрированы"
                }
            } else {
                return {
                    message: "На данную почту уже зарегистрирован аккаунт"
                }
            }
        })
    } else {
        return {message: "Проверьте данные формы"}
    }
}

async function CheckPlayerFields(player) {
    if(await playerLoginSchema.isValid(player)) {
        const token = CreateJWT(player.email)
        return {
            message: "Авторизация прошла успешно",
            token: token
        }
    } else {
        return {message: "Проверьте данные формы"}
    }
}

function CreateJWT(playerEmail) {
    const token = jwt.sign({
        email: playerEmail
    }, 'banana')
    return token
}

async function CheckAndGetPlayer(token) {
    if(token) {
        const playerEmail = jwt.verify(token, 'banana').email
        const player = await GetPlayerFromDB(playerEmail)
        return player
    }
}

module.exports = {
    CreatePlayer: CheckCandidatFields,
    LoginPLayer: CheckPlayerFields,
    GetPlayer: CheckAndGetPlayer
}