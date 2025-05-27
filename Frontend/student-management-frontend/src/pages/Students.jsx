import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('/students').then((res) => setStudents(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`/students/${id}`);
      fetchStudents(); // refresh list
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f4f7fa',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>📋 All Students</h2>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#e3f2fd', textAlign: 'left' }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Photo</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{s.name}</td>
              <td style={tdStyle}>{s.email}</td>
              <td style={tdStyle}>
                <img
                  src={`http://localhost:3000/uploads/${s.photo}`}
                  width="50"
                  height="50"
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                  alt="student"
                />
              </td>
              <td style={tdStyle}>
                <Link to={`/edit/${s.id}`}>
                  <button style={editButtonStyle}>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(s.id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '12px',
  fontWeight: 'bold',
  color: '#333',
  borderBottom: '2px solid #90caf9',
};

const tdStyle = {
  padding: '12px',
  verticalAlign: 'middle',
};

const editButtonStyle = {
  marginRight: '10px',
  padding: '6px 12px',
  backgroundColor: '#1976d2',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const deleteButtonStyle = {
  padding: '6px 12px',
  backgroundColor: '#e53935',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};
