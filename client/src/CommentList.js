import React from "react";

const CommentList = ({ comments }) => {
  if (comments) {
    return (
      <ul>
        {comments.map(({ id, comment, status }) => {
          let content = "";
          if (status === "approved") content = comment;
          else if (status === "pending")
            content = "This comment is being moderated ";
          else if (status === "rejected")
            content = "Sorry , this comment is rejected";

          return <li key={id}>{content}</li>;
        })}
      </ul>
    );
  }
  return null;
};

export default CommentList;
