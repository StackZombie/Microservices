import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";
const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://posts.com/posts/create", {
        title,
      });
      setTitle("");
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="container">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Create Post</Label>
          <Input
            type="text"
            vaue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <Button outline color="success">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PostCreate;
