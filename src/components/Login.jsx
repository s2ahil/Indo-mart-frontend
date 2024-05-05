import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from "../utils/utils.js";
import { Link } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BaseUrl}/users/login`, { email, password });
            console.log(response)
            localStorage.setItem('token', response.data.token);
            // Redirect to another page upon successful login
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div className="container mx-auto mt-5 p-5  flex-col items-center justify-center max-w-lg gap-4">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <div className="text-red-500">{error}</div>}
            <form onSubmit={handleLogin} className="space-y-4 max-w-sm">
               
                <div>
                    <label className="block" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            </form>
            <div className='mt-4'>
            <Link to="/customer/signup" className="text-blue-500">Dont have account click here ?</Link>
            </div>
        </div>
    );
}

export default Login;
