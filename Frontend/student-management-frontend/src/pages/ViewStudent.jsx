import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';

const fetchStudent = async (id) => {
  const res = await axios.get(`/students/${id}`);
  return res.data;
};

export default function ViewStudent() {
  const { id } = useParams();

  const { data: student, isLoading, isError } = useQuery({
    queryKey: ['student', id],
    queryFn: () => fetchStudent(id),
    enabled: !!id, // only run when id is available
  });

  if (isLoading) return <div style={{ padding: '2rem' }}>Loading...</div>;
  if (isError) return <div style={{ padding: '2rem' }}>Error loading student.</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>🎓 Student Details</h2>
      <div style={{
        marginTop: '1rem',
        padding: '1.5rem',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        maxWidth: '500px'
      }}>
        <img
          src={`http://localhost:3000/uploads/${student.photo}`}
          alt="Student"
          width="100"
          height="100"
          style={{ borderRadius: '50%', marginBottom: '1rem', objectFit: 'cover' }}
        />
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>DOB:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Branch:</strong> {student.branch}</p>
      </div>
    </div>
  );
}
