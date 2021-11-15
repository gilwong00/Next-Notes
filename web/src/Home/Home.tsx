import { useNavigate } from 'solid-app-router';

interface HomeProps {
  // add props here
}

function Home(props: HomeProps) {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Home</h2>
      <button onClick={() => navigate('/login')}>Click</button>
    </div>
  );
}

export default Home;
