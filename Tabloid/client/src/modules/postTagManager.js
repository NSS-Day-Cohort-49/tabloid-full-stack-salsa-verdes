const _apiUrl = "/api/postTag" 

export const addPostTag = (postTag) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postTag),
    })
    // .then(getTags());
}