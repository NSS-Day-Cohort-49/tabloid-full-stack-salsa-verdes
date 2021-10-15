const _apiUrl = "/api/comment"

export const GetAllCommentsByPost = (id) => {
    return fetch(`${_apiUrl}/GetCommentsByPost/${id}`)
    .then(res => res.json())
};

export const addComment = (comment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    }).then(GetAllCommentsByPost());
}