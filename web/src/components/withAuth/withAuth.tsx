import { client, WHO_AM_I } from '../../graphql';
import { NextPage } from 'next';

// this only runs server side
const withAuth = <T extends {}>(WrappedComponent: NextPage<T>) => {
  const WithConditionalRedirectWrapper = (props: any) => {
    return <WrappedComponent {...props} />;
  };

  WithConditionalRedirectWrapper.getInitialProps = async (ctx: any) => {
    let user = client.readQuery(WHO_AM_I);
    if (!user?.data)
      user = await client
        .query(
          WHO_AM_I,
          {},
          {
            // pass cookie in SSR call
            fetchOptions: {
              headers: {
                Cookie: `next_note_auth=${ctx?.req?.cookies?.next_note_auth}`
              }
            }
          }
        )
        .toPromise();

    if (!user?.data?.whoami?.id) {
      ctx?.res?.writeHead(302, { Location: '/login' });
      ctx?.res?.end();
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, user: user?.data?.whoami };
  };

  return WithConditionalRedirectWrapper;
};

export default withAuth;
