import React from "react";
import { Link } from "react-router-dom";
import {Card ,CardBody, Col, Row, Button} from "reactstrap"










































const Post = ({post}) => {

















const handleClickDeletePost = () => {
    return
}

const handleClickEditPost = () => {
    return
}

    return (
        <Card className="">
            <CardBody>
                {post.isByCurrentUser == true ? 
                <div>
                <Row>
                    <Col>
                    <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                     </Link>
                    {post.userProfile?.displayName}
                    {post.category?.name}
                    </Col>
                    <Col>
                        <Button onClick={handleClickEditPost}color="primary">Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleClickDeletePost}color="danger">Delete</Button>
                    </Col>
                </Row>
                </div>
                 : 
                 <Col>
                 <Link to={`/post/${post.id}`}>
                 <strong>{post.title}</strong>
                  </Link>
                 {post.userProfile?.displayName}
                 {post.category?.name}
                 </Col>}
            </CardBody>
        </Card>
    )
}
export default Post
