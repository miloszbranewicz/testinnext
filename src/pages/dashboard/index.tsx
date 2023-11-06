
import { useSession } from 'next-auth/react'
import React from 'react'
import NotAuthenticated from '~/components/NotAuthenticated'



export default function Dashboard() {
  const { data: sessionData } = useSession()

  if (!sessionData) return (
    <NotAuthenticated />
  )

  return (

    <div>Dashboard</div>


  )
}

