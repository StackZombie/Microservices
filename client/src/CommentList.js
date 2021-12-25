import React, { useState, useEffect } from "react";
import axios from "axios";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4002/posts/${postId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (comments) {
    return (
      <ul key={postId}>
        {comments.map(({ id, content }, identity) => {
          return <li key={identity}>{content.comment}</li>;
        })}
      </ul>
    );
  }
  return null;
};

export default CommentList;
