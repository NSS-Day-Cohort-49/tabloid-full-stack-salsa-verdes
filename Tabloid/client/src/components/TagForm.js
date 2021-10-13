import React, { useState } from "react";
import { addTag, updateTag } from "../modules/tagManager";
import { useHistory, useParams } from "react-router-dom";
import {Container} from "reactstrap"
import { getTagById } from "../modules/tagManager";

const TagForm = () => {

    const [ tag, setTag ] = useState({
        name : "",
    })

    const tagId = useParams();

    if(tagId.id && tag.name =="")
    {
        getTagById(tagId.id)
        .then(tag => setTag(tag));
    }

    const handleInput = (event) => {
        const newTag = {...tag};
        newTag[event.target.id] = event.target.value;
        setTag(newTag);
    }

    const handleCreateTag = () => {    
        addTag(tag)

        .then(history.push("/tag"))
    }

    const handleClickUpdateTag = () => {
        updateTag(tag)
        .then(history.push("/tag"))
    }

    const history = useHistory();

return(
    <Container>
        <div className="tagForm">
            <h3>Add a Tag</h3>
            <div className="container-5">
            <div className ="form-group">
                    <label for="name">Name</label>
                    <input type="name" class="form-control" id="name" placeholder ="name" value={tag.name} onChange={handleInput} required/>
                </div>
                {tagId.id? 
                    <button type="submit" class="btn btn-primary" onClick={event => {
                        handleClickUpdateTag()
                    }}>Create</button>
                    :
                    <button type="submit" class="btn btn-primary" onClick={event => {
                        handleCreateTag()
                    }}>Update</button>
                }
            </div>
        </div>
    </Container>
)}

export default TagForm;