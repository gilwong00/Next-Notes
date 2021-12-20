import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface Props {}

interface IFormInputs {
  username: string;
  password: string;
}

const Login = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInputs>();
  return <div>Login</div>;
};

export default Login;
