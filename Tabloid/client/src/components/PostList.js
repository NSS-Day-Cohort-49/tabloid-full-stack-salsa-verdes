import React, { useEffect, useState } from "react";
import { getPosts } from "../modules/postManager";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // export const PostList = () => {

  const getAllPosts = () => {
    getPosts().then((posts) => setPosts(posts));
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="container">
      <h1>Posts</h1>
      <div className="row justify-content-center">
        <p>
          {posts.map((post) => (
            <Post post={post} key={post.Id} />
          ))}
        </p>
      </div>
    </div>
  );
};

export default PostList;

//         <h1>Posts</h1>
//         <div className="row justify-content-center">
//             <p>
//             {posts.map((post) => (
//                 <Post post = {post} key = {post.Id}  setPosts={setPosts} getPosts={getPosts}/>
//             ))}
//             </p>
//         </div>
//     </div>
//     );
// };
