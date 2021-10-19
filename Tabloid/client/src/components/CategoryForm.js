import React, { useState } from "react";
import { addCategory, updateCategory } from "../modules/categoryManager";
import { useHistory, useParams } from "react-router-dom";
import {Container} from "reactstrap"
import { getCategoryById } from "../modules/categoryManager";

const CategoryForm = () => {

    const [ category, setCategory ] = useState({
        name : "",
    })

    const categoryId = useParams();

    if(categoryId.id && category.name =="")
    {
        getCategoryById(categoryId.id)
        .then(category => setCategory(category));
    }

    const handleInput = (event) => {
        const newCategory = {...category};
        newCategory[event.target.id] = event.target.value;
        setCategory(newCategory);
    }

    const handleCreateCategory = () => {    
        addCategory(category)

        .then(history.push("/category"))
    }

    const handleClickUpdateCategory = () => {
        updateCategory(category)
        .then(history.push("/category"))
    }

    const handleClickCancel = () => {
        history.push("/category")
    }

    const history = useHistory();

return(
    <Container>
        <div className="categoryForm">
            <h3>Add a Category</h3>
            <div className="container-5">
            <div className ="form-group">
                    <label for="name">Name</label>
                    <input type="name" class="form-control" id="name" placeholder ="name" value={category.name} onChange={handleInput} required/>
                </div>
                {categoryId.id? 
                <div>
                    <button type="submit" class="btn btn-primary mr-3" onClick={event => {
                        handleClickUpdateCategory()
                    }}>Update</button>

                    <button type="cancel" class="btn btn-primary mx-3" onClick={event => {
                        handleClickCancel()
                    }}>Cancel</button>

                </div>
                    :
                    <button type="submit" class="btn btn-primary" onClick={event => {
                        handleCreateCategory()
                    }}>Create</button>
                }
            </div>
        </div>
    </Container>
)}

export default CategoryForm;