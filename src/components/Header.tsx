import { Box, Button } from '@radix-ui/themes'
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react'
import Nav from './Nav';



export default function Header() {



    return (

        <header className='py-4 bg-slate-800 sticky top-0'>
            <div className='container mx-auto'>
                <div className='flex justify-end items-center gap-8'>
                    <Nav />
                    <Box>
                        <AuthShowcase />
                    </Box>


                </div>
            </div>

        </header>
    )
}

function AuthShowcase() {
    const { data: sessionData } = useSession();



    return (
        <div className="flex gap-6 items-center">
            <p className="text-white">
                {sessionData && <span>{sessionData.user?.name}</span>}

            </p>
            <Button
                onClick={sessionData ? () => void signOut({ callbackUrl: '/', redirect: true }) : () => void signIn('google', { callbackUrl: '/dashboard' })}
                color={sessionData ? "red" : 'orange'}
                className='cursor-pointer'
            >
                {sessionData ? "Sign out" : "Sign in"}
            </Button>
        </div>
    );
}