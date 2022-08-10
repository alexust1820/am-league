const express = require("express")
const app = express()
const cors = require("cors")
const PORT = 8080

app.use( cors({
    origin: "*"
}))

require("./routes/PlayerRoutes.js")(app)
require("./routes/TeamRoutes.js")(app)

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT}`)
})