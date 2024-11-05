import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//# if doesnt exists dir PEMKeys
const dir = () => {
    const dirPath = path.join(__dirname, '../PEMKeys')
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true })
    }
}

dir()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../PEMKeys'))
    },
    filename: (req, file, cb) => {
        const ext = path.basename(file.originalname)
        cb(null, ext)
    }
})

export const savePEM = multer({ storage: storage })