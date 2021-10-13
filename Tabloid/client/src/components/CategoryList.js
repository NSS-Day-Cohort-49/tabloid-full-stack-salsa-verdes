import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Category from './Category';
import { getAllCategories } from "../modules/categoryManager";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then(categories => setCategories(categories));
  };

  const history = useHistory()

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
      <button className="addCategoryButton"onClick={() => {history.push("/categories/add")}}>Add a Category</button>
          <p>
        {categories.map((category) => (
          <Category category={category} key={category.id} />
        ))}
        </p>
      </div>
    </div>
  );
};

export default CategoryList;
