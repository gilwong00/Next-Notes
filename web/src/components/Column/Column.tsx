import React from 'react';
import styled from 'styled-components';

interface Props {
  padding?: number;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginRight?: number | string;
  marginLeft?: number | string;
  children: React.ReactNode;
}

interface ColumnContainerProps {
  padding?: number;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginRight?: number | string;
  marginLeft?: number | string;
}

const ColumnContainer = styled.div<ColumnContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props: ColumnContainerProps) =>
    props.padding ? `${props.padding}px` : 0};
  margin-top: ${({ marginTop }: ColumnContainerProps) =>
    marginTop
      ? `${Number.isInteger(marginTop) ? `${marginTop}px` : marginTop}`
      : 0};
  margin-bottom: ${({ marginBottom }: ColumnContainerProps) =>
    marginBottom
      ? `${Number.isInteger(marginBottom) ? `${marginBottom}px` : marginBottom}`
      : 0};
  margin-right: ${({ marginRight }: ColumnContainerProps) =>
    marginRight
      ? `${Number.isInteger(marginRight) ? `${marginRight}px` : marginRight}`
      : 0};
  margin-left: ${({ marginLeft }: ColumnContainerProps) =>
    marginLeft
      ? `${Number.isInteger(marginLeft) ? `${marginLeft}px` : marginLeft}`
      : 0};
`;

const Column: React.FC<Props> = ({
  children,
  padding,
  marginTop,
  marginBottom,
  marginRight,
  marginLeft
}) => {
  return (
    <ColumnContainer
      padding={padding}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginRight={marginRight}
      marginLeft={marginLeft}
    >
      {children}
    </ColumnContainer>
  );
};

export default Column;
