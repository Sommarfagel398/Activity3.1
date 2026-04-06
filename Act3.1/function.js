const API_URL = "https://jsonplaceholder.typicode.com/users";
let currentMethod = 'GET';
//for buttons in html
function activateMethod(method) {
    currentMethod = method;
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const map = { GET:'btn-get', POST:'btn-post', PUT:'btn-put', PATCH:'btn-patch', DELETE:'btn-delete' };
    document.querySelector('.' + map[method]).classList.add('active');

    const fp = document.getElementById('formPanel');
    if (method === 'GET') { fp.classList.remove('visible'); getData(); }
    else fp.classList.add('visible');
}
//handles submation forms
function handleSubmit() {
    ({ POST: postData, PUT: putData, PATCH: patchData, DELETE: delData })[currentMethod]?.();
}

function setLoading() {
    document.getElementById('output').innerHTML =
        '<div class="loading"><span></span><span></span><span></span></div>';
    document.getElementById('outputMeta').textContent = '';
}
//Status codes
function setStatus(code) {
    const el = document.getElementById('statusCode');
    el.textContent = code;
    el.className = code >= 200 && code < 300 ? (code === 201 ? 'created' : 'ok') : 'err';
    document.getElementById('statusText').textContent =
        ({ 200:'OK', 201:'Created', 204:'No Content', 404:'Not Found', 500:'Server Error' })[code] || '';
}
//rendering the Json output
function renderOutput(status, data, method) {
    setStatus(status);
    document.getElementById('outputMeta').textContent = `${status} · ${method} /users`;
    const out = document.getElementById('output');

    if (method === 'GET' && Array.isArray(data)) {
        let text = '';
        data.forEach((user, index) => {
            text += `ID: ${index + 1}. \t Name: ${user.name} \t Username: ${user.username} \t Email: ${user.email} \t Address: ${user.address?.city}<br>\n`;
        });
        out.innerHTML = `<pre>${text}</pre>`;
    } else if (['POST','PUT','PATCH'].includes(method)) {
        // Show key info neatly
        let text = '';
            text += `ID: ${data.id ?? '-'}. \t Name: ${data.name ?? '-'}. \t Username: ${data.username ?? '-'}. \t Email: ${data.email ?? '-'}. \t  Address: ${data.address.street ?? '-'}\n`
        out.innerHTML = `<pre>${text}</pre>`;
    } else if (method === 'DELETE') {
        // Simple delete message
        out.innerHTML = `<pre>${data.message}</pre>`;
    } else {
        // fallback
        out.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
}


// GET
async function getData() {
    setLoading();
    const res = await fetch(API_URL);
    renderOutput(res.status, await res.json(), 'GET');
}

// POST
async function postData() {
    setLoading();
    const res = await fetch(API_URL, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            name: document.getElementById('fname').value || 'New User',
            username: document.getElementById('user').value || 'newuser',
            email: document.getElementById('email').value || 'user@example.com',
            address: { street: document.getElementById('address').value || '123 Main St' }
        })
    });
    renderOutput(res.status, await res.json(), 'POST');
}

// PUT
async function putData() {
    setLoading();
    const id = document.getElementById('id').value || '1';
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT', headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            id: Number(id),
            name: document.getElementById('fname').value || 'Updated User',
            username: document.getElementById('user').value || 'updateduser',
            email: document.getElementById('email').value || 'updated@example.com',
            address: { street: document.getElementById('address').value || '456 New St' }
        })
    });
    renderOutput(res.status, await res.json(), 'PUT');
}

// PATCH
async function patchData() {
    setLoading();
    const id = document.getElementById('id').value || '1';
    const payload = {};
    if (document.getElementById('fname').value)  payload.name     = document.getElementById('fname').value;
    if (document.getElementById('user').value)   payload.username = document.getElementById('user').value;
    if (document.getElementById('email').value)  payload.email    = document.getElementById('email').value;
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
    });
    renderOutput(res.status, await res.json(), 'PATCH');
}

// DELETE
async function delData() {
    setLoading();
    const id = document.getElementById('id').value || '1';
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    renderOutput(res.status, { message: `User ${id} deleted`, status: res.status }, 'DELETE');
}
