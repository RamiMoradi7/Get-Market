import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../../Models/UserModel";

interface FirstNameInputProps {
  register: ReturnType<typeof useForm<UserModel>>["register"];
}

function FirstNameInput({ register }: FirstNameInputProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="firstName"
        label="First Name"
        autoFocus
        {...register("firstName")}
        inputProps={{ minLength: 2, maxLength: 35 }}
      />
    </Grid>
  );
}

export default FirstNameInput;
