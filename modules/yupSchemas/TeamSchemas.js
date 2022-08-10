const yup = require("yup")

const teamCreateSchema = yup.object().shape({
    token: yup.string().required(),
    name: yup.string().required()
})

module.exports = {
    teamCreateSchema: teamCreateSchema
}