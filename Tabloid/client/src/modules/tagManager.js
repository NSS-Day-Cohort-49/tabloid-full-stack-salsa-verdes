const _apiUrl = "/api/tag" 

export const getTags = () => {
    return fetch(_apiUrl)
    .then((res) => res.json())
};

export const addTag = (tag) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tag),
    }).then(getTags());
}

export const deleteTag = (tag) => {
    return fetch(`${_apiUrl}/${tag.id}`, {
        method: "DELETE"
    })
    .then(getTags());
}

export const updateTag = (tag) => {
    return fetch(_apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        vody: JSON.stringify(tag),
    }).then(getTags());
}