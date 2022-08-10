const bodyParser = require("body-parser")
const AuthByToken = require("../middleware/AuthByToken")
const { CreateTeam, GetTeams } = require("../modules/TeamModules")

module.exports = (app) => {
    app.use(bodyParser.json())

    app.post("/create-team", AuthByToken, async (req, res) => {
        const newTeam = {
            name: req.body.name,
            token: req.headers.authorization.split(' ')[1],
            capId: null
        }
        const response = await CreateTeam(newTeam)
        res.send(response)
    })

    app.post("/get-teams", async (req, res) => {
        const response = await GetTeams(req.query._limit)
        res.send(response)
    })
}