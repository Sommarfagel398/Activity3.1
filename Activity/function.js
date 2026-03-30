const URL = "https://jsonplaceholder.typicode.com/posts";

// GET
async function getData() {
    const res = await fetch(URL);
    const data = await res.json();
    document.getElementById('output').textContent =
        `Status: ${res.status}\n\n${JSON.stringify(data, null, 2)}`;
}

// POST
async function postData() {
    const res = await fetch(URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: 'New Post',
            body: 'This is a test post',
            userId: 1
        })
    });
    const data = await res.json();
    document.getElementById('output').textContent =
        `Status: ${res.status}\n\n${JSON.stringify(data, null, 2)}`;
}

// PUT
async function putData() {
    const res = await fetch(`${URL}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: 1,
            title: 'Updated Post',
            body: 'This post has been updated',
            userId: 1
        })
    });
    const data = await res.json();
    document.getElementById('output').textContent =
        `Status: ${res.status}\n\n${JSON.stringify(data, null, 2)}`;
}

// PATCH
async function patchData() {
    const res = await fetch(`${URL}/1`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Partially Updated Title' })
    });
    const data = await res.json();
    document.getElementById('output').textContent =
        `Status: ${res.status}\n\n${JSON.stringify(data, null, 2)}`;
}

// DELETE
async function delData() {
    const res = await fetch(`${URL}/1`, { method: 'DELETE' });
    document.getElementById('output').textContent =
        `Status: ${res.status}`;
}

