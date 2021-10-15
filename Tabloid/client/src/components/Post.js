import React from "react";
import { Link } from "react-router-dom";
import {Card ,CardBody} from "reactstrap"
import { compareUserIdToCreatorId } from "../modules/postManager";










































const Post = ({post}) => {




    return (
        <Card className="">
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
                {post.userProfile?.displayName}
                {post.category?.name}
                {post.isByCurrentUser != true ? <p>"user"</p> : <p>"no match"</p>}
            </CardBody>
        </Card>
    )
}
export default Post
