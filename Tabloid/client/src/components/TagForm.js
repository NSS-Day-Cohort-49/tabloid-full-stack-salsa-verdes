import React, { useState } from "react";
import { addTag } from "../modules/tagManager";
import { useHistory } from "react-router-dom";
import {Container} from "reactstrap"

const VideoForm = () => {

    const [ tag, setTag ] = useState({
        name : "",
    })

    const handleInput = (event) => {

        const newTag = {...tag};
        newTag[event.target.id] = event.target.value;
        setTag(newTag);

    }

    const handleCreateTag = () => {
        
        addTag(tag)

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
                <button type="submit" class="btn btn-primary" onClick={event => {
                    handleCreateTag()
                }}>Submit</button>
            </div>
        </div>
    </Container>
)}

export default VideoForm;