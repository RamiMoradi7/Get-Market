import { UploadSharp } from "@mui/icons-material";
import { FormLabel, Input } from "@mui/material";
import { ChangeEvent } from "react";
import { Path, useForm } from "react-hook-form";
import "./ImageInput.css";

interface ImageInputProps<T> {
  register: ReturnType<typeof useForm<T>>["register"];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  required?: boolean;
}

export default function ImageInput<T>({
  register,
  onChange,
  imageUrl,
  required,
}: ImageInputProps<T>) {
  const isSelected = !!imageUrl;
  return (
    <>
      <div className="image-container">
        <div className="image-preview">
          {imageUrl && <img src={imageUrl} alt="Product" />}
        </div>
        <div className="image-input-container">
          <FormLabel htmlFor="image-upload" className="upload-label">
            <UploadSharp className="upload-icon" />
            {isSelected ? "Change Image" : "Upload Image"}
          </FormLabel>
          <Input
            type="file"
            id="image-upload"
            name="image"
            autoFocus
            {...register("image" as Path<T>)}
            onChange={onChange}
            style={{ display: "none" }}
            required={required}
          />
        </div>
      </div>
    </>
  );
}
