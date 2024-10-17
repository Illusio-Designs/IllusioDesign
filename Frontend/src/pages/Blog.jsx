// src/pages/Blog.jsx

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllBlogs } from '../utils/api'; // Adjust the import path as needed

const Blog = () => {
    const [blogs, setBlogs] = useState([]); // State to hold the blog list
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getAllBlogs();
                console.log("Fetched Blogs:", data); // Log the fetched data
                setBlogs(data);
                console.log("Blogs State:", blogs); // Log the state after setting it
            } catch (err) {
                console.error('Error fetching blogs:', err);
                setError('Failed to fetch blogs.');
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
                    <table className="projects-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Published Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td>{blog.title}</td>
                                    <td>{new Date(blog.publishedDate).toLocaleDateString()}</td>
                                    <td>
                                        <button onClick={() => handleEdit(blog)} className="edit-button">Edit</button>
                                        <button onClick={() => handleDelete(blog.id)} className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Blog;
