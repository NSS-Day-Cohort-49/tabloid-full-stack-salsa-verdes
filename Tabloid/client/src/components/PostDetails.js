import React, {useEffect, useState, UseState} from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams } from "react-router-dom";
import {  getPostsId } from "../modules/postManager";
import Post from "./Post";


export const PostDetails = () => {
    const [post, setPost ] = useState({});
    const { id } = useParams();

    const date = new Date(post.publishDateTime).toDateString()

    useEffect(() => {
        getPostsId(id)
        .then(setPost);
    })

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-12 col-lg-6">
                    {/* <Post post={post} /> */}

                        <img src={post.imageLocation} /> 
                        <h2>{post.title}</h2>
                        <div>{post.category?.name}</div>
                        <div>{post.userProfile?.displayName} {date}</div><br></br>
                        <p>{post.content}</p>

                </div>
            </div>
        </div>
    )
}


// Given a user is viewing a list of Posts
// When they select a post to read
// Then they should be directed to a Post Detail page that shows the Post Details.

// Post Details include:

// Title
// Header image (if exists)
// Content
// Publication date (MM/DD/YYYY)
// Author's Display Name