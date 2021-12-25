import React from "react";
import "./Style.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
const App = () => {
  return (
    <div style={{ width: "50%", margin: "0 auto !important" }}>
      <h1>Blog App</h1>
      <PostCreate />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
