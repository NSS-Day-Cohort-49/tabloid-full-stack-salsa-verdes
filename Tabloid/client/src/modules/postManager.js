import { getToken } from "./authManager";

const _apiUrl = "/api/post";

export const getPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getPostsId = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const getMyPosts = () => {
  return getToken()
    .then(
      (token) =>
        //* Returns a promise
        fetch(`${_apiUrl}/myPosts`, {
          method: "Get",
          headers: { authorization: `bearer ${token}` },
        })
      //* Returns a promise
    )
    .then((res) => res.json());
};

export const deletePost = (post) => {
  return fetch(`${_apiUrl}/${post.id}`, {
    method: "DELETE",
  });
};
