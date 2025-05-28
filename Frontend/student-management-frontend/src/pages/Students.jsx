import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import './Student.css'; // ✅ Corrected path if CSS is in the same folder

export default function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('/students').then((res) => setStudents(res.data));
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure to delete?')) {
      await axios.delete(`/students/${id}`);
      fetchStudents();
    }
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  return (
    <div className="students-container">
      <h2>📋 All Students</h2>

      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>
                <img
                  src={`http://localhost:3000/uploads/${s.photo}`}
                  width="50"
                  height="50"
                  alt="student"
                />
              </td>
              <td>
                <button onClick={() => handleView(s)} className="button-view">View</button>
                <Link to={`/edit/${s.id}`}>
                  <button className="button-edit">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="button-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close">✖</button>
            <h3>🎓 Student Details</h3>
            <img
              src={`http://localhost:3000/uploads/${selectedStudent.photo}`}
              alt="Student"
              width="100"
              height="100"
            />
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>DOB:</strong> {selectedStudent.dob}</p>
            <p><strong>semester:</strong> {selectedStudent.semester}</p>
            <p><strong>Branch:</strong> {selectedStudent.branch}</p>
          </div>
        </div>
      )}
    </div>
  );
}
