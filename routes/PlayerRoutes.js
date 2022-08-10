const bodyParser = require("body-parser")
const AuthByToken = require("../middleware/AuthByToken")
const { LoginPLayer, CreatePlayer, GetPlayer } = require("../modules/PlayerModules")

module.exports = (app) => {
    app.use(bodyParser.json())

    app.post("/regin", async (req, res) => {
        const response = await CreatePlayer(req.body)
        res.send(response)
    })

    app.post("/login", async (req, res) => {
        const response = await LoginPLayer(req.body)
        res.send(response)
    })

    app.post("/get-player", AuthByToken, async (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const response = await GetPlayer(token)
        res.send(response)
    })
}