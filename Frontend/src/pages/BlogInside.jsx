import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getBlogByTitle } from '../utils/api';

const BlogInside = () => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const data = await getBlogByTitle('example-title'); // Replace 'example-title' with the actual title
                setBlog(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{blog.title}</h1>
                <p>{blog.content}</p>
            </div>
        </>
    );
};

export default BlogInside;