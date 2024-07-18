import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useTitle from "../../../../Hooks/UseTitle";
import { ProductModel } from "../../../../Models/ProductModel";
import { productsService } from "../../../../Services/ProductsService";
import { notify } from "../../../../Utils/Notify";
import CategoriesInput from "../../../Inputs/CategoriesInput/CategoriesInput";
import ImageInput from "../../../Inputs/ImageInput/ImageInput";
import NumberInput from "../../../Inputs/NumberInput/NumberInput";
import StringInput from "../../../Inputs/StringInput/StringInput";
import ProductForm from "../ProductForm/ProductForm";
import "./EditProduct.css";
import { useImageChange } from "../../../../Utils/FormUtils";

function EditProduct(): JSX.Element {
  useTitle("Edit Product");
  const { register, handleSubmit, setValue } = useForm<ProductModel>();
  const [product, setProduct] = useState<ProductModel>();
  const { handleImageChange, imageUrl, setImageUrl, imageFile } =
    useImageChange();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    productsService
      .getProduct(+id)
      .then((product) => {
        setProduct(product);
        setValue("name", product.name);
        setValue("categoryId", product.categoryId);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("stock", product.stock);
        setValue("quantity", product.quantity);
        setImageUrl(product.imageUrl);
      })
      .catch((err: any) => notify.error(err));
  }, [id, setValue]);
  async function edit(product: ProductModel) {
    try {
      product.image = imageFile;
      product.id = +id;
      await productsService.updateProduct(product);
      notify.success(`${product.name} has been updated successfully.`);
      navigate("/products");
    } catch (err: any) {
      notify.error(err);
    }
  }
  return (
    <ProductForm
      onSubmit={edit}
      handleSubmit={handleSubmit}
      mode="edit"
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
      categoryInput={
        <CategoriesInput
          label="Categories"
          register={register}
          defaultSelected={product?.categoryId}
        />
      }
      priceInput={
        <NumberInput
          label="Price"
          name="price"
          registerValue="price"
          register={register}
          step="0.01"
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
          register={register}
          required={false}
          imageUrl={imageUrl}
          onChange={handleImageChange}
        />
      }
    />
  );
}

export default EditProduct;
