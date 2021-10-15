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
                <Row>
                <Col>
                    <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                     </Link>
                    {post.userProfile?.displayName}
                    {post.category?.name}
                </Col>
                {post.isByCurrentUser == true ? 
                <>
                    <Col>
                        <Button onClick={handleClickEditPost}color="primary">Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleClickDeletePost}color="danger">Delete</Button>
                    </Col>
                </>
                 : null}
                </Row>    
            </CardBody>
        </Card>
    )
}
export default Post
