import React from "react";

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div className={"header"}>
      {blog.title} {blog.author}
    </div>
    <div className={"content"}>
      blog has {blog.likes} likes
      <button className={"button"} onClick={onClick}>
        like
      </button>
    </div>
  </div>
);

export default SimpleBlog;
