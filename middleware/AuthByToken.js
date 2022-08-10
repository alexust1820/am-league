const jwt = require("jsonwebtoken")
const { GetPlayerFromDB } = require("../db/PlayerDBModel")

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token || token == '') return 0

        const playerEmail = jwt.verify(token, 'banana').email
        const player = await GetPlayerFromDB(playerEmail)

        if(player.email === playerEmail) {
            next()
        } else return 0

    } catch (e) {
        console.log(e)
        return {message: "Вы не авторизованы"}
    }
}