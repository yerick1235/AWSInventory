import { useState } from "react"
import { listServers } from "../../Services/api"

export const useServers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [serversInfo, setServersInfo] = useState(null)
    const [error, setError] = useState(null)

    const getServersData = async()=>{
        setIsLoading(true)
        try {
            const response = await listServers()
            if(response.data){
                setServersInfo(response.data)
            }else{
                setError('Error al Obtener Data')
            }
        } catch (error) {
            setIsLoading(false)
            setError('Error al Obtener Data')
            console.error(error);
        }finally{
            setIsLoading(false)
        }
    }
    return{
        isLoading,
        serversInfo,
        error,
        getServersData
    }
}