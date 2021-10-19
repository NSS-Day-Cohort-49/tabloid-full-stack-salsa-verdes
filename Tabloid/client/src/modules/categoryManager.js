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

export const getCategoryById = (id) => {
  return fetch(`${_apiUrl}/${id}`)
  .then((res) => res.json())
};

  export const updateCategory = (category) => {
    return fetch(`${_apiUrl}/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    }).then(getAllCategories());
}

export const deleteCategory = (category) => {
  return fetch(`${_apiUrl}/${category.id}`, {
    method: "DELETE"
  })
}
