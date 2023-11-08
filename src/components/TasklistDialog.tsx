import { FileTextIcon } from "@radix-ui/react-icons";
import { Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import TasklistDialogForm from "./TasklistDialogForm";

type Props = {
  title: string;
  id: number;
};

export default function TasklistDialog({ title, id }: Props) {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
      <Dialog.Trigger>
        <button className="inline-flex rounded bg-blue-500 p-2 hover:bg-blue-400">
          <FileTextIcon />
        </button>
      </Dialog.Trigger>

      <Dialog.Content>
        <TasklistDialogForm title={title} id={id} closeModal={closeModal} />
      </Dialog.Content>
    </Dialog.Root>
  );
}
