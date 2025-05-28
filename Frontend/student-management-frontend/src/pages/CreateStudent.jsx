// CreateStudent.jsx or CreateStudent.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './CreateStudent.css';


const CreateStudent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('dob', data.dob);
      formData.append('branch', data.branch);
      formData.append('semester', data.semester);
      formData.append('photo', data.photo[0]); // Single file upload

      const token = localStorage.getItem('token'); // Replace with your token source

      const response = await axios.post(
        'http://localhost:3000/students/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // If JWT protected
          },
        }
      );

      console.log('✅ Student created:', response.data);
      reset(); // Clear form
      alert('Student created successfully!');
    } catch (error) {
      console.error('❌ Error creating student:', error.response?.data || error);
      alert('Failed to create student.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <div>
        <label>Name:</label>
        <input type="text" {...register('name', { required: true })} />
        {errors.name && <p>Name is required.</p>}
      </div>

      <div>
        <label>Email:</label>
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <p>Email is required.</p>}
      </div>

      <div>
        <label>Date of Birth:</label>
        <input type="date" {...register('dob')} />
      </div>

     <div>
  <label>Branch:</label>
  <select {...register('branch', { required: true })}>
    <option value="">Select Branch</option>
    <option value="CSE">Computer Science</option>
    <option value="ECE">Electronics</option>
    <option value="ME">Mechanical</option>
    <option value="CE">Civil</option>
    <option value="EE">Electrical</option>
  </select>
  {errors.branch && <p>Branch is required.</p>}
</div>

<div>
  <label>Semester:</label>
  <select {...register('semester', { required: true })}>
    <option value="">Select Semester</option>
    <option value="1">1st</option>
    <option value="2">2nd</option>
    <option value="3">3rd</option>
    <option value="4">4th</option>
    <option value="5">5th</option>
    <option value="6">6th</option>
    <option value="7">7th</option>
    <option value="8">8th</option>
  </select>
  {errors.semester && <p>Semester is required.</p>}
</div>


      <div>
        <label>Photo:</label>
        <input type="file" {...register('photo')} accept="image/*" />
      </div>

      <button type="submit">Create Student</button>
    </form>
  );
};

export default CreateStudent;

