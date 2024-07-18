import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import { AppState } from "../../../Redux/AppState";
import { categoriesService } from "../../../Services/CategoriesService";
import { CurrentUser } from "../../../Utils/CurrentUser";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import useTitle from "../../../Hooks/UseTitle";

function CategoryList(): JSX.Element {
  useTitle("Categories");
  const { result: categories, isLoading } = useFetch(
    categoriesService.getCategories,
    (appState: AppState) => appState?.categories
  );
  const navigate = useNavigate();
  const { isAdmin } = CurrentUser();

  return (
    <div className="category-list">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <>
          {isAdmin && (
            <Button onClick={() => navigate("/categories/new")}>
              <Add />
            </Button>
          )}
          <div className="category-card">
            {categories?.map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CategoryList;
