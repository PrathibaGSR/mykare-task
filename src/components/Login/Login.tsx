import React from 'react';
import Link from 'next/link';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';


type Inputs = {
    username: string,
    password: string
}

function Login() {

    const { register, handleSubmit, formState: { errors },reset } = useForm<Inputs>();
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = data => {
        const { username, password } = data;
        const user = JSON.parse(localStorage.getItem(username) || "{}");
        if(user.password !== password){
            enqueueSnackbar('Invalid credentials', { 
                variant: 'error',
                autoHideDuration: 1000 
             });
             reset();
            return;
        }
        login(user);
        enqueueSnackbar('Login successful!', { 
            variant: 'success',
            autoHideDuration: 1000 
         });
        router.push("/home")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('username', { required: 'Username is required' })}

                        />
                        {errors.username && <p className="text-red-500">{errors.username.message}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('password', { required: 'Password is required' })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Login
                        </button>
                        <p className="text-center mt-4">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-blue-600 hover:underline">
                                Register Here!
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;
