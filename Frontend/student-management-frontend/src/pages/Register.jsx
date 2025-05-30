import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from '../api/axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // React Query mutation for registration
  const registerMutation = useMutation({
    mutationFn: async () => {
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      const res = await axios.post('/auth/register', { email, password });
      return res.data;
    },
    onSuccess: () => {
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    },
    onError: (err) => {
      setSuccess('');
    },
  });

  const handleRegister = () => {
    setSuccess('');
    registerMutation.mutate();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2rem',
        borderRadius: '18px',
        boxShadow: '0 8px 32px 0 rgba(60, 80, 180, 0.10)',
        width: '370px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h2 style={{ marginBottom: '1.2rem', color: '#2575fc', fontWeight: 700 }}>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={handleRegister}
          disabled={registerMutation.isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: registerMutation.isLoading
              ? '#b2bec3'
              : 'linear-gradient(90deg, #a1c4fd 0%, #2575fc 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: registerMutation.isLoading ? 'not-allowed' : 'pointer',
            marginBottom: '1rem',
            transition: 'background 0.2s',
            boxShadow: '0 2px 8px 0 rgba(60, 80, 180, 0.08)',
          }}
        >
          {registerMutation.isLoading ? 'Registering...' : 'Register'}
        </button>

        {registerMutation.error && (
          <div style={{ color: '#e74c3c', marginBottom: '1rem', fontWeight: 'bold' }}>
            {registerMutation.error.message}
          </div>
        )}
        {success && (
          <div style={{ color: '#27ae60', marginBottom: '1rem', fontWeight: 'bold' }}>
            {success}
          </div>
        )}
        <div style={{ fontSize: '0.95rem', color: '#636e72' }}>
          Already have an account?{' '}
          <span
            style={{
              color: '#2575fc',
              cursor: 'pointer',
              fontWeight: 500,
              textDecoration: 'underline',
            }}
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  border: '1px solid #e0e7ef',
  borderRadius: '8px',
  fontSize: '1rem',
  outline: 'none',
  background: '#f8fafc',
  transition: 'border 0.2s',
};
