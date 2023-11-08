import { Cross1Icon } from "@radix-ui/react-icons";

import React from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import TasklistDialog from "./TasklistDialog";


type Props = {
  title: string;
  id: number;
};

export default function Tasklist({ title, id }: Props) {

  const allTasks = api.taskList.findMany.useQuery();
  const deleteTask = api.taskList.delete.useMutation({
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: async () => {
      await allTasks.refetch();
      toast.success("Tasklist deleted!");
    },
  });

  const handleDeleteClick = () => {
    deleteTask.mutate(id);
  };


  return (
    <div className="flex max-w-md items-center gap-4 rounded bg-slate-500 p-4">
      <p className="flex-grow">{title}</p>
      <button
        className="inline-flex rounded bg-red-500 p-2 hover:bg-red-400"
        onClick={handleDeleteClick}
      >
        <Cross1Icon />
      </button>
      <TasklistDialog id={id} title={title} />
    </div>
  );
}
