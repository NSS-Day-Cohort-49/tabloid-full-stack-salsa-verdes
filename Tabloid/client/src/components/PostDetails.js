import React, {useEffect, useState, UseState} from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import {  getPostsId } from "../modules/postManager";
import { Link } from "react-router-dom";



export const PostDetails = () => {
    const [post, setPost ] = useState({});
    const { id } = useParams();

    const date = new Date(post.publishDateTime).toDateString()

    useEffect(() => {
        getPostsId(id)
        .then(setPost)
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div>


                        <img src={post.imageLocation} /> 
                        <h2>{post.title}</h2>
                        <div>{post.category?.name}</div>
                        <div>Posted By: {post.userProfile?.displayName} on {date}</div><br></br>
                        <p>{post.content}</p>

                </div>
                <Link to={`/Comment/GetCommentsByPost/${id}`}>
                    <button class = "btn-primary" type="button">
                        My Comments
                    </button>
                </Link>     
            </div>
            </div>
    )
}
