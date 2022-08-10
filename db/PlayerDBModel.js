const Pool = require("pg").Pool
const db = new Pool({
    user: "postgres",
    password: "1820",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

async function AddCandidatToDB(candidat) {
    const checkCandidatInDB = await db.query(`SELECT 
        * 
        FROM players WHERE email = $1`, 
        [candidat.email])

    if(checkCandidatInDB.rowCount === 0) {
        const addPlayerToDB = await db.query(`INSERT INTO players 
            (name, 
            surname, 
            email, 
            position_id, 
            password)
            values ($1, $2, $3, $4, $5)`, [
                candidat.name, 
                candidat.surname, 
                candidat.email, 
                candidat.position_id, 
                candidat.password
        ])

        return {
            isNewPlayer: true,
            message: "Поздравляем, вы зарегистрировались на сайте"
        }
        
    } else {
        return { 
            isNewPlayer: false,
            message: "Вы уже зарегистрированы на сайте"
        }
    }
}

async function GetPlayerFromDB(playerEmail) {
    const player = await db.query(`SELECT 
        player_id,
        name,
        surname,
        email,
        position,
        password
        FROM players, position
        WHERE ( email = $1 AND players.position_id = position.position_id )`, 
        [playerEmail])

    return player.rows[0]
}

module.exports = {
    AddCandidatToDB: AddCandidatToDB,
    GetPlayerFromDB: GetPlayerFromDB
}