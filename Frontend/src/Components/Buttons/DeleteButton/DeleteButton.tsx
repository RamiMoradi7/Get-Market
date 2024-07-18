import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { notify } from "../../../Utils/Notify";

interface DeleteButtonProps<T> {
  id: number;
  name: string;
  fnQuery: (id: number) => Promise<T>;
}
function DeleteButton<T>({ id, name, fnQuery }: DeleteButtonProps<T>) {
  async function deleteMe(id: number) {
    try {
      const sure = window.confirm("Your'e about to delete " + name);
      if (!sure) return;
      await fnQuery(id);
      notify.success(name + " has been deleted.");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <Button onClick={() => deleteMe(id)}>
      <Delete />
    </Button>
  );
}

export default DeleteButton;
