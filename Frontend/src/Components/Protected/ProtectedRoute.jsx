import React from 'react'
import toast from 'react-hot-toast'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ element, allowedRoles }) => {
    //const userRole = localStorage.getItem('role')
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to='/' replace />
    }
    const claims = atob(token.split('.')[1])
    const role = JSON.parse(claims).role

    //# Navigate to Login
    if (!allowedRoles.includes(role)) {
        return <Navigate to='/' replace />
    }
    return element
}