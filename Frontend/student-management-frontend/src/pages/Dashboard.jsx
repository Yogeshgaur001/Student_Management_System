import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>📊 Dashboard</h2>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Link
          to="/students"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            width: 'fit-content',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
          📚 View Student List
        </Link>

        <Link
          to="/create"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2196F3',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            width: 'fit-content',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#1976D2')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#2196F3')}
        >
          ➕ Create Student
        </Link>
      </nav>
    </div>
  );
}
