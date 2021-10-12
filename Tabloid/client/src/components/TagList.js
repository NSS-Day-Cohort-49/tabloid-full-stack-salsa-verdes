import React, { useEffect, useState } from "react";
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

return (
    <div className="container">
        <h1>Tags</h1>
        <div className="row justify-content-center">
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