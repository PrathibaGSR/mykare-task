import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'next/router';

function Home() {

    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
     logout();
     router.push("/")
    }
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Logout
                </button>
                <section className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold">Welcome, </h2>
                    <p className="text-1xl font-bold">{user?.username}!</p>
                </section>
            </div>
        </>
    )
}

export default Home