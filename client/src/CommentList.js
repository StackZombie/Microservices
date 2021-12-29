import React from "react";

const CommentList = ({ comments }) => {
  if (comments) {
    return (
      <ul>
        {comments.map(({ id, content }, identity) => {
          return <li key={identity}>{content.comment}</li>;
        })}
      </ul>
    );
  }
  return null;
};

export default CommentList;
