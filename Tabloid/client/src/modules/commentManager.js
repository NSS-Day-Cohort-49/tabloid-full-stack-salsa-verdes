const _apiUrl = "/api/comment"

export const GetAllComments = (id) => {
    return fetch(`${_apiUrl}/GetCommentsByPostId${id}`)
    .then(res => res.json())
};