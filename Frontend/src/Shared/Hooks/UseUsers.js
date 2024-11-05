import { useState } from "react"
import { listUsers } from "../../Services/api"

export const useUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const [error, setError] = useState(null)


    const getUsersData = async () => {
        setIsLoading(true)
        try {
            const response = await listUsers()
            if (response.data) {
                setUserInfo(response.data)
            } else {
                setError('Error al Obtener Data')
            }
        } catch (error) {
            setIsLoading(false)
            setError('Error al Obtener Data')
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        userInfo,
        error,
        getUsersData
    }
}