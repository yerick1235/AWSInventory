import { compare, hash } from "bcrypt"

export const encrypt = (password) => {
    return hash(password, 10)
}

export const checkPassword = async (password, hash) => {
    try {
        return await compare(password, hash)
    } catch (err) {
        console.error(err)
        return err
    }
}