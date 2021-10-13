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

const handleClickEditTag = () => {
    history.push(`/tag/create/${tag.id}`)
}

    return (
        <Card>
            <CardBody>
                <Row>
                    <Col>
                        <strong>{tag.name}</strong>
                    </Col>
                    <Col>
                        <Button onClick={handleClickEditTag}color="primary">Edit</Button>
                    </Col>
                    <Col>
                        <Button onClick={handleClickDeleteTag}color="danger">Delete</Button>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    )
}

export default Tag
