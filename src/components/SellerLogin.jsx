import React, { useState } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/utils';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
const SellerLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BaseUrl}/admin/login`, formData);
            setMessage(response.data.message);
            localStorage.setItem('AdminToken', response.data.token);
            // Redirect or perform any other action after successful login
            navigate("/seller/dashboard");

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className='p-5 bg-gray-100 rounded-lg flex flex-col  items-center gap-4'>
        <div className='max-w-[40rem]'>
            <h1 className='text-2xl font-bold mb-4'>Seller Login</h1>
            {message && <p className='text-red-500 mb-4'>{message}</p>}
            <form onSubmit={handleSubmit} className=''>
                <div className='mb-4'>
                    <label htmlFor='username' className='block text-gray-700'>Username</label>
                    <input type='text' id='username' name='username' value={formData.username} onChange={handleChange} required className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full' />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-gray-700'>Password</label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} required className='border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full' />
                </div>
                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full'>Login</button>
            </form>
            </div>
            <Link to="/seller/signup " className="text-blue-500">Dont have account?</Link>
        </div>
    );
};

export default SellerLogin;
