import React from "react";
import {Card ,CardBody} from "reactstrap"

const Tag = ({tag}) => {
    return (
        <Card className="">
            <CardBody>
                <strong>{tag.name}</strong>
            </CardBody>
        </Card>
    )
}
export default Tag
