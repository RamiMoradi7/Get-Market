import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryModel } from "../../../Models/CategoryModel";
import { categoriesService } from "../../../Services/CategoriesService";
import { CurrentUser } from "../../../Utils/CurrentUser";
import DeleteButton from "../../Buttons/DeleteButton/DeleteButton";
import EditButton from "../../Buttons/EditButton/EditButton";
import "./CategoryCard.css";

interface CategoryCardProps {
  category: CategoryModel;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category: { id: categoryId, name, description, imageUrl },
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = CurrentUser();

  return (
    <div>
      <Typography>
        {isAdmin && (
          <>
            <DeleteButton
              id={categoryId}
              name={name}
              fnQuery={categoriesService.deleteCategory}
            />
            <EditButton id={categoryId} identifier="categories" />
          </>
        )}
      </Typography>
      <div
        className="category-card"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => navigate(`/products-by-category/${categoryId}`)}
      >
        <div
          className="category-info"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="category-info-overlay">
            <h3>{name}</h3>
          </div>
        </div>
        {isHovering && (
          <div className="hover-info">
            <div className="details">
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
