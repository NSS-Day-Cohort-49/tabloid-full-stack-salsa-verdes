import { getToken } from "./authManager";

const _apiUrl = "/api/post";

export const getPosts = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

export const getPostsId = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const getMyPosts = () => {
  return getToken().then((token) => {
    fetch(`${_apiUrl}/myPosts`, {
      method: "Get",
      headers: { authorization: `bearer ${token}` },
    }).then((res) => res.json());
  });
};
