import React from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

type Props = {
  title: string;
  id: number;
  closeModal: () => void;
};
type Inputs = {
  title: string;
};
export default function TasklistDialogForm({ title, id, closeModal }: Props) {
  const getAll = api.taskList.findMany.useQuery();
  const update = api.taskList.updateOne.useMutation({
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: async () => {
      await getAll.refetch();
      toast.success("Tasklist updated!");
      closeModal();
    },
  });
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: { title: title },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    update.mutate({ ...data, id });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="name">Title</label>
        <input id="name" {...register("title")} className="form-input" />
      </div>
      <div className="mt-6 flex justify-end">
        <input
          type="submit"
          className="inline-flex rounded bg-orange-500 p-2 hover:bg-orange-400"
        />
      </div>
    </form>
  );
}
