import React, { useState, useEffect } from "react";
import {Container, Input} from "reactstrap"
import { useHistory, useParams } from "react-router"
import { addComment } from "../modules/commentManager";


export const CommentForm = () => {

    const history = useHistory();

    const [ comment, setComment ] = useState({
        postId: 0,
        userProfileId: 0,
        subject: "",
        content: "",
        ceateDateTime: "",
    })

    const {id} = useParams();

    const handleInput = (event) => {
        const newComment = {...comment};
        newComment[event.target.id] = event.target.value;
        setComment(newComment);
    }

    const handleCreateComment = () => {
        addComment({
            postId: comment.postId,
            userProfileId: comment.userProfileId,
            subject: comment.subject,
            content: comment.content,
            createDateTime: Date.now(),
        })
        .then(history.push(`/comment/GetCommentsByPost/${id}`))
    }

    return (
        <Container>
            <label for="subject">Subject</label>
            <Input type="text" name="subject" id="subject" placeholder="subject"
              value={comment.subject}
              onChange={handleInput } />
          
          
            <label for="content">Content</label>
            <Input type="text" name="content" id="content" placeholder="content" 
              value={comment.content}
              onChange={handleInput } />
          
          {/* <FormGroup>
            <Label for="ceateDateTime">Date</Label>
            <Input type="datetime-local" name="ceateDateTime" id="ceateDateTime"
              value={comment.ceateDateTime}
              onChange={handleInput } />
          </FormGroup> */}
          <button className="btn btn-primary" onClick={handleCreateComment}>Submit</button>
        </Container>
      );
}