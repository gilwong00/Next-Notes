import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  padding: 20px;
  box-shadow: #ccc 0px 4px 5px -2px;
  width: 500px;
  margin: 100px auto auto auto;
`;

const FormWrapper: React.FC<Props> = ({ children }) => {
  return <FormContainer>{children}</FormContainer>;
};

export default FormWrapper;
