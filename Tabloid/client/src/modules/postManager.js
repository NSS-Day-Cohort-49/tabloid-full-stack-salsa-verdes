import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";
const _apiUrl = "/api/post" 































































































































export const getPosts = () => {
    return getToken()
    .then((token) =>
    fetch(_apiUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    )};

export const getPostsId = (id) => {
    return getToken()
    .then((token) => fetch(`${_apiUrl}/${id}`,{
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    )};



















export const addPost = (post) => 
{
    return getToken().then((token) =>
        fetch(_apiUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    }))
    
}