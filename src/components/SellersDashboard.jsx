import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from '../utils/utils';
import { Navigate } from 'react-router-dom';

const ProductForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image_url: ''
    });
    const [isAdminValidated, setIsAdminValidated] = useState(false);

    useEffect(() => {
        // Check if admin token exists in localStorage
        const adminToken = localStorage.getItem("AdminToken");
        if (adminToken) {
            // Validate the admin token
            validateAdminToken(adminToken);
        }
    }, []);

    const validateAdminToken = async (token) => {
        try {
            const response = await axios.post(`${BaseUrl}/admin/validate-token`, { token });
            if (response.status === 200) {
                // Admin token is valid
                setIsAdminValidated(true);
            } else {
                // Admin token is not valid, log out or show error message
                console.error('Admin token validation failed');
                setIsAdminValidated(false);
                // Optionally, you can log out the user or clear the token from localStorage here
            }
        } catch (error) {
            console.error('Error validating admin token:', error);
            setIsAdminValidated(false);
            // Optionally, handle the error or log out the user
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BaseUrl}/admin/products`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("AdminToken")}`
                }
            });
            if (response.status === 201) {
                console.log('Product added successfully');
                // Reset form after successful submission
                setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    image_url: ''
                });
                alert("added product successfully")

            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    if (!isAdminValidated) {
        return (
            <div>
                <h2>Unauthorized Access</h2>
                <p>Please log in as an admin to access this page.</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto flex flex-col gap-4 mt-4">
            <h1 className='text-3xl font-semibold mb-4'>Welcome to seller dashboard</h1>
            <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Name of product:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block mb-1">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block mb-1">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="image_url" className="block mb-1">Image URL:</label>
                    <input
                        type="text"
                        id="image_url"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
