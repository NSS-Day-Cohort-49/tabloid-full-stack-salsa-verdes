import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {  GetAllCommentsByPost } from "../modules/commentManager";
import { Comment } from "./Comment";

export const CommentList = () => {

    const [comments, setComments] = useState([])
    const { id } = useParams();

    const getPostComments = () => {
        GetAllCommentsByPost(id).then(comments => setComments(comments));
    }

    useEffect(() => {
        getPostComments()
    }, [])

    console.log(comments)
    let reversedComments = comments.sort((a, b ) => b.id - a.id)

    return (
        <div>
            { comments.length === 0 ? (
        
                <div>
                    <h3>No comments on this post</h3>

                    <Link to={`/post`}>
                        <button class = "btn-primary" type="button">
                            Return to Posts
                        </button>
                    </Link>
                </div>
                    
                
        ) : (
            <div>
            {reversedComments.map((comment) => (
                <Comment comment = {comment} key = {comment.Id} />
            ))}
            </div>
             )
        }
        </div>
    )
}