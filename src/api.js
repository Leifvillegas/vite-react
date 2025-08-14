const API = import.meta.env.VITE_API_BASE || '';

export async function getBooks() {
  const res = await fetch(`${API}/api/bookstore`);
  if (!res.ok) throw new Error(`GET failed: ${res.status}`);
  return res.json();
}

export async function addBook(payload) {
  const res = await fetch(`${API}/api/bookstore/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`POST failed: ${res.status}`);
  return res.json();
}

export async function updateBook(id, payload) {
  const res = await fetch(`${API}/api/bookstore/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
  return res.json();
}

export async function deleteBook(id) {
  const res = await fetch(`${API}/api/bookstore/delete/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE failed: ${res.status}`);
  return res.json();
}
