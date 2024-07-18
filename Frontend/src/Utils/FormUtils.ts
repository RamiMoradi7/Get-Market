import { ChangeEvent, useState } from "react";

export function useImageChange() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const imageFile = event.target.files[0];
    const convertToUrl = URL.createObjectURL(imageFile);
    setImageFile(imageFile);
    setImageUrl(convertToUrl);
  }
  return { handleImageChange, imageUrl, setImageUrl,imageFile };
}
