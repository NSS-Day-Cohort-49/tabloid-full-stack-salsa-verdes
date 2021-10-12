import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getTags } from "../modules/tagManager"
import Tag from "./Tag";

const TagList = () => {

const [tags, setTags] = useState([])

const getAllTags = () => {
    getTags().then(tags => setTags(tags));
};

useEffect(() => {
    getAllTags()
},[]);

handleClickTagForm = () => {
    history.push(/tag/create)
}

return (
    <div className="container">
        <div className="row justify-content-center">
        <h1>Tags</h1>
        <button class = "btn-primary" name="tagForm" onClick = {handleClickTagForm} />
            <p>
            {tags.map((tag) => (
                <Tag tag = {tag} key = {tag.Id} />
            ))}
            </p>
        </div>
    </div>
);
}
export default TagList;