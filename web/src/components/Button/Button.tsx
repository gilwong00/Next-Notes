import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  backgroundColor?: string;
  fontColor?: string;
  width?: number;
  disabled?: boolean;
}

interface StyledButtonProps {
  backgroundColor?: string;
  fontColor?: string;
  width?: number;
}

const StyledButton = styled.button<StyledButtonProps>`
  border-radius: 5px;
  width: ${(props: StyledButtonProps) =>
    props.width ? `${props.width}px` : '100%'};
  color: ${(props: StyledButtonProps) =>
    props.fontColor ? props.fontColor : '#fff'};
  background-color: ${(props: StyledButtonProps) =>
    props.backgroundColor ? props.backgroundColor : 'inherit'};
  padding: 8px 20px;

  &:disabled {
    background-color: #ccc;
  }
`;

const Button: React.FC<Props> = ({
  label,
  backgroundColor,
  fontColor,
  width,
  disabled
}) => {
  return (
    <StyledButton
      backgroundColor={backgroundColor}
      fontColor={fontColor}
      width={width}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  );
};

export default Button;
