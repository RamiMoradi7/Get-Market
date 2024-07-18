import { Navigate, Route, Routes } from "react-router-dom";
import { CurrentUser } from "../../../Utils/CurrentUser";
import Login from "../../AuthArea/Login/Login";
import Register from "../../AuthArea/Register/Register";
import CategoryList from "../../CategoriesArea/CategoryList/CategoryList";
import AddCategory from "../../CategoriesArea/Form/AddCategory/AddCategory";
import EditCategory from "../../CategoriesArea/Form/EditCategory/EditCategory";
import ProductsByCategory from "../../CategoriesArea/ProductsByCategory/ProductsByCategory";
import About from "../../HomeArea/Home/About";
import AddProduct from "../../ProductsArea/Form/AddProduct/AddProduct";
import EditProduct from "../../ProductsArea/Form/EditProduct/EditProduct";
import ProductDetails from "../../ProductsArea/ProductDetails/ProductDetails";
import ProductList from "../../ProductsArea/ProductList/ProductList";
import Page404 from "../page404/page404";
import "./Routing.css";

function Routing(): JSX.Element {
  const { isAdmin } = CurrentUser();
  return (
    <div className="Routing">
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<ProductList />} />
        <Route
          path="/products-by-category/:categoryId"
          element={<ProductsByCategory />}
        />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAdmin && (
          <>
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/new" element={<AddProduct />} />
            <Route path="/categories/new" element={<AddCategory />} />
            <Route path="/categories/edit/:id" element={<EditCategory />} />
          </>
        )}
        {!isAdmin && (
          <>
            <Route path="/products/edit/:id" element={<Login />} />
            <Route path="/products/new" element={<Login />} />
          </>
        )}

        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
