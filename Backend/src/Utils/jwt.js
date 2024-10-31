import jwt from 'jsonwebtoken'

export const generateJWT = async(payload)=>{
    try {
        const key = process.env.KEY
        return jwt.sign(payload, key,{
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err)
        return
    }
}