import React from 'react';
import { useAuth } from '../Context/AuthContext';
import { useRouter } from 'next/router';

function AdminView() {

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/")
    }

    const getAllUsers = () => {
        const users = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const user = JSON.parse(localStorage.getItem(key) || '{}');
                // Exclude admin user
                if (user.username !== 'admin') {
                    users.push(user);
                }
            }
        }
        return users;
    };
    const users = getAllUsers();

    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Logout
                </button>
                <h1 className="text-2xl font-bold mb-6">User Registration Details</h1>
                <div className="w-full max-w-4xl">
                    <div className="overflow-x-auto md:overflow-visible">
                        <table className="min-w-full bg-white rounded-lg shadow-lg">
                            <thead>
                                <tr className="bg-blue-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">Username</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Password</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {users.map((user, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{user.username}</td>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{user.email}</td>
                                        <td className="py-3 px-6 text-left whitespace-nowrap">{user.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminView