const Pool = require("pg").Pool
const db = new Pool({
    user: "postgres",
    password: "1820",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

async function AddNewTeamToDB(newTeam) {
    const checkYoungCap = await db.query(`SELECT 
        * 
        FROM teams WHERE cap_id = $1`, 
        [newTeam.capId])

    if(checkYoungCap.rowCount === 0) {
        const addTeamToDB = await db.query(`INSERT INTO teams
            (team_name,
            cap_id)
            values ($1, $2) RETURNING *
            `, [
                newTeam.name,
                newTeam.capId
        ])

        return {message: `Поздравляем, Вы создали команду ${newTeam.name}`}
    } else {
        return {message: `Вы уже являетесь капитаном команды ${checkYoungCap.rows[0].team_name}`}
    }
}

async function GetTeamsFromBD(_limit) {
    const teams = await db.query(`SELECT 
        team_name,
        name,
        surname
        FROM teams, players 
        WHERE teams.cap_id = players.player_id 
        ORDER BY team_id DESC LIMIT $1`,
        [_limit])

    return teams.rows
}

module.exports = {
    AddNewTeamToDB: AddNewTeamToDB,
    GetTeamsFromBD: GetTeamsFromBD
}