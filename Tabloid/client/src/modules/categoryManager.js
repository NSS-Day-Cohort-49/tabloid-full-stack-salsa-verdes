import React, { useState, createContext } from "react"

export const CategoryContext = createContext()

const _apiUrl = '/api/category';

export const getAllCategories = () => {
  return fetch(_apiUrl)
    .then((res) => res.json())
};

export const addCategory = (category) => {
  return fetch(_apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });
};

// const getCategoryById = (id) => {
//   return fetch(`http://localhost:5001/categories/${id}`)
//   .then(res => res.json())
//   }

// const updateCategory = category => {
//   return fetch(`http://localhost:5001/categories/${category.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(category)
//   })
//     .then(getAllCategories)
// }

// const deleteCategory = categoryId => {
//   return fetch(`http://localhost:5001/categories/${categoryId}`, {
//     method: "DELETE"
//   })
//     .then(getAllCategories)
// }
