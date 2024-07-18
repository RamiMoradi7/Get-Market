import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Path, useForm } from "react-hook-form";

interface PasswordInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
}

function PasswordInput<T>({ register }: PasswordInputProps<T>): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type={showPassword ? "text" : "password"}
      id="password"
      autoComplete="current-password"
      {...register("password" as unknown as Path<T>)}
      inputProps={{ min: 4, max: 256 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
