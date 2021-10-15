import React, {useEffect, useState, UseState} from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import {  getPostById } from "../modules/postManager";
import { Link } from "react-router-dom";
import { getPostTags, updatePostTags } from "../modules/postTagManager"
import { getTags } from "../modules/tagManager";
import { Row } from "reactstrap";


export const PostDetails = () => {
    const [post, setPost ] = useState({});
    const [ tags, setTags ] = useState([]);
    const [ postTags, setPostTags ] = useState([]);
    const [ showTags, setShowTags ] = useState(false);
    const { id } = useParams();

    const date = new Date(post.publishDateTime).toDateString()

    const history = useHistory();

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

const handleClickCommentForm = () => {
    history.push("/comment/add")
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
            </div>
                <div>


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
                <Link to={`/Comment/GetCommentsByPost/${id}`}>
                    <button class = "btn-primary" type="button">
                        My Comments
                    </button>

                </Link>     
                    {/* Not yet working */}
                    {/* <button className="btn-primary" onClick={handleClickCommentForm} color="primary">Add a Comment</button> */}
                </div>
            </div>
    )
}
