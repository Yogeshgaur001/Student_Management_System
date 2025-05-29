import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import './Student.css';
import Navbar from '../components/NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios.get('/students').then((res) => setStudents(res.data));
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      await axios.delete(`/students/${confirmDeleteId}`);
      toast.success('🗑️ Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to delete student!');
    } finally {
      setShowConfirmModal(false);
      setConfirmDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    toast.info('❎ Deletion cancelled.');
    setShowConfirmModal(false);
    setConfirmDeleteId(null);
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
    <>
      <Navbar />
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
                  <button onClick={() => handleView(s)} className="button-view">
                    View
                  </button>
                  <Link to={`/edit/${s.id}`}>
                    <button className="button-edit">Edit</button>
                  </Link>
                  <button
                    onClick={() => confirmDelete(s.id)}
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
              <p><strong>Semester:</strong> {selectedStudent.semester}</p>
              <p><strong>Branch:</strong> {selectedStudent.branch}</p>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>⚠️ Confirm Deletion</h3>
              <p>Are you sure you want to delete this student?</p>
              <div className="modal-buttons">
                <button onClick={handleConfirmedDelete} className="button-confirm">
                  Yes, Delete
                </button>
                <button onClick={handleCancelDelete} className="button-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </>
  );
}
