import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import './EditStudent.css';


export default function EditStudent() {
  const { id } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    axios.get(`/students/${id}`).then((res) => {
      const student = res.data;
      for (let key in student) {
        setValue(key, student[key]);
      }
      setPhotoPreview(`http://localhost:3000/uploads/${student.photo}`);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/students/${id}`, data);
      alert('Student updated');
      navigate('/students');
    } catch {
      alert('Failed to update');
    }
  };

  const handleCancel = () => {
    navigate('/students');
  };

  return (
    <div className="edit-student-container">
      <h2>✏️ Edit Student</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-form-group">
          <label htmlFor="name">Name</label>
          <input id="name" placeholder="Name" {...register('name')} />
        </div>

        <div className="edit-form-group">
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="Email" type="email" {...register('email')} />
        </div>

        <div className="edit-form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input id="dob" type="date" {...register('dob')} />
        </div>

        <div className="edit-form-group">
          <label htmlFor="branch">Branch</label>
          <input id="branch" placeholder="Branch" {...register('branch')} />
        </div>

        <div className="edit-form-group">
          <label htmlFor="semester">Semester</label>
          <input id="semester" placeholder="Semester" {...register('semester')} />
        </div>

        {photoPreview && (
          <div className="edit-form-group">
            <label>Current Photo</label>
            <img src={photoPreview} alt="Student" />
          </div>
        )}

        <div className="edit-buttons">
          <button type="submit" className="edit-button-save">Save Changes</button>
          <button type="button" className="edit-button-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
