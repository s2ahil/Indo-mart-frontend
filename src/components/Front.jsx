import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from "../utils/utils.js";
import { Link } from 'react-router-dom';
const Front = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='p-5'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {products.map(product => (
                    <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-lg shadow-md p-4 hover:bg-green-200">
                        <img src={product.image_url} alt={product.name} className="w-full h-40 object-cover mb-4 " />
                        <div className="text-gray-800 font-semibold mb-2">{product.name}</div>
                        <div className="text-gray-600">₹ {product.price}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Front;
