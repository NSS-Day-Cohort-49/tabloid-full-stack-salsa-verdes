import React, { useEffect, useState } from "react";
import Post from "./Post";

const PostList = () => {

const [posts, setPosts] = useState([])

const getPosts = () => {
    getPosts().then(posts => setPosts(posts));
};

useEffect(() => {
    getPosts()
},[]);

return (
    <div className="container">
        <div className="row justify-content-center">
            {posts.map((post) => (
                <Post post = {post} key = {post.Id} />
            ))}
        </div>
    </div>
);
}
export default PostList;