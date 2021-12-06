import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../context';

const withAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line react/display-name
  return (props: any) => {
    const { user } = useContext(AppContext);
    const Router = useRouter();

    if (!user) return Router.push('/login');
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
