'use client'

import { FC, ReactNode } from 'react'
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer } from 'react-toastify';


interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}

export default Providers