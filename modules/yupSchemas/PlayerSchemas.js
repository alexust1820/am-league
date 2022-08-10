const yup = require("yup")

const playerCreateSchema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    position_id: yup.number().positive().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
})

const playerLoginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
})

module.exports = {
    playerCreateSchema: playerCreateSchema,
    playerLoginSchema: playerLoginSchema
}