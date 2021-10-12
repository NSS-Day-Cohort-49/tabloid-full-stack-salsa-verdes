import React from "react";
import {Card ,CardBody} from "reactstrap"

const Post = ({post}) => {
    return (
        <Card className="text-left px-2">
            <CardBody>
            <strong>{post.title}</strong>
            {post.userprofile.displayname}
            {post.category.name}
            </CardBody>
        </Card>
    )
}
