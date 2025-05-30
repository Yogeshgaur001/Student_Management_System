import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../api/axios';
import './EditStudent.css';

export default function EditStudent() {
  const { id } = useParams();
  console.log("EditStudent ID:", id); // Debugging line
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [photoPreview, setPhotoPreview] = useState(null);
  const queryClient = useQueryClient();

  // ✅ Fetch student data
const { data: studentData, isLoading, isError } = useQuery({
  queryKey: ['student', id],
  queryFn: async () => {
    try {
      console.log("Fetching student data for ID:", id);
      const res = await axios.get(`/students/${id}`);
      console.log("Fetched student data:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw new Error("Failed to fetch student data");
    }
  },
  enabled: !!id, // Optional: avoids running if id is undefined
});

  // ✅ Populate form when data loads
 useEffect(() => {
  if (studentData && Object.keys(studentData).length > 0) {
    Object.keys(studentData).forEach((key) => {
      if (studentData[key] !== undefined) {
        setValue(key, studentData[key]);
      }
    });

    if (studentData.photo) {
      setPhotoPreview(`http://localhost:3000/uploads/${studentData.photo}`);
    }
  }
}, [studentData, setValue]);


  // ✅ Mutation to update student
  const mutation = useMutation({
  mutationFn: async (data) => {
    return await axios.put(`/students/${id}`, data);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['students']); // Optional: if you have list view
    alert('Student updated');
    navigate('/students');
  },
  onError: () => {
    alert('Failed to update');
  },
});

  // ✅ Handle form submission
  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleCancel = () => {
    navigate('/students');
  };

  // if (isLoading) return <div>Loading student data...</div>;
  // if (isError) return <div>Error loading student data.</div>;

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
          <button type="submit" className="edit-button-save" disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="edit-button-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
