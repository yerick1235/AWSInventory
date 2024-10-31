import express from "express"
import { listById, listUsers, login, registUser, test, updateUser, deleteUser } from "./User.controller.js"

const api = express.Router()

api.get('/test', test)
api.post('/regist', registUser)
api.post('/login', login)
api.get('/list', listUsers)
api.put('/edit/:userId', updateUser)
api.get('/list/:userId', listById)
api.delete('/delete/:userId', deleteUser)

export default api