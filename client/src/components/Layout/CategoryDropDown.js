import React from "react";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "../../styles/CategoryDropDown.css";

const CategoryDropDown = () => {
  const { categories } = useCategory() || [];

  return (
    <div className="bg-white">
      <div className="category-dropdown">
        <div className="dropdown-toggle">Categories</div>
        <ul className="dropdown-menu">
          {categories.map((category) => (
            <li key={category._id} className="category-item">
              <Link
                to={`/search?category=${category._id}`}
                className="dropdown-item"
              >
                {category.name} <ChevronRightIcon className="arrow" />
              </Link>

              <ul className="sub-menu">
                {category.subCategories.map((sub) => (
                  <li key={sub._id} className="category-item">
                    <Link
                      className="sub-item"
                      to={`/search?subcategory=${sub._id}`}
                    >
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryDropDown;
