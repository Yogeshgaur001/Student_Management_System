import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../api/axios';

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
  }, [id]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`/students/${id}`, data);
      alert('Student updated');
      navigate('/students');
    } catch {
      alert('Failed to update');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Name" {...register('name')} />
      <input placeholder="Email" type="email" {...register('email')} />
      <input placeholder="DOB" type="date" {...register('dob')} />
      <input placeholder="Branch" {...register('branch')} />
      <input placeholder="Semester" {...register('semester')} />
      {photoPreview && <img src={photoPreview} width="80" />}
      <button type="submit">Update</button>
    </form>
  );
}
