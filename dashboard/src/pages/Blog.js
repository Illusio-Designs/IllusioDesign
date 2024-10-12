// src/components/BlogPage.jsx

import React, { useEffect, useState } from 'react';
import blogApi from '../utils/blogApi'; // Import the default export
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { useDropzone } from 'react-dropzone'; // Import Dropzone
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import './blog.css'; // Import the CSS file

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '', // Quill content will be stored as text or HTML
        publishedDate: '',
        image: '',
        metaDescription: '',
        seoTitle: '',
        url: '',
    });
    const [creating, setCreating] = useState(false);

    // Fetch all published blogs on component mount
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await blogApi.getAllBlogs();
                setBlogs(data);
            } catch (err) {
                // Set error message as a string
                setError(err.message || 'An error occurred while fetching blogs.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Handle input changes for creating a new blog
    const handleNewBlogChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle content changes for Quill editor
    const handleContentChange = (content) => {
        setNewBlog((prev) => ({ ...prev, content }));
    };

    // Handle image upload
    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);

        blogApi
            .post('/blogs/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                const imageUrl = response.data.url;
                setNewBlog((prev) => ({ ...prev, image: imageUrl }));
            })
            .catch(() => {
                setError('Failed to upload image.');
            });
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

    // Handle creating a new blog
    const handleCreateBlog = async (e) => {
        e.preventDefault();
        setCreating(true);
        setError(null); // Reset error before creating
        try {
            const createdBlog = await blogApi.createBlog(newBlog);
            setBlogs((prevBlogs) => [...prevBlogs, createdBlog.blog]); // Adjust based on API response
            setNewBlog({
                title: '',
                content: '',
                publishedDate: '',
                image: '',
                metaDescription: '',
                seoTitle: '',
                url: '',
            });
        } catch (err) {
            // Set error message as a string
            setError(err.message || 'Failed to create the blog.');
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <p>Loading blogs...</p>;
    if (error) return <p>Error: {error}</p>; // Render the error message as a string

    return (
        <div className="blog-page">
            <h1>Blog Posts</h1>

            {/* Create New Blog Form */}
            <section className="form-section">
                <h2>Create New Blog</h2>
                <form onSubmit={handleCreateBlog} className="form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newBlog.title}
                        onChange={handleNewBlogChange}
                        required
                        className="form-input"
                    />
                    <div className="editor-container">
                        <ReactQuill
                            value={newBlog.content}
                            onChange={handleContentChange}
                            modules={BlogPage.modules}
                            formats={BlogPage.formats}
                        />
                    </div>

                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag & drop the main image here, or click to select one</p>
                    </div>

                    <input
                        type="text"
                        name="metaDescription"
                        placeholder="Meta Description"
                        value={newBlog.metaDescription}
                        onChange={handleNewBlogChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="seoTitle"
                        placeholder="SEO Title"
                        value={newBlog.seoTitle}
                        onChange={handleNewBlogChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="url"
                        placeholder="SEO URL"
                        value={newBlog.url}
                        onChange={handleNewBlogChange}
                        required
                        className="form-input"
                    />

                    <button type="submit" disabled={creating} className="button">
                        {creating ? 'Creating...' : 'Create Blog'}
                    </button>
                </form>
            </section>

            {/* Blog List */}
            <section className="blog-list">
                <h2>All Blogs</h2>
                <ul>
                    {blogs.map((blog) => (
                        <li key={blog.id} className="blog-item">
                            <Link to={`/blog/${blog.id}`} className="blog-link">
                                <h3>{blog.title}</h3>
                                <p>{blog.content.substring(0, 100)}...</p>
                                <p>Published on: {new Date(blog.publishedDate).toLocaleDateString()}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

// Quill modules and formats
BlogPage.modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['link', 'image'],
        ['clean'] // remove formatting button
    ],
};

BlogPage.formats = [
    'header', 'bold', 'italic', 'underline', 'link', 'image'
];

export default BlogPage;
