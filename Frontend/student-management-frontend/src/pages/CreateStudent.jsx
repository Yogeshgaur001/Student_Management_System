import { useForm } from 'react-hook-form';
import axios from '../api/axios';

export default function CreateStudent() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post('/students/upload', formData);
      alert('Student created');
    } catch (err) {
      alert('Error creating student');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Name" {...register('name')} />
      <input placeholder="Email" type="email" {...register('email')} />
      <input placeholder="DOB" type="date" {...register('dob')} />
      <input placeholder="Branch" {...register('branch')} />
      <input placeholder="Semester" {...register('semester')} />
      <input type="file" {...register('photo')} />
      <button type="submit">Submit</button>
    </form>
  );
}
