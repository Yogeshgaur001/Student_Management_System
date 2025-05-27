import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    // Validate inputs
    if (!email || !password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      console.log('Attempting login:', { email, password });
      const response = await axios.post('/auth/login', { 
        email, 
        password 
      });
      
      console.log('Login response:', response.data);
      
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2.5rem 2rem',
          borderRadius: '18px',
          boxShadow: '0 8px 32px 0 rgba(60, 80, 180, 0.10)',
          width: '370px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.2rem',
            boxShadow: '0 2px 8px 0 rgba(60, 80, 180, 0.10)',
        }}>
          <svg width="32" height="32" fill="#2575fc" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 8 1.34 8 4v2H4v-2c0-2.66 5.3-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z"/>
          </svg>
        </div>
        <h2 style={{ marginBottom: '1.2rem', color: '#2575fc', fontWeight: 700, letterSpacing: 1 }}>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e0e7ef',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            background: '#f8fafc',
            transition: 'border 0.2s',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #e0e7ef',
            borderRadius: '8px',
            fontSize: '1rem',
            outline: 'none',
            background: '#f8fafc',
            transition: 'border 0.2s',
          }}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: loading
              ? '#b2bec3'
              : 'linear-gradient(90deg, #a1c4fd 0%, #2575fc 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px 0 rgba(60, 80, 180, 0.08)',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '1rem', fontWeight: 'bold' }}>
            {error}
          </div>
        )}
        <div style={{ fontSize: '0.95rem', color: '#636e72' }}>
          Don't have an account?{' '}
          <span
            style={{
              color: '#2575fc',
              cursor: 'pointer',
              fontWeight: 500,
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </div>
      </div>
    </div>
  );
}