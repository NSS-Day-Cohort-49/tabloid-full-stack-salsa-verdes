import React from "react";
import {Card ,CardBody} from "reactstrap"

const Post = ({post}) => {
    return (
        <Card className="">
            <CardBody>
                <strong>{post.title}</strong>
                {post.userProfile.displayName}
                {post.category.name}
            </CardBody>
        </Card>
    )
}
export default Post
