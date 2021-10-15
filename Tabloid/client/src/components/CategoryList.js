import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import { Category } from "./Category";
import { getAllCategories } from "../modules/categoryManager";

export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((categories) => setCategories(categories));
  };

  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="justify-content-center">
        <Row xs="3">
          <Col>
            <h1>Categories</h1>
          </Col>
          <Col className="mt-3">
            <Button
              className="addCategoryButton"
              onClick={() => {
                history.push("/category/add");
              }}
              color="primary"
            >
              Add a Category
            </Button>
          </Col>
        </Row>
        <p>
          {categories.map((category) => (
            <Category
              category={category}
              key={category.id}
              setCategories={setCategories}
              getCategories={getCategories}
            />
          ))}
        </p>
      </div>
    </div>
  );
};
