import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppContext } from '../../context';

const withAuth = (WrappedComponent: React.FC) => {
  // eslint-disable-next-line react/display-name
  return (props: Record<string, unknown>) => {
    const { user } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) router.replace('/login');
    }, [user, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
