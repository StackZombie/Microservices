import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://posts.com/posts");
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div key={post.id} style={{ width: "300px", marginBottom: "20px" }}>
        <div className="card">
          <div className="card-body">
            <h2>{post.title}</h2>
            <CommentList comments={post.comments} />
            <CommentCreate postId={post.id} />
          </div>
        </div>
      </div>
    );
  });
  console.log(posts);
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
    </div>
  );
};

export default PostList;
