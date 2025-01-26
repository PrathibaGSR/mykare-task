import AdminView from "@/components/AdminView/AdminView";
import { useAuth } from "@/components/Context/AuthContext";
import dynamic from 'next/dynamic';
const Home = dynamic(() => import('@/components/Home/Home'));

function HomePage() {
  const {user} = useAuth();
  const isAdmin = user && user.username ==  "admin";
  return (
    <div>
      { isAdmin? <AdminView /> : <Home/>}
    </div>
  );
}

export default HomePage;
