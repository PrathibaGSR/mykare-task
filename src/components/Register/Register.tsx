import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

type Inputs = {
    username: string,
    email: string,
    password: string
}

function Register() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const { login } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const router = useRouter();

    //duplicate users
    const userExists = (username: string, email: string) => {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key) {
                const storedUser = JSON.parse(localStorage.getItem(key) || '{}');
                if (storedUser.username === username || storedUser.email === email) {
                    return true;
                }
            }
        }
        return false;
    };

    const onSubmit: SubmitHandler<Inputs> = data => {
        const { username, email, password } = data;

        //usercheck
        if (userExists(username, email)) {
            enqueueSnackbar('User already exists', {
                variant: 'error',
                autoHideDuration: 1000
            });
            reset();
            return;

        }

        //add user data
        const user = { username, email, password }
        localStorage.setItem(username, JSON.stringify(user));
        login(user)
        enqueueSnackbar('Registration successful!', {
            variant: 'success',
            autoHideDuration: 1000
        });

        //    console.log(data);

        reset();
        router.push("/")

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
                            type="text"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Register
                        </button>
                        <p className="text-center mt-4">
                            Already have an account?{' '}
                            <Link href="/" className="text-blue-500 hover:underline">
                                Login Here!
                            </Link>
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register;
