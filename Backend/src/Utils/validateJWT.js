import jwt from 'jsonwebtoken'
import { connection } from '../../configs/DB/SQLConnection.js'

const dbConnection = connection()

export const validateJWT = async (req, res, next) => {
    const key = process.env.KEY
    let token = req.headers['authorization']

    //# Verify if Token exists
    if (!token) return res.status(401).send('Unauthorized')

    try {
        //# Delete 'Bearer' from token
        token = token.replace(/^Bearer\s+/, '')

        const { uid } = jwt.verify(token, key)

        dbConnection.query('call sp_listById(?)', [uid], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send({ message: 'Database Error, Try Again' })
            }
            const user = rows[0]
            if (!user) return res.status(404).send({ message: 'User not found or Unauthorized' })

            req.user = user
            return next()
        })
    } catch (err) {
        console.error(err)
        if (err.name == 'TokenExpiredError') {
            return res.status(401).send({ message: 'Token has Expired' })
        } else if (err.name == 'JsonWebTokenError') {
            return res.status(401).send({ message: 'Invalid Token' });
        } else {
            return res.status(500).send({ message: 'Internal Server Error' });
        }
    }
}


//# Validate if User is Admin
export const isAdmin = async (req, res, next) => {
    const rol = req.user[0].rol
    if (!rol || rol !== 'ADMIN') return res.status(401).send({ message: 'User Unauthorized' })
    return next()
}