import { useState } from 'react';
import { api } from '../api/client.js';
import { useApi } from '../hooks.js';
import { ROLES } from '../context/AuthContext.jsx';
import { Async, Card, DataTable, Field, Tabs } from '../components/ui.jsx';

export default function Admin() {
  const [tab, setTab] = useState('users');
  const users = useApi('/users/', {}, { filtered: false });
  const locs = useApi('/admin/locations', {}, { filtered: false });
  const meta = useApi('/meta/filters', {}, { filtered: false });
  const audit = useApi('/audit', {}, { filtered: false });
  const [f, setF] = useState({ username: '', name: '', role: 'analyst', password: '', restaurant_id: '' });
  const emptyLocation = { id: null, name: '', city: '', area: '', status: 'Active', opening_date: '' };
  const [location, setLocation] = useState(emptyLocation);
  const [msg, setMsg] = useState('');
  const assignRestaurant = async (userId, restaurantId) => {
    setMsg('');
    try {
      await api(`/users/${userId}`, { method: 'PATCH', body: { restaurant_id: Number(restaurantId) } });
      users.reload();
      setMsg('Restaurant assignment updated.');
    } catch (x) { setMsg(x.message); }
  };
  const add = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      await api('/users/', {
        method: 'POST',
        body: {
          name: f.name,
          email: f.username,
          role: f.role === 'manager' ? 'restaurant_manager' : f.role,
          password: f.password || null,
          restaurant_id: f.role === 'manager' ? Number(f.restaurant_id) : null,
        },
      });
      setF({ username: '', name: '', role: 'analyst', password: '', restaurant_id: '' });
      users.reload();
      setMsg(f.password ? 'User created with the temporary password.' : 'User created. A temporary password was emailed.');
    } catch (x) { setMsg(x.message); }
  };
  const saveLocation = async (e) => {
    e.preventDefault(); setMsg('');
    try {
      const body = { ...location, opening_date: location.opening_date || null };
      delete body.id;
      await api(location.id ? `/admin/locations/${location.id}` : '/admin/locations', { method: location.id ? 'PATCH' : 'POST', body });
      setLocation(emptyLocation); locs.reload(); setMsg(location.id ? 'Location updated.' : 'Location created.');
    } catch (x) { setMsg(x.message); }
  };
  return (
    <div className="stack">
      <Tabs value={tab} onChange={setTab} tabs={[['users', 'Users'], ['locations', 'Restaurant locations'], ['audit', 'Audit trail']]} />
      {tab === 'users' && (<>
        <Card title="Create user"><form onSubmit={add} className="grid g2" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', alignItems: 'end' }}>
          <Field label="Email"><input className="input" required value={f.username} onChange={(e) => setF({ ...f, username: e.target.value })} /></Field>
          <Field label="Full name"><input className="input" required value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
          <Field label="Role"><select className="input" value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}>{Object.entries(ROLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></Field>
          {f.role === 'manager' && <Field label="Restaurant"><select className="input" required value={f.restaurant_id} onChange={(e) => setF({ ...f, restaurant_id: e.target.value })}><option value="">Select restaurant</option>{(meta.data?.locations || []).map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select></Field>}
          <Field label="Temporary password (optional)"><input className="input" type="password" minLength={8} placeholder="Generated and emailed if empty" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></Field>
          <button className="btn primary">Create user</button></form>{msg && <p className="small" role="status">{msg}</p>}</Card>
        <Card title="Users"><Async state={users}>{(u) => <DataTable rows={u.map((row) => ({ ...row, username: row.email, role: row.role === 'restaurant_manager' ? 'manager' : row.role, location: row.restaurant_id }))} columns={[{ key: 'username', label: 'Email' }, { key: 'name', label: 'Name' }, { key: 'role', label: 'Role', render: (v) => ROLES[v] }, { key: 'location', label: 'Restaurant', render: (v, r) => r.role === 'manager' ? <select className="input" value={v || ''} onChange={(e) => assignRestaurant(r.id, e.target.value)}><option value="" disabled>Select restaurant</option>{(meta.data?.locations || []).map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}</select> : 'All restaurants' }, { key: 'is_active', label: 'Status', render: (v) => v ? 'Active' : 'Disabled' }, { key: 'must_change_password', label: 'Password', render: (v) => v ? 'Change required' : 'Set' }]} />}</Async></Card>
      </>)}
      {tab === 'locations' && (<>
        <Card title="Restaurant locations" sub="Select a row to edit its name, area or status"><Async state={locs}>{(rows) => <DataTable search rows={rows} onRowClick={(row) => setLocation(row)} columns={[{ key: 'id', label: 'ID' }, { key: 'name', label: 'Name' }, { key: 'city', label: 'City' }, { key: 'area', label: 'Area' }, { key: 'status', label: 'Status' }, { key: 'source', label: 'Source' }]} />}</Async></Card>
      </>)}
      {tab === 'audit' && <Card title="Audit trail" sub="Jobs, predictions, exports and admin actions"><Async state={audit}>{(a) => <DataTable rows={a.map((x, i) => ({ ...x, id: i }))} columns={[{ key: 'time', label: 'Time' }, { key: 'user', label: 'User' }, { key: 'area', label: 'Area' }, { key: 'action', label: 'Action' }]} />}</Async></Card>}
    </div>
  );
}
