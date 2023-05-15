'use client'

import { FC, ReactNode } from 'react'
import { ThreeDots } from 'react-loader-spinner'

interface ProvidersProps {
    children: ReactNode,
    loading: boolean
}

const LayoutWithSpinner: FC<ProvidersProps> = ({ children, loading }) => {
    return (
        <>
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="grey"
                ariaLabel="three-dots-loading"
                wrapperStyle={
                    { position: "absolute", top: "50%", left: "50%", zIndex: "100" }
                }
                visible={loading}
            />
            {children}
        </>
    )
}


export default LayoutWithSpinner;