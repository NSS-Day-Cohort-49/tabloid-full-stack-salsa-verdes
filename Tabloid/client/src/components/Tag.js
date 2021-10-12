import React from "react";
import {Card ,CardBody} from "reactstrap"

const Tag = ({tag}) => {
    return (
        <Card className="">
            <CardBody>
                <strong>{tag.Name}</strong>
            </CardBody>
        </Card>
    )
}
export default tag
