// AddToCartPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { BaseUrl } from '../utils/utils';

const AddToCartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(true); // Initially assume user is authenticated

    useEffect(() => {
        const fetchCartItems = async () => {
            setIsLoading(true);
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await axios.get(`${BaseUrl}/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in request headers
                    }
                });
                setCartItems(response.data);
               
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
            setIsLoading(false);
        };

        fetchCartItems();
    }, []);

    // Check authentication status on component mount
    useEffect(() => {
        // Assuming you have a mechanism to check if the user is authenticated (e.g., presence of JWT token)
        const isAuthenticated = checkAuthentication(); // Implement this function as per your authentication mechanism
        setIsAuthenticated(isAuthenticated);
    }, []);

    // Function to check if the user is authenticated (Example implementation)
    const checkAuthentication = () => {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        return !!token; // Return true if token is present, false otherwise
    };

    // Calculate total cost of items in cart
    const totalCost = cartItems.reduce((total, item) => {
        return total + (item.product_id.price * item.quantity);
    }, 0);

    if (!isAuthenticated) {
        // Redirect to login page if user is not authenticated
        return <Navigate to="/Customer/Login" />;
    }

    return (
        <div className='p-5'>
            <h1 className='text-2xl font-bold mb-4'>User's Cart Items</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex flex-col'>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {cartItems.map((item) => (
                            <li key={item._id} className='rounded-xl bg-blue-100 p-4 flex items-center'>
                            <img src={item.product_id.image_url} alt={item.product_id.name} className='w-12 h-12 mr-4 rounded-full' />
                                <div>
                                    <p className='text-lg font-semibold'>{item.product_id.name}</p>
                                    <p className='text-gray-700'>Price: ₹ {item.product_id.price}</p>
                                    <p className='text-gray-700'>Quantity: {item.quantity}</p>
                                </div>

                            </li>
                        ))}
                    </ul>
                    <p className='text-lg mt-4 rounded-xl bg-green-400 max-w-sm p-5 cursor-pointer'>Total Cost: ₹ {totalCost.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default AddToCartPage;
