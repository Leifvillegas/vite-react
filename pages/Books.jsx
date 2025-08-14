import { useEffect, useState } from 'react';
import { getBooks, addBook, deleteBook, updateBook } from '../src/api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ Title: '', Author: '', Pages: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function load() {
    setErr('');
    try {
      setBooks(await getBooks());
    } catch (e) {
      setErr(e.message || 'Failed to load');
    }
  }

  useEffect(() => { load(); }, []);

  async function onAdd(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await addBook({ Title: form.Title, Author: form.Author, Pages: Number(form.Pages) });
      setForm({ Title: '', Author: '', Pages: '' });
      await load();
    } catch (e) {
      setErr(e.message || 'Create failed');
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id) {
    try {
      setLoading(true);
      await deleteBook(id);
      await load();
    } catch (e) {
      setErr(e.message || 'Delete failed');
    } finally {
      setLoading(false);
    }
  }

  async function onQuickEdit(b) {
    try {
      setLoading(true);
      await updateBook(b._id, { Title: b.Title + ' (Updated)', Author: b.Author, Pages: b.Pages });
      await load();
    } catch (e) {
      setErr(e.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <h1>Books</h1>

      <form onSubmit={onAdd} style={{ display:'grid', gap:8, marginBottom:16 }}>
        <input placeholder="Title"  value={form.Title}  onChange={e=>setForm(f=>({ ...f, Title:e.target.value }))} required />
        <input placeholder="Author" value={form.Author} onChange={e=>setForm(f=>({ ...f, Author:e.target.value }))} required />
        <input placeholder="Pages"  value={form.Pages} onChange={e=>setForm(f=>({ ...f, Pages:e.target.value }))} required type="number" min="1" />
        <button type="submit" disabled={loading}>{loading ? 'Saving…' : 'Add Book'}</button>
      </form>

      {err && <p style={{ color:'crimson' }}>{err}</p>}

      <ul style={{ padding:0, listStyle:'none', display:'grid', gap:8 }}>
        {books.map(b => (
          <li key={b._id} style={{ border:'1px solid #ddd', padding:12, borderRadius:8 }}>
            <div><strong>{b.Title}</strong> — {b.Author} ({b.Pages} pages)</div>
            <div style={{ display:'flex', gap:8, marginTop:8 }}>
              <button onClick={() => onQuickEdit(b)} disabled={loading}>Quick Edit</button>
              <button onClick={() => onDelete(b._id)} disabled={loading}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
