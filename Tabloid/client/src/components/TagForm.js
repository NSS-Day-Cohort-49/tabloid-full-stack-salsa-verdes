import React, { useState } from "react";
import { addTag } from "../modules/videoManager";
import { useHistory } from "react-router-dom";

const VideoForm = () => {

    const [ tag, setTag ] = useState({
        name : "",
    })

    const handleInput = (event) => {

        const newTag = {...tag};
        newTag[event.target.id] = event.target.value;
        setTag(newTag);

    }

    const handleSubmitVideo = () => {
        
        addTag(tag)

        .then(history.push("/tag"))

    }

    const history = useHistory();

return(
    <div className="videoForm">
        <h3>Add a Video</h3>
        <div className="container">
        <div className ="form-group">
                <label for="title">Title</label>
                <input type="title" class="form-control" id="title" placeholder ="Title" value={video.title} onChange={handleInput} required/>
            </div>
            <div className ="form-group">
                <label for="description">Description</label>
                <input type="description" class="form-control" id="description" placeholder ="Description" value={video.description} onChange={handleInput}/>
            </div>
            <div className ="form-group">
                <label for="youtubeUrl">Youtube URL</label>
                <input type="youtubeUrl" class="form-control" id="url" placeholder="Youtube Url" required value={video.url} onChange={handleInput}/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={event => {
                handleSubmitVideo()
            }}>Submit</button>
        </div>
    </div>
)}

export default VideoForm;