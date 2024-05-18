'use client'
import axios from "axios";
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function Signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const data = {
                email: email,
                password: password
            };
            
            console.log(process.env.API_ENDPOINT);
            const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+'/customers', data, { withCredentials: true ,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { message, user } = response.data;
            if (message === 'Login successfull') {
                console.log('Login successful:', user);
                toast.success('Sign in successful');
                Cookies.set('data', JSON.stringify(user));
                router.push('/customer');
            } else if (message === 'Wrong Password') {
                console.error('Wrong password entered');
                setError(message);
            } else if (message === 'No Customer Found') {
                console.error('No customer found with the provided email');
                setError(message);
            } else {
                console.error('Unknown error occurred');
                setError('An unexpected error occurred');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An unexpected error occurred');
        }
    }

    return(
        <>
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit} >
            <h3>Login</h3>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="email" className="grow" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <input type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" value="Login"/>
                <Link href="/signup" >Sign Up</Link>
                {error && 
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{error}</span>
                </div>}
            </form>
        </div>
        </>
    );
}
