import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../Hooks/UseTitle";
import { ProductModel } from "../../../../Models/ProductModel";
import { productsService } from "../../../../Services/ProductsService";
import { useImageChange } from "../../../../Utils/FormUtils";
import { notify } from "../../../../Utils/Notify";
import CategoriesInput from "../../../Inputs/CategoriesInput/CategoriesInput";
import ImageInput from "../../../Inputs/ImageInput/ImageInput";
import NumberInput from "../../../Inputs/NumberInput/NumberInput";
import StringInput from "../../../Inputs/StringInput/StringInput";
import ProductForm from "../ProductForm/ProductForm";
import "./AddProduct.css";

function AddProduct(): JSX.Element {
  useTitle("Add Product");
  const { register, handleSubmit } = useForm<ProductModel>();
  const navigate = useNavigate();
  const { handleImageChange, imageUrl, imageFile } = useImageChange();
  async function add(product: ProductModel) {
    try {
      product.image = imageFile;
      await productsService.addProduct(product);
      notify.success(`${product.name} has been added successfully.`);
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <ProductForm
      onSubmit={add}
      handleSubmit={handleSubmit}
      mode="add"
      nameInput={
        <StringInput
          name="name"
          label="Name"
          registerValue="name"
          register={register}
        />
      }
      descriptionInput={
        <StringInput
          name="description"
          label="Description"
          registerValue="description"
          register={register}
        />
      }
      categoryInput={<CategoriesInput label="Categories" register={register} />}
      priceInput={
        <NumberInput
          label="Price"
          name="price"
          registerValue="price"
          register={register}
          step="0.01"
          min="0"
        />
      }
      stockInput={
        <NumberInput
          label="Stock"
          name="stock"
          registerValue="stock"
          register={register}
        />
      }
      quantityInput={
        <StringInput
          label="Quantity"
          name="quantity"
          registerValue="quantity"
          register={register}
        />
      }
      imageInput={
        <ImageInput
          required={true}
          register={register}
          onChange={handleImageChange}
          imageUrl={imageUrl}
        />
      }
    />
  );
}

export default AddProduct;
