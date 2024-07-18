import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface EditButtonProps {
  id: number;
  identifier: string;
}
function EditButton({ id, identifier }: EditButtonProps) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(`/${identifier}/edit/${id}`)}>
      <Edit />
    </Button>
  );
}

export default EditButton;
