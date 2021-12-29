/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { useForm } from 'react-hook-form';
import { FormWrapper, Logo, Column, Button } from '../components';
import { LOGIN_USER_MUTATION } from '../graphql/mutations';
import styled from 'styled-components';
import Link from 'next/link';

interface IFormInputs {
  username: string;
  password: string;
}

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px 20px;
  outline: none;
  transition: 0.5s;
  &:focus {
    border-color: blue;
  }
`;

const ErrorText = styled.p`
  padding: 5px 0;
  color: red;
`;

const AltText = styled.p`
  padding-top: 5px;
  font-size: 12px;
`;

const Header = styled.h2`
  padding-bottom: 15px;
`;

const Login = () => {
  const router = useRouter();
  const [result, login] = useMutation(LOGIN_USER_MUTATION);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInputs>();

  const onSubmitHander = async (payload: IFormInputs) => {
    try {
      const { error, data } = await login(payload);
      // TODO: throw up error state
      // if (error) console.log(error);
      if (data?.login?.id) return router.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  const { fetching } = result;
  return (
    <FormWrapper>
      <Column>
        <Logo />
        <Header>NextNote</Header>
        <form onSubmit={handleSubmit(onSubmitHander)}>
          <Column padding={5}>
            <Input
              placeholder='Username'
              type='text'
              {...register('username', {
                required: 'Username is required'
              })}
            />
            {errors.username && (
              <ErrorText>{errors.username.message}</ErrorText>
            )}
          </Column>
          <Column padding={5}>
            <Input
              type='password'
              placeholder='Password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 5,
                  message: 'Password should be at least 5 characters'
                }
              })}
            />
            {errors.password && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </Column>
          <Column marginTop={5}>
            <Button
              disabled={fetching}
              backgroundColor='#00a82d'
              width={212}
              label={fetching ? 'Submitting...' : 'Login'}
            />
          </Column>
          <AltText>
            Don't have an account? Signup&nbsp;
            <span>
              <Link href='/signup'>here</Link>
            </span>
          </AltText>
        </form>
      </Column>
    </FormWrapper>
  );
};

export default Login;
