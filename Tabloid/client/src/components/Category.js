import React from "react";
import { Card, CardBody } from "reactstrap";

const Category = ({ category }) => {
  return (
    <Card >
      <CardBody>
      <strong className="text-left px-2">{category.name}</strong>
      </CardBody>
    </Card>
  );
};

export default Category;
