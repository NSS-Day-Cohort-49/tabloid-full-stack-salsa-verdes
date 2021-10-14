import React, { useEffect, useState } from "react";
import { getMyPosts } from "../modules/postManager";
import Post from "./Post";
import { getToken } from "../modules/authManager";

const MyPostList = () => {
  const [posts, setMyPosts] = useState([]);

  const getAllMyPosts = () => {
    getMyPosts().then((posts) => setMyPosts(posts));
  };

  useEffect(() => {
    getAllMyPosts();
  }, []);

  return (
    <div className="container">
      <h1>My Posts</h1>
      <div className="row justify-content-center">
        <p>
          //!Err Web Token
          {JSON.parse(posts).map((post) => (
            <Post post={post} key={post.Id} />
          ))}
        </p>
      </div>
    </div>
  );
};
export default MyPostList;
