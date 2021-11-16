import { JSX, Show } from 'solid-js';
import { Outlet } from 'solid-app-router';
import { NotAuthorized } from '../Auth';
import { user } from '../stores';

const ProtectedRoute = (): JSX.Element => {
  return (
    <Show when={!!user?.id} fallback={<NotAuthorized />}>
      <Outlet />
    </Show>
  );
};

export default ProtectedRoute;
