import React from "react";

export const Comment = ({comment}) => {

    const date = new Date(comment.createDateTime).toLocaleDateString()

    return (
    <div>
        <h3>{comment.subject}</h3>
        <p>{comment.content}</p>
        <p>{comment.userProfile.displayName}</p>
        <p>{date}</p>
    </div>
    )
}