import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'



export default function Nav() {
    const { pathname } = useRouter()
    const isActive = (path: string) => path === pathname
    return (
        <nav className='text-white me-auto'>
            <ul className='flex gap-6 items-center text-lg'>
                <li>
                    <Link href='/' className={isActive('/') ? 'text-orange-500 font-semibold' : ''}>Home</Link >
                </li>
                <li>
                    <Link href="/dashboard" className={isActive('/dashboard') ? 'text-orange-500 font-semibold' : ''}>Dashboard</Link>
                </li>

            </ul>
        </nav>
    )
}