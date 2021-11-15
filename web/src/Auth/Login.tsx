import { Component } from 'solid-js';
import { styled } from 'solid-styled-components';

interface LoginProps {
  // add props here
}

const LoginContainer = styled('div')`
  height: 100%;
  width: 100%;
  overflow-y: hidden;
`;

const Login: Component = (props: LoginProps) => {
  return (
    <LoginContainer>
      <h2>Login</h2>
    </LoginContainer>
  );
};

export default Login;
