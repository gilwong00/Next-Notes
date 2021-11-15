import type { JSX } from 'solid-js';
import { styled } from 'solid-styled-components';

interface LayoutProps {
  // add props here
  children: JSX.Element;
}

const StyledLayout = styled('div')`
  width: 100%;
  height: 100vh;
`;

const Layout = ({ children }: LayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
