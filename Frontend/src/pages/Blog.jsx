// src/pages/Blog.jsx

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllPublicBlogs } from '../utils/api'; // Adjust the import path as needed
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML
import { API_IMAGE_BASE_URL } from '../config';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Blog = () => {
    const [blogs, setBlogs] = useState([]); // State to hold the blog list
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    // Helper function to construct full image URL
    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName; // Return if it's already a full URL

        return `${API_IMAGE_BASE_URL}/blog/${imageName}`; // Construct the full URL for the image
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAllPublicBlogs();
                console.log("Fetched Blogs:", data); // Log the fetched data
                setBlogs(data);
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to fetch blogs.');
            } finally {
                setLoading(false); // Ensure loading is false after fetching
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading blogs...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Error fetching blogs: {error}</div>;
    }

    return (
        <>
            <Header />
            <div className="blog-list py-20">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold mb-6">All Blogs</h2>
                    {blogs.length === 0 ? (
                        <div>No blogs available.</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="blog-box mx-3">
                                    <Link to={`/blog-inside/${blog.title}`}>
                                        <div className="overflow-hidden relative">
                                            <img 
                                                className="duration-1000 hover:scale-110 block w-full h-full object-cover" 
                                                src={getFullImageUrl(blog.image)} // Get image URL
                                                alt={blog.title} 
                                            />
                                        </div>
                                        <div className="py-4">
                                            <h3 className="text-lg font-semibold">{blog.title}</h3>
                                            <p className="text-gray-600">
                                                <strong>Published Date:</strong> {new Date(blog.publish_date).toLocaleDateString()}
                                            </p>
                                            <div 
                                                className="blog-content" 
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content.slice(0, 100) + '...') }} // Show a preview
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Blog;
