import React from "react";
import { Link } from "react-router-dom";
import {Card ,CardBody} from "reactstrap"

const Post = ({post}) => {
    return (
        <Card className="">
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
                {post.userProfile?.displayName}
                {post.category?.name}
            </CardBody>
        </Card>
    )
}
export default Post
