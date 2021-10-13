const _apiUrl = "/api/post"

const GetAllComments = (postId, comment) => {
    return fetch(`${_apiUrl}/${postId}/${comment})
    .then(res => res.json())
}