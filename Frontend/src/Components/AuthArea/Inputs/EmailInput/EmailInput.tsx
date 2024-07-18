import { TextField } from "@mui/material";
import { Path, useForm } from "react-hook-form";

interface EmailInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
}

function EmailInput<T>({ register }: EmailInputProps<T>): JSX.Element {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      type="email"
      autoComplete="email"
      autoFocus
      {...register("email" as unknown as Path<T>)}
    />
  );
}

export default EmailInput;
