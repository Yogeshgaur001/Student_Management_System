import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2d3436',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '6rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        Oops! Page not found.
      </p>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          background: 'linear-gradient(90deg, #a1c4fd, #2575fc)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: 'bold',
          transition: '0.3s',
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
