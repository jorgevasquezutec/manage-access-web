'use client '
import React from 'react';
import Link from "next/link"

import { Button } from "@/components/ui/button"

type ButtonLinkProps = {
    href: string,
    text: string,
}

export default function ButtonLink({ href, text }: ButtonLinkProps) {

    return (
        <div className='w-11/12 flex items-end justify-end '>
            <Button asChild variant="outline">
                <Link href={href}>{text}</Link>
            </Button>
        </div>
    )

}