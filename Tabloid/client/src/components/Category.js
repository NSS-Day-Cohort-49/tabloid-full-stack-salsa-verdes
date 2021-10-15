import React from "react";
import {Card ,CardBody, Row, Button, Col} from "reactstrap"
import { deleteCategory, getAllCategories } from "../modules/categoryManager";
import { useHistory } from "react-router-dom";

export const Category = ({category, setCategories}) => {

const history = useHistory();

const handleClickDeleteCategory = () => {
    const confirm = window.confirm("Are you sure you want to delete this category?")
    if(confirm== true)
    {deleteCategory(category)
    .then(getAllCategories().then(categories => setCategories(categories)))} else {
    return;
}
}

const handleClickEditTag = () => {
    history.push(`/category/edit/${category.id}`)
}

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col>
                        <strong>{category.name}</strong>
                    </Col>
                    <Col>
                        <Button onClick={handleClickEditTag}color="primary">Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleClickDeleteCategory}color="danger">Delete</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

