import React, { useEffect, useState } from 'react';
import { listBlogs, createBlog, deleteBlog, updateBlog } from '../services/blogApi'; // Import the API functions
import QuillEditor from '../components/QuillEditor'; // Import the QuillEditor component
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const Blog = () => {
  const [blogs, setBlogs] = useState([]); // State to hold the list of blogs
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    publishedDate: '',
    blogImage: null,
    seoTitle: '',
    seoDescription: '',
    seoUrl: ''
  }); // State for new blog form
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
  const [isEditing, setIsEditing] = useState(false); // State to check if we are in editing mode
  const [editBlogId, setEditBlogId] = useState(null); // Store blog ID for editing

  // Fetch the list of blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await listBlogs();
        setBlogs(response); // Set the blogs state with the fetched data
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Handle input changes for other form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content change from QuillEditor
  const handleContentChange = (content) => {
    setNewBlog((prev) => ({ ...prev, content }));
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    setNewBlog((prev) => ({ ...prev, blogImage: e.target.files[0] })); // Store the file object
  };

  // Handle form submission to create or update a blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object to handle file uploads

    // Append blog data to FormData except for the image if it hasn't been changed
    for (const key in newBlog) {
      if (key !== 'blogImage') {
        formData.append(key, newBlog[key]);
      }
    }

    // Only append the image if it's present (i.e., the user has uploaded a new one)
    if (newBlog.blogImage) {
      formData.append('blogImage', newBlog.blogImage); // Append the image file
    }

    try {
      if (isEditing) {
        await updateBlog(editBlogId, formData); // Call update API if editing
        setBlogs((prev) =>
          prev.map((blog) =>
            blog.id === editBlogId ? { ...blog, ...newBlog } : blog
          )
        ); // Update the blog list
        setIsEditing(false); // Reset editing state
      } else {
        const createdBlog = await createBlog(formData); // Send FormData to the API
        setBlogs((prev) => [...prev, createdBlog]); // Add the new blog to the list
      }

      // Reset the form after submission
      setNewBlog({
        title: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        publishedDate: '',
        blogImage: null,
        seoTitle: '',
        seoDescription: '',
        seoUrl: ''
      });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (blog) => {
    setIsEditing(true);
    setEditBlogId(blog.id); // Set blog ID for editing
    setNewBlog({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      publishedDate: blog.publishedDate,
      blogImage: blog.blogImage,
      seoTitle: blog.seo?.title || '',
      seoDescription: blog.seo?.description || '',
      seoUrl: blog.seo?.url || ''
    });
    setShowForm(true); // Show the form in edit mode
  };

  // Handle delete button click
  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId); // Call the API to delete the blog
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId)); // Remove the deleted blog from the list
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <div>
      <h1>Blog Management</h1>
      <button onClick={() => setShowForm(true)}>Add New Blog</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={handleInputChange}
            required
          />
          <QuillEditor
            name="content"
            placeholder="Blog Content"
            value={newBlog.content}
            onChange={handleContentChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBlog.author}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBlog.category}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={newBlog.tags}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="publishedDate"
            value={newBlog.publishedDate}
            onChange={handleInputChange}
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="blogImage"
            onChange={handleFileChange}
            accept="image/*"
          />

          {/* SEO Fields */}
          <input
            type="text"
            name="seoTitle"
            placeholder="SEO Title"
            value={newBlog.seoTitle}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="seoDescription"
            placeholder="SEO Description"
            value={newBlog.seoDescription}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="seoUrl"
            placeholder="SEO URL"
            value={newBlog.seoUrl}
            onChange={handleInputChange}
          />

          <button type="submit">{isEditing ? 'Update' : 'Create'} Blog</button>
        </form>
      )}

      {/* Blog List */}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h2>{blog.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
            <p>Author: {blog.author}</p>
            <p>Category: {blog.category}</p>
            <p>Published Date: {new Date(blog.publishedDate).toLocaleDateString()}</p>
            <button onClick={() => handleEdit(blog)}>Edit</button>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
