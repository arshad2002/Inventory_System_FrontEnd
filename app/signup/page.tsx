'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

export default function signUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const router = useRouter();

    const validateUsername = () => {
        if (username.length < 3) {
            setUsernameError("Username must be at least 3 characters long");
            return false;
        }
        setUsernameError("");
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email");
            return false;
        }
        setEmailError("");
        return true;
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return false;
        }
        setPasswordError("");
        return true;
    };

    async function onSubmit(event: FormEvent) {
        event.preventDefault();

        if (!validateUsername() || !validateEmail() || !validatePassword()) {
            return;
        }
        const data = {
            username: username,
            password: password,
            email: email
        };

        console.log(data);
        const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT+'/customers/signup', data, {
            headers: {
                'Content-Type': 'application/json'
            }, withCredentials: true
        });
        const message = response.data;
        console.log(response.data);

        if (response.data.message === 'SignUp completed') {
            router.push('/signin');
          }else{
            toast.error('User Name or Email already in use')
          }

    }

    return(
        <>
        
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit}> 
                <h1>SignUp</h1>

                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                    <input type="text" className="grow" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </label>
                
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                    <input type="email" className="grow" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                    <input type="password" className="grow" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <input type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" value="SignUp"/>
                <Link href="/signin">Sign In</Link>
                <div>
                {usernameError && <p className="error" style={{color: 'red'}}>{usernameError}</p>}
                {emailError && <p className="error" style={{color: 'red'}}>{emailError}</p>}
                {passwordError && <p className="error" style={{color: 'red'}}>{passwordError}</p>}
                </div>
            </form>
        </div>
        </>
    );
}