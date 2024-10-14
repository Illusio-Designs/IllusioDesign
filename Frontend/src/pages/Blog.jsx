// src/pages/Blog.jsx

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllBlogs } from '../utils/blogApi'; // Adjust the import path as needed

const Blog = () => {
    const [blogs, setBlogs] = useState([]); // State to hold the blog list
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogData = await getAllBlogs();
                console.log("Blogs Data:", blogData); // Log the data to debug
                
                // Check if the response is an array or has a specific key
                if (Array.isArray(blogData)) {
                    setBlogs(blogData);
                } else if (blogData.blogs && Array.isArray(blogData.blogs)) {
                    setBlogs(blogData.blogs);
                } else {
                    console.warn("Unexpected blog data format:", blogData);
                    setBlogs([]);
                }
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <>
                <div>Loading blogs...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div>Error fetching blogs: {error}</div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="blog-list">
                <h2>All Blogs</h2>
                {blogs.length === 0 ? (
                    <div>No blogs available.</div>
                ) : (
                    <ul>
                        {blogs.map((blog) => (
                            <li key={blog.id} className="blog-item">
                                <h3>{blog.title}</h3>
                                <p><strong>Author:</strong> {blog.author}</p>
                                <p><strong>Date:</strong> {blog.date}</p>
                                <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Blog;
