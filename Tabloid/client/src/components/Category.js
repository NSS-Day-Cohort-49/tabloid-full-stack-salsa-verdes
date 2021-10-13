import React, { useContext }  from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from 'react-router-dom';
import { CategoryContext } from "../modules/categoryManager";

    const Category = ({ category }) => {

    const history = useHistory()

    // const { deleteCategory } = useContext(CategoryContext)

  return (
    <Card >
      <CardBody>
      <strong className="text-left px-2">{category.name}</strong>
      <button className="addCategoryButton"onClick={() => {history.push("/categories/add")}}>Add a Category</button>
      <button className="editCategoryButton" onClick={() => { history.push(`/categories/edit/${category.id}`)}}>Edit a Category</button>
      {/* <button className="deleteCategoryButton" onClick={ event => {deleteCategory(category.id) }}>Delete a Category</button> */}
      </CardBody>
    </Card>
  );
};

export default Category;
