const _apiUrl = "/api/comment"

export const GetAllCommentsByPost = (id) => {
    return fetch(`${_apiUrl}/GetCommentsByPost/${id}`)
    .then(res => res.json())
};