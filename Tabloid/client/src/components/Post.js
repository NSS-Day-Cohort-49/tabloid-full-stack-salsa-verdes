import React from "react";
import { Link } from "react-router-dom";
import {Card ,CardBody} from "reactstrap"
import { compareUserIdToCreatorId } from "../modules/postManager";










































const Post = ({post}) => {

    
const postedByUserCheck = ()=> {
    compareUserIdToCreatorId(post)
    .then(res => {
        if (res.ok){
            return true;
        }
        else {
            return false
        }
})
}


    return (
        <Card className="">
            <CardBody>
                <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
                {post.userProfile?.displayName}
                {post.category?.name}
                {postedByUserCheck() ? <p>"user"</p> : <p>"no match"</p>}
            </CardBody>
        </Card>
    )
}
export default Post
