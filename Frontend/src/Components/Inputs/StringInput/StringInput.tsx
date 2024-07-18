import { FormLabel, TextField } from "@mui/material";
import { Path, useForm } from "react-hook-form";
interface StringInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  registerValue: keyof T;
  name: string;
  label: string;
}
function StringInput<T>({
  register,
  name,
  label,
  registerValue,
}: StringInputProps<T>): JSX.Element {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <TextField
        margin="dense"
        required
        fullWidth
        name={name}
        label={label}
        type="text"
        {...register(registerValue as unknown as Path<T>)}
      />
    </>
  );
}

export default StringInput;
