import dynamic from 'next/dynamic';
const Register = dynamic(() => import('@/components/Register/Register'));
function RegisterPage() {
  return (
    <div>
        <Register/>
    </div>
  );
}

export default RegisterPage;
