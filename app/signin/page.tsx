'use client'
import axios from "axios";
import { FormEvent, useState } from 'react'

export default function signin(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
     
        const data = {
            email: email,
            password: password
        };
        console.log(data);
        const response = await axios.post('http://127.0.0.1:3001/customers', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);

      }

    return(
        <div>
            <h1>Login</h1>
                <form onSubmit={onSubmit}>
                    <label>Email:</label><br />
                    <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                    <label>Password:</label><br />
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                    <input type="submit" value="Login"/>
                    <input type="submit" value="SignUp" /><br />
                </form>
        </div>
    );
}