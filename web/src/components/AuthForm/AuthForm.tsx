/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { Column } from '../Column';
import { FormWrapper } from '../FormWrapper';
import { Logo } from '../Logo';
import { IFormInputs } from '../../@types';

interface Props {
  mode: 'login' | 'signup';
  submitting: boolean;
  handleOnSubmit: (payload: IFormInputs) => void;
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

const AuthForm: React.FC<Props> = ({ mode, submitting, handleOnSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<IFormInputs>();
  return (
    <FormWrapper>
      <Column>
        <Logo />
        <Header>NextNote</Header>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
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
          {mode === 'signup' && (
            <Column padding={5}>
              <Input
                type='text'
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required'
                })}
              />
              {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
            </Column>
          )}
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
              disabled={submitting}
              backgroundColor='#06b534'
              width={212}
              label={submitting ? 'Submitting...' : 'Login'}
            />
          </Column>
          {mode === 'login' ? (
            <AltText>
              {`Don't have an account? Signup`}&nbsp;
              <span>
                <Link href='/signup'>here</Link>
              </span>
            </AltText>
          ) : (
            <AltText>
              Already have an account? Click&nbsp;
              <span>
                <Link href='/login'>here</Link>
              </span>{' '}
              to login
            </AltText>
          )}
        </form>
      </Column>
    </FormWrapper>
  );
};

export default AuthForm;
