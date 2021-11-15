import { JSX, Show } from 'solid-js';
import { Outlet } from 'solid-app-router';
import { NotAuthorized } from '../Auth';
import { useClient } from 'solid-urql';
import { whoamiQuery } from '../graphql/queries/whoami';

const ProtectedRoute = (): JSX.Element => {
  const client = useClient();
  const result = client.readQuery(whoamiQuery);
  return (
    <Show when={!!result?.data?.id} fallback={<NotAuthorized />}>
      <Outlet />
    </Show>
  );
};

export default ProtectedRoute;
