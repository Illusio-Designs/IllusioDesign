import React, { useState, useEffect } from 'react';
import { createBlog, updateBlog, getBlogById } from '../services/blogApi';
import QuillEditor from './QuillEditor';

const EditBlog = ({ blog, onClose, onBlogUpdated }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    category: '',
    publish_date: new Date().toISOString().split('T')[0],
    content: '',
    tags: '',
    author: '',
    seo: {
      title: '',
      description: '',
      url: ''
    }
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (blog) {
      setBlogData({
        ...blog,
        publish_date: new Date(blog.publish_date).toISOString().split('T')[0]
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setBlogData(prev => ({
        ...prev,
        seo: { ...prev.seo, [seoField]: value }
      }));
    } else {
      setBlogData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleQuillChange = (content) => {
    setBlogData(prev => ({
      ...prev,
      content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
  
    try {
      const formData = new FormData();
      
      // Append basic fields
      Object.entries(blogData).forEach(([key, value]) => {
        if (key === 'seo') {
          // Serialize the SEO object
          Object.entries(value).forEach(([seoKey, seoValue]) => {
            formData.append(`seo[${seoKey}]`, seoValue);
          });
        } else {
          formData.append(key, value);
        }
      });
  
      // Append image if exists
      if (image) {
        formData.append('image', image);
      }
  
      if (blog) {
        // If editing, call updateBlog
        await updateBlog(blog.id, formData);
        setSuccessMessage('Blog updated successfully!');
        onBlogUpdated({ ...blogData, id: blog.id });
      } else {
        // If adding, call createBlog
        const newBlog = await createBlog(formData);
        setSuccessMessage('Blog created successfully!');
        onBlogUpdated(newBlog);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error saving blog');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
        <h2 className="text-xl font-bold">{blog ? 'Edit Blog' : 'Add Blog'}</h2>
        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="date"
            name="publish_date"
            value={blogData.publish_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <QuillEditor
            value={blogData.content}
            onChange={handleQuillChange}
            className="h-64"
          />

          <input
            type="text"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            placeholder="Author"
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            accept="image/*"
          />

          <div className="space-y-4">
            <h3 className="font-semibold">SEO Information</h3>
            <input
              type="text"
              name="seo.title"
              value={blogData.seo.title}
              onChange={handleChange}
              placeholder="SEO Title"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="seo.description"
              value={blogData.seo.description}
              onChange={handleChange}
              placeholder="SEO Description"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="seo.url"
              value={blogData.seo.url}
              onChange={handleChange}
              placeholder="SEO URL"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
