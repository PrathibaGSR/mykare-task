import dynamic from 'next/dynamic';
const Login = dynamic(() => import('@/components/Login/Login'));
function Home() {
  return (
    <div>
        <Login/>
    </div>
  );
}

export default Home;
