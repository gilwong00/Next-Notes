import { onMount } from 'solid-js';
import { useNavigate } from 'solid-app-router';

const NotAuthorized = () => {
  const navigate = useNavigate();
  onMount(() => navigate('/login'));

  return <></>;
};

export default NotAuthorized;
