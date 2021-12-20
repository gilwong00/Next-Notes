import { client, WHO_AM_I } from '../../graphql';
import { NextComponentType } from 'next';

// this only runs server side
const withAuth = (WrappedComponent: NextComponentType) => {
  const WithConditionalRedirectWrapper = (props: Record<string, unknown>) => {
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.getInitialProps = async (ctx: any) => {
    let user = client.readQuery(WHO_AM_I);
    if (!user?.data) user = await client.query(WHO_AM_I).toPromise();
    if (!user?.data?.whoami?.id) {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, user };
  };

  return WithConditionalRedirectWrapper;
};

export default withAuth;
