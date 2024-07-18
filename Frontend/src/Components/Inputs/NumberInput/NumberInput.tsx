import { FormLabel, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { ProductModel } from "../../../Models/ProductModel";
interface NumberInputProps {
  register: ReturnType<typeof useForm<ProductModel>>["register"];
  registerValue: "price" | "stock";
  name: string;
  label: string;
  step?: string;
  min?: string;
}
function NumberInput({
  register,
  name,
  label,
  registerValue,
  step,
  min
}: NumberInputProps): JSX.Element {
  return (
    <>
      <FormLabel>{label}</FormLabel>
      <TextField
        required
        fullWidth
        name={name}
        label={label}
        type="number"
        inputProps={{
          step: step,
          min: min,
          max: "1000",
        }}
        {...register(`${registerValue}`)}
      />
    </>
  );
}

export default NumberInput;
