import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";

const CommentCreate = ({ postId }) => {
  const [comment, setComment] = useState("");
  const createComment = async (event) => {
    event.preventDefault();
    console.log("Comment", comment);
    try {
      await axios.post(`http://posts.com/posts/${postId}/comments`, {
        comment,
      });

      setComment("");
    } catch (err) {
      console.log("Error", err);
    }
  };
  return (
    <div>
      <Form onSubmit={createComment}>
        <FormGroup>
          <Label>New Comment</Label>
          <Input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </FormGroup>
        <Button color="secondary">Submit</Button>
      </Form>
    </div>
  );
};
export default CommentCreate;
