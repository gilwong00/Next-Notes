import React from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { LOGIN_USER_MUTATION } from '../graphql/mutations';
import { AuthForm } from '../components';
interface IFormInputs {
  username: string;
  password: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const [result, login] = useMutation(LOGIN_USER_MUTATION);

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
    <AuthForm
      mode='login'
      submitting={fetching}
      handleOnSubmit={onSubmitHander}
    />
  );
};

export default Login;
