import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BaseUrl } from '../utils/utils';

const ProductDetail = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [quantity, setQuantity] = useState();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const token = localStorage.getItem('token');
        setUserToken(token);

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddReview = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${BaseUrl}/products/${id}/reviews`,
                { rating, comment },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
            console.log('Review added:', response.data);
            // Refresh product data to display the new review
            const updatedProduct = await axios.get(`${BaseUrl}/products/${id}`);
            setProduct(updatedProduct.data);
            // Reset form fields
            setRating(0);
            setComment('');
        } catch (error) {
            console.error('Error adding review:', error);
        }
        setIsLoading(false);
    };

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await axios.post(
                `${BaseUrl}/cart`,
                { product_id: id, quantity: quantity },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
            console.log('Product added to cart');
            alert('successfully added, see you cart ')
            // You can add additional logic here, such as showing a success message
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('You need to login ')
            // You can handle errors here, such as displaying an error message to the user
        }
        setIsLoading(false);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-5'>
            <div className="mx-auto">
                <div className="bg-white shadow-md p-8 rounded-lg">
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-6 md:mb-0">
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div className="w-full md:w-1/2 md:pl-6 flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="flex items-center">
                                <span className="text-gray-900 font-semibold">Price:</span>
                                <span className="text-gray-800">₹ {product.price}</span>
                            </div>

                          
                             <input type="number"
                              id="number-input" 
                                value={quantity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                  
                                        setQuantity(value);
    
                                }}
                             aria-describedby="helper-text-explanation"
                              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[10rem] p-2.5 " placeholder="max 8" required />
                            <div
                                className='flex items-center justify-center gap-2 text-2xl bg-[#FF9F00] hover:bg-green-300 cursor-pointer rounded-xl w-[15rem] p-4'
                                onClick={handleAddToCart}
                                disabled={isLoading}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0" />
                                </svg>
                                Add to Cart
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4 ">Reviews</h3>
                        <div className="mb-4">
                            {userToken ? (
                                <form onSubmit={handleAddReview} className='bg-gray-100 p-5'>
                                    <div>Add your review</div>
                                    <br></br>
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="rating" className="mr-2">Rating:</label>
                                        <select id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} className="border p-2">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="comment">Comment:</label>
                                        <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} className="border p-2 w-full"></textarea>
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isLoading}>
                                        {isLoading ? 'Adding Review...' : 'Add Review'}
                                    </button>
                                </form>
                            ) : (
                                <p>Login first to post a review.</p>
                            )}
                        </div>
                        {/* Render existing reviews */}
                        {product.reviews.map((review, index) => (
                            <div key={index} className="border p-4 mb-4 rounded bg-gray-200">
                                <p className="mb-2 flex items-center gap-1 " > Rating: {review.rating} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                                </svg></p>
                                <p className="mb-2">Comment: {review.comment}</p>
                                <p className="text-gray-500">Date: {new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
