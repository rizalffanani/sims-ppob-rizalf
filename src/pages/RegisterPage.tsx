import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { register } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector(state => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(register({ email, firstName, lastName, password }));
    if (register.fulfilled.match(result)) {
      navigate('/login');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="masukkan email anda"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="nama depan"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <br />
        <input
          type="text"
          placeholder="nama belakang"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="buat password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="konfirmasi password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Sudah punya akun? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
