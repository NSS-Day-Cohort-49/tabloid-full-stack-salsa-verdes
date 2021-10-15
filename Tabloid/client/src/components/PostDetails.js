import React, {useEffect, useState, UseState} from "react";
import { useParams } from "react-router-dom";
import {  getPostById } from "../modules/postManager";
import { getTags } from "../modules/tagManager";
import { getPostTags, updatePostTags } from "../modules/postTagManager"
import { Row } from "reactstrap";


export const PostDetails = () => {
    const [post, setPost ] = useState({});
    const [ tags, setTags ] = useState([]);
    const [ postTags, setPostTags ] = useState([]);
    const [ showTags, setShowTags ] = useState(false);
    const { id } = useParams();

    const date = new Date(post.publishDateTime).toDateString()

    useEffect(() => {
        getPostById(id)
        .then((post) => setPost(post))
        .then(getTags()
        .then((tags) => setTags(tags)))
        .then(getPostTags(id)
        .then((postTags) => setPostTags(postTags)))
    }, [])

const handleCheck = (tagId) => {
    const postTag = { tagId: tagId, postId: id }
    updatePostTags(postTag)
    .then(getPostTags(id))
    .then(pt => setPostTags(pt))
}

const handleClickShowTags = () => {
    if (showTags)
    {
        setShowTags(false)
    }
    else (setShowTags(true))
}
    return (
        <div className="container">
            {showTags?
            <>
            <div class="tagsModal">
                {tags.map(tag =>
                <>
                <label>{tag.name}</label>
                <input name={tag.name} id={tag.id} type="checkbox" checked={postTags.some(postTag => postTag.tagId === tag.id) ? "checked" : false} onChange={(event) => handleCheck(tag.id)}/>
                </>)}
            </div>
            </>
            :
            null}              
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                        <img src={post.imageLocation} /> 
                        <Row>
                        <h2>{post.title}</h2>
                        {post.isByCurrentUser?
                        <button type="submit" class="btn btn-primary mx-3" onClick={event => {
                        handleClickShowTags()
                    }}>{showTags? "Close" : "Manage Tags"}</button> : null}
                        </Row>
                        <div>Tags : {postTags.map(pt => `${pt.tagName} `)}</div>
                        <div>{post.category?.name}</div>
                        <div>Posted By: {post.userProfile?.displayName} on {date}</div><br></br>
                        <p>{post.content}</p>

                </div>
            </div>
        </div>
    )
}
