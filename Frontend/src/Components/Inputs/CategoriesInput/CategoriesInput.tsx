import { FormLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../../Hooks/useFetch";
import { ProductModel } from "../../../Models/ProductModel";
import { AppState } from "../../../Redux/AppState";
import { categoriesService } from "../../../Services/CategoriesService";

interface CategoriesInputProps {
  register: ReturnType<typeof useForm<ProductModel>>["register"];
  label: string;
  defaultSelected?: number;
}

function CategoriesInput({
  register,
  label,
  defaultSelected,
}: CategoriesInputProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    defaultSelected
  );
  const handleCategoryChange = (event: SelectChangeEvent<number>) => {
    setSelectedCategory(+event.target.value);
  };
  const { result: categories } = useFetch(
    categoriesService.getCategories,
    (appState: AppState) => appState.categories
  );
  useEffect(() => {
    if (defaultSelected) {
      setSelectedCategory(defaultSelected);
    }
  }, [defaultSelected]);

  return (
    <>
      {categories && (
        <>
          <FormLabel>{label}</FormLabel>
          <br></br>
          <Select
            displayEmpty
            {...register("categoryId")}
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            required
          >
            <MenuItem disabled value="">
              Select Category...
            </MenuItem>

            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  );
}

export default CategoriesInput;
