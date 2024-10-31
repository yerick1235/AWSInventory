import express from "express";
import { addServer, deleteServer, listById, listServers, test, updateServers, downloadFile } from "./Server.controller.js";
import { generateExcel } from "../Report/GenerateExcel.js";
import { isAdmin, validateJWT } from "../Utils/validateJWT.js";
import { savePEM } from "../Middlewares/SaveFiles.js";

const api = express.Router()

api.get('/test', test)
api.post('/add', savePEM.single('clavePEM'), [validateJWT, isAdmin], addServer)
api.get('/list', [validateJWT], listServers)
api.put('/update/:servidorId', savePEM.single('clavePEM'), [validateJWT, isAdmin], updateServers)
api.delete('/delete/:servidorId', [validateJWT, isAdmin], deleteServer)
api.get('/listById/:servidorId', listById)
api.post('/excel', generateExcel)
api.get('/download/:servidorId', downloadFile)

export default api