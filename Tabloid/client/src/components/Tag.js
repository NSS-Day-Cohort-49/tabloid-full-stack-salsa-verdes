import React from "react";
import {Card ,CardBody, Row, Button, Col} from "reactstrap"
import { deleteTag, getTags } from "../modules/tagManager";
import { useHistory } from "react-router-dom";

const Tag = ({tag, setTags, getTags}) => {

const history = useHistory();

const handleClickDeleteTag = () => {
    deleteTag(tag)
    .then(getTags().then(tags => setTags(tags)));
}

    return (
        <Card className="">
            <CardBody>
                <Row>
                    <Col>
                        <strong>{tag.name}</strong>
                    </Col>
                    <Col>
                        <Button onClick={handleClickDeleteTag}color="danger">Delete</Button>
                    </Col>
                    <Col>
                        <Button onClick={history.push(`/tag/create/${tag.id}`)}color="primary">Edit</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Tag
