import { Checkbox } from "@mui/material";
import React from "react";
import useFetch from "../../../Hooks/useFetch";
import { AppState } from "../../../Redux/AppState";
import { categoriesService } from "../../../Services/CategoriesService";

interface CheckboxFilterProps {
  selectedCategories: number[];
  onCategoryChange: (selectedCategories: number[]) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const { result: categories } = useFetch(
    categoriesService.getCategories,
    (appState: AppState) => appState.categories
  );

  const handleChange = (categoryId: number) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((c) => c !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updatedCategories);
  };

  return (
    <div className="categories">
      {categories.map((category) => (
        <label key={category.id}>
          <Checkbox
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleChange(category.id)}
          />
          {category.name}
        </label>
      ))}
    </div>
  );
};

export default CheckboxFilter;
