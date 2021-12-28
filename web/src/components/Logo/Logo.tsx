import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  border-radius: 10px;
`;

const Logo = () => {
  return (
    <div>
      <StyledImage
        src='https://www.freeiconspng.com/uploads/evernote-icon-2.png'
        height={80}
        width={80}
        alt='logo'
      />
    </div>
  );
};

export default Logo;
