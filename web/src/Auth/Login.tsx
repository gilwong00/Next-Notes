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

const LoginForm = styled('div')`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 50px;
  user-select: none;
  gap: 20px;
`;

const Login: Component = (props: LoginProps) => {
  return (
    <LoginContainer>
      <LoginForm>
        <h2>Solid Note</h2>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
