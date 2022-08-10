const yup = require("yup")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const salt = bcrypt.genSaltSync(7)
const { teamCreateSchema } = require("./yupSchemas/TeamSchemas")
const { GetPlayerFromDB } = require("../db/PlayerDBModel")
const { AddNewTeamToDB, GetTeamsFromBD } = require("../db/TeamDBModel")

async function CheckNewTeamField(newTeam) {
    if(teamCreateSchema.isValid(newTeam)) {
        newTeam.capId = (await GetPlayerFromDB(
            jwt.verify(newTeam.token, 'banana').email
        )).player_id
        const team = await AddNewTeamToDB(newTeam)
        return team
    } else {
        return {message: "Что-то пошло не так. Попробуйте позже"}
    }
}

async function CheckLimAndGetTeams(_limit) {
    if(_limit & _limit != 0) {
        const teams = await GetTeamsFromBD(_limit)
        return teams
    } else {
        const teams = await GetTeamsFromBD(10)
        return teams
    }
}

module.exports = {
    CreateTeam: CheckNewTeamField,
    GetTeams: CheckLimAndGetTeams
}