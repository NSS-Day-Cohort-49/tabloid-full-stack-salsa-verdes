import React, { useContext }  from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { deleteCategory } from "../modules/categoryManager";

    export const Category = ({ category, getCategories, setCategories }) => {

    const history = useHistory()

    const handleClickDeleteCategory = () => {deleteCategory(category) 
      // .then(() =>{history.push("/categories")} )}
      .then(getCategories().then(categories => setCategories(categories)))}

  return (
    <Card >
      <CardBody>
      <strong className="text-left px-2">{category.name}</strong>
      <button className="editCategoryButton" onClick={() => { history.push(`/categories/edit/${category.id}`)}}>Edit a Category</button>
      <button className="deleteCategoryButton" onClick={handleClickDeleteCategory}>Delete a Category</button>
      </CardBody>
    </Card>
  );
};
