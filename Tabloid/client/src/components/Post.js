import React from "react";
import { Link, useHistory } from "react-router-dom";
import {Card ,CardBody, Col, Row, Button} from "reactstrap"
import { deletePost, getPosts } from "../modules/postManager";

export const Post = ({post, setPosts}) => {

const history = useHistory();

const handleClickEditPost = () => {
    history.push(`/post/edit/${post.id}`)
}

    const handleClickDeletePost = () => {
        const confirm = window.confirm("Are you sure you want to delete this post?")
        if(confirm== true)
        {deletePost(post)
        .then(getPosts().then(posts => setPosts(posts)))} else {
        return;
    }}

    return (
        <Card>
            <CardBody>
                    <Row>
                        <Col>
                    <Link to={`/post/${post.id}`}>
                        <strong>Title: {post.title}</strong>
                    </Link>
                        </Col>
                    <Col>
                    Posted By: {post.userProfile?.displayName}
                    </Col>
                    <Col>
                    Category: {post.category?.name}
                    </Col>
                    {post.isByCurrentUser == true ? 
                <>
                    <Col>
                        <Button onClick={handleClickDeletePost}color="danger">Delete</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleClickEditPost}color="primary">Edit</Button>
                    </Col>
                </>
                 : null}
                </Row>    
            </CardBody>
        </Card>
    )
}