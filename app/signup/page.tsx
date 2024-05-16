'use client'
import axios from 'axios';
import { FormEvent, useState } from 'react'

export default function signUp(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function onSubmit(event: FormEvent) {
        event.preventDefault();
     
        const data = {
            username: username,
            password: password,
            email: email
        };

        console.log(data);
        const response = await axios.post('http://127.0.0.1:3001/customers/signup', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
    }

    return(
        <fieldset>
            <legend>SignUp</legend>
            <form onSubmit={onSubmit}> 
                <label>UserName:</label><br />
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
                <label>Email:</label><br />
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <label>Password:</label><br />
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <input type="submit" value="SignUp" />
                <button type="button">Login</button><br />
            </form>
        </fieldset>
    );
}