
import { Button } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import NotAuthenticated from '~/components/NotAuthenticated'
import Tasklist from '~/components/Tasklist'
import { api } from '~/utils/api'


export default function Dashboard() {
  const { data: sessionData } = useSession()
  const allTasks = api.taskList.findMany.useQuery()
  const addTask = api.taskList.create.useMutation({
    onError: (error) => {
      toast.error(error.message)
      console.log(error)
    },
    onSuccess: async () => {
      await allTasks.refetch()
      toast.success('Tasklist created!')
    }
  })

  if (!sessionData) return (
    <NotAuthenticated />
  )

  const handleClick = () => {
    addTask.mutate({ name: Date.now().toString() })
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-3xl md:text-5xl my-8'>Tasklist</h1>
        <Button onClick={handleClick}>Add new tasklist</Button>
      </div>
      <ul className='flex gap-4 flex-col'>
        {allTasks.data?.map((task) => (
          <li key={task.id}>
            <Tasklist title={task.name} id={task.id} />
          </li>
        ))}
      </ul>
    </div>
  )
}

