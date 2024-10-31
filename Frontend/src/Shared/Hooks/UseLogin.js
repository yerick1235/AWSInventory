import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginRequest } from "../../Services/api"

export const useLogin =()=>{
    const [isLodaing, setIsLodaing] = useState(false)
    const navigate = useNavigate()

    const login = async (email, password)=>{
        setIsLodaing(true)
        const user = {
            email,
            password
        }
        const res = await loginRequest(user)
        setIsLodaing(false)

        if(res.error){
            console.error('Error to Login, please Try Again', res.err);
            return
        }
        const userDetails = res.data
        localStorage.setItem('correo',userDetails.loggedUser.email)
        localStorage.setItem('token',userDetails.token)

        const jwt = userDetails.token
        console.log(jwt)
        const claims = atob(jwt.split('.')[1])
        console.log('Claims: ', JSON.parse(claims).role)

        //localStorage.setItem('role', userDetails.loggedUser.role)
        navigate('/servers')
    }
    return{
        login,
        isLodaing
    }
}