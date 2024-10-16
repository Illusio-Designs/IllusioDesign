import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllBlogs, createBlog, updateBlogById, deleteBlogById } from '../utils/blogApi';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Blog.css';

Modal.setAppElement('#root');

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
        publishedDate: '',
        image: null,
        metaDescription: '',
        seoTitle: '',
        url: '',
    });
    const [editBlogId, setEditBlogId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const data = await getAllBlogs();
            setBlogs(data);
        } catch (err) {
            setError('Failed to fetch blogs.');
        }
    };

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => {
        setModalIsOpen(false);
        setEditBlogId(null);
        setNewBlog({
            title: '',
            content: '',
            publishedDate: '',
            image: null,
            metaDescription: '',
            seoTitle: '',
            url: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (content) => {
        setNewBlog((prev) => ({ ...prev, content }));
    };

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        setNewBlog((prev) => ({ ...prev, image: file }));
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        // Add default value for publishedDate if empty
        if (!newBlog.publishedDate) {
            newBlog.publishedDate = new Date().toISOString(); // Set to current date if empty
        }

        try {
            let blog;
            if (editBlogId) {
                blog = await updateBlogById(editBlogId, newBlog); // Directly use newBlog
                setBlogs((prev) => prev.map((b) => (b.id === editBlogId ? blog : b)));
                setSuccess('Blog updated successfully!');
            } else {
                blog = await createBlog(newBlog); // Directly use newBlog
                setBlogs((prev) => [...prev, blog]);
                setSuccess('Blog created successfully!');
            }
            closeModal();
        } catch (err) {
            console.error('Error during blog submission:', err);
            setError(err.message || 'Failed to save blog.');
        }
    };

    const handleEdit = (blog) => {
        setEditBlogId(blog.id);
        setNewBlog({
            title: blog.title,
            content: blog.content,
            publishedDate: blog.publishedDate ? blog.publishedDate.slice(0, 16) : '', // Format date for input
            image: blog.image,
            metaDescription: blog.metaDescription,
            seoTitle: blog.seoTitle,
            url: blog.url,
        });
        openModal();
    };

    const handleDelete = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlogById(blogId);
                setBlogs((prev) => prev.filter((b) => b.id !== blogId));
                setSuccess('Blog deleted successfully!');
            } catch (err) {
                console.error('Error deleting blog:', err);
                setError('Failed to delete blog.');
            }
        }
    };

    return (
        <div className="blog-page">
            <h2>Blog Management</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <button onClick={openModal} className="create-button">
                Create New Blog
            </button>

            <h3>Existing Blogs</h3>
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
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="edit-button"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Blog Modal"
                className="project-modal"
                overlayClassName="project-modal-overlay"
            >
                <h2>{editBlogId ? 'Edit Blog' : 'Create New Blog'}</h2>
                <form onSubmit={handleSubmit} className="project-form">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newBlog.title}
                        onChange={handleChange}
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
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="seoTitle"
                        placeholder="SEO Title"
                        value={newBlog.seoTitle}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="url"
                        placeholder="SEO URL"
                        value={newBlog.url}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />

                    <div className="form-buttons">
                        <button type="submit" className="submit-button">
                            {editBlogId ? 'Update Blog' : 'Create Blog'}
                        </button>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
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
