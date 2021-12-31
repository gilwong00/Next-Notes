import React from 'react';
import { useRouter } from 'next/router';
import { AuthForm } from '../components';
import { useMutation } from 'urql';
import { IFormInputs } from '../@types';
import { CREATE_USER_MUTATION } from '../graphql';
import { NextPage } from 'next/types';

const Signup: NextPage = () => {
  const router = useRouter();
  const [result, signup] = useMutation(CREATE_USER_MUTATION);

  const onSubmitHander = async (payload: IFormInputs) => {
    try {
      const { error, data } = await signup(payload);
      // TODO: throw up error state
      if (error) console.log(error);
      if (data?.createUser?.id) return router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };
  const { fetching } = result;
  return (
    <AuthForm
      mode='signup'
      submitting={fetching}
      handleOnSubmit={onSubmitHander}
    />
  );
};

export default Signup;
