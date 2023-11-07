import { Cross1Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'
import toast from 'react-hot-toast'
import { api } from '~/utils/api'

type Props = {
    title?: string
    id: number

}

export default function Tasklist({ title, id }: Props) {
    const allTasks = api.taskList.findMany.useQuery()
    const deleteTask = api.taskList.delete.useMutation({
        onError: (error) => {
            toast.error(error.message)
            console.log(error)
        },
        onSuccess: async () => {
            await allTasks.refetch();
            toast.success('Tasklist deleted!')
        }
    })

    const handleDeleteClick = () => {
        deleteTask.mutate(id)
    }

    return (
        <div className='flex gap-4 bg-slate-500 rounded max-w-md p-4 items-center'>
            <p className='flex-grow'>{title}</p>
            <Button onClick={handleDeleteClick} color='red'><Cross1Icon /></Button>
        </div>
    )
}