import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../../Hooks/UseTitle";
import { CategoryModel } from "../../../../Models/CategoryModel";
import { categoriesService } from "../../../../Services/CategoriesService";
import { useImageChange } from "../../../../Utils/FormUtils";
import { notify } from "../../../../Utils/Notify";
import ImageInput from "../../../Inputs/ImageInput/ImageInput";
import StringInput from "../../../Inputs/StringInput/StringInput";
import CategoryForm from "../CategoryForm/CategoryForm";

function EditCategory(): JSX.Element {
  useTitle("Edit Category");
  const { register, handleSubmit, setValue } = useForm<CategoryModel>();
  const navigate = useNavigate();
  const { handleImageChange, imageUrl, setImageUrl, imageFile } =
    useImageChange();
  const { id } = useParams();
  useEffect(() => {
    categoriesService
      .getCategory(+id)
      .then((category) => {
        setValue("name", category.name);
        setValue("description", category.description);
        setImageUrl(category.imageUrl);
      })
      .catch((err: any) => notify.error(err));
  }, []);
  async function edit(category: CategoryModel) {
    try {
      category.id = +id;
      category.image = imageFile;
      await categoriesService.updateCategory(category);
      notify.success(`${category.name} has been updated successfully.`);
      navigate("/categories");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <CategoryForm
      handleSubmit={handleSubmit}
      onSubmit={edit}
      mode="edit"
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
          required={false}
        />
      }
    />
  );
}

export default EditCategory;
