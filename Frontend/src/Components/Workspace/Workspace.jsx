import React from 'react'
import './Workspace.css'

export const Workspace = ({ children }) => {
    return (
        <div className='workspace'>
            {children}
        </div>
    )
}
