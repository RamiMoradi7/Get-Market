import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserModel } from "../../../../Models/UserModel";


interface LastNameInputProps {
  register: ReturnType<typeof useForm<UserModel>>["register"];
}

function LastNameInput({ register }: LastNameInputProps): JSX.Element {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="family-name"
        {...register("lastName")}
        inputProps={{ minLength: 2, maxLength: 35 }}
      />
    </Grid>
  );
}

export default LastNameInput;
