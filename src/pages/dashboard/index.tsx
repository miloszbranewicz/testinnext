import autoAnimate from "@formkit/auto-animate";
import { Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import NotAuthenticated from "~/components/NotAuthenticated";
import Tasklist from "~/components/Tasklist";
import { api } from "~/utils/api";

export default function Dashboard() {
  const parent = useRef(null);
  const [isPending, setIsPending] = useState(false);
  const { data: sessionData } = useSession();
  const allTasks = api.taskList.findMany.useQuery();
  const addTask = api.taskList.create.useMutation({
    onMutate: () => {
      setIsPending(true);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsPending(false);
      console.log(error);
    },
    onSuccess: async () => {
      await allTasks.refetch();
      setIsPending(false);
      toast.success("Tasklist created!");
    },
  });

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);
  if (!sessionData) return <NotAuthenticated />;

  const handleClick = () => {
    addTask.mutate({ name: 'New task' });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-3xl font-bold md:text-5xl">Tasklist</h1>
        <button className="inline-flex min-w-[80px] justify-center rounded bg-orange-500  p-2 hover:bg-orange-400" onClick={handleClick} disabled={isPending}>
          {isPending && "Adding..."}
          {!isPending && "Add new tasklist"}  
        </button>
      </div>
      <ul className="flex flex-col gap-4" ref={parent}>
        {allTasks.data?.map((task) => (
          <li key={task.id}>
            <Tasklist title={task.name} id={task.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}
