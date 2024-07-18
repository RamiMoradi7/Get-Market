import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../Hooks/UseTitle";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { categoriesService } from "../../../../Services/CategoriesService";
import { useImageChange } from "../../../../Utils/FormUtils";
import { notify } from "../../../../Utils/Notify";
import ImageInput from "../../../Inputs/ImageInput/ImageInput";
import StringInput from "../../../Inputs/StringInput/StringInput";
import CategoryForm from "../CategoryForm/CategoryForm";

function AddCategory(): JSX.Element {
  useTitle("Add Category");
  const { register, handleSubmit } = useForm<CategoryModel>();
  const navigate = useNavigate();
  const { handleImageChange, imageUrl, imageFile } = useImageChange();
  async function add(category: CategoryModel) {
    try {
      category.image = imageFile;
      await categoriesService.addCategory(category);
      notify.success(`${category.name} has been added successfully.`);
      navigate("/categories");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <CategoryForm
      handleSubmit={handleSubmit}
      onSubmit={add}
      mode="add"
      nameInput={
        <StringInput
          label="Name"
          register={register}
          registerValue="name"
          name="name"
        />
      }
      descriptionInput={
        <StringInput
          label="Description"
          register={register}
          registerValue="description"
          name="description"
        />
      }
      imageInput={
        <ImageInput
          onChange={handleImageChange}
          register={register}
          imageUrl={imageUrl}
          required={true}
        />
      }
    />
  );
}

export default AddCategory;
