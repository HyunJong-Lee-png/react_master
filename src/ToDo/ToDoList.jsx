import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ToDoList() {
  const { register, formState: { errors }, handleSubmit, setError, setValue,reset } = useForm({
    defaultValues: {
      email: '@naver.com'
    }
  });
  const onValid = (data) => {
    const { password, password1 } = data;
    if (password !== password1) {
      setError('password1', {
        message: 'Password must be same',
      }, {
        shouldFocus: true,
      });
      setValue('password1', '');
      return;
    };
    reset();
    setError('extraError',{message:'Server Down'})
  }
  return (
    <form onSubmit={handleSubmit(onValid)} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <input {...register('firstName', {
        required: {
          value: true,
          message: 'Name is required'
        }
      })} placeholder="firstName" />
      {errors.firstName?.message}
      <input {...register('lastName', {
        required: 'Name is required!!'
      })} placeholder="lastName" />
      {errors.lastName?.message}
      <input {...register('email', {
        required: 'Eamil is required!',
        pattern: {
          value: /^[a-zA-Z0-9_%+-+]+@naver.com$/,
          message: 'Pattern must end with @naver.com '
        },
        validate: {
          nico: (v) => v.includes('nico') ? 'No nico' : true
          
        }
      })} placeholder="email" />
      {errors.email?.message}
      <input {...register('password', {
        required: 'Password is required!',
        minLength: {
          value: 5,
          message: 'Password is too short'
        }
      })} placeholder="password" />
      {errors.password?.message}
      <input {...register('password1', {
        required: 'Password is required!',
      })} placeholder="confirmPassword" />
      {errors.password1?.message}
      {errors.extraError?.message}
      <button>submit</button>
    </form>
  );
}