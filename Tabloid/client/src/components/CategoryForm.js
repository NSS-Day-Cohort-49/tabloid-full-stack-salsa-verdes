import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { addCategory } from "../modules/categoryManager";

export default function CategoryForm() {
  const history = useHistory();
  const [categoryText, setCategoryText] = useState();

  const submitForm = (e) => {
    e.preventDefault();
    addCategory({ name: categoryText })
      .then(() => history.push("/categories"))
      .catch((err) => alert(`An error ocurred: ${err.message}`));
  };

  return (
    <Form onSubmit={submitForm}>
      <FormGroup>
        <Label for="categoryText">Category</Label>
        <Input id="categoryText" type="textarea" onChange={e => setCategoryText(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button>Save</Button>
      </FormGroup>
    </Form>
  );
}