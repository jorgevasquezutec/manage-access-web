'use client'

import { signOut } from "next-auth/react"

export default function DashBoard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={(event) => {
                event.preventDefault()
                signOut({
                    callbackUrl: `${window.location.origin}/login`,
                })
            }}>Sing Out</button>
        </div>
    )
}