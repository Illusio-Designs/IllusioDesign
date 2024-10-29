import React, { useState, useEffect } from 'react';
import { createBlog, updateBlog } from '../services/blogApi';
import QuillEditor from './QuillEditor';

const EditBlog = ({ blog, onClose, onBlogUpdated }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    category: '',
    keywords: '',
    publish_date: new Date().toISOString().split('T')[0],
    content: '',
    tags: '',
    author: '',
    meta_description: '',
    slug: '',
    canonical_url: '',
    image_alt_text: '', // Added image_alt_text here
    focus_keyword: '',
    excerpt: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const requiredFields = ['title', 'category', 'publish_date', 'content', 'author', 'slug'];

  useEffect(() => {
    if (blog) {
      const formattedDate = blog.publish_date
        ? new Date(blog.publish_date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];

      setBlogData({
        title: blog.title || '',
        category: blog.category || '',
        keywords: blog.keywords || '',
        publish_date: formattedDate,
        content: blog.content || '',
        tags: blog.tags || '',
        author: blog.author || '',
        meta_description: blog.meta_description || '',
        slug: blog.slug || (blog.title ? blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''),
        canonical_url: blog.canonical_url || '',
        image_alt_text: blog.image_alt_text || '', // Populate image_alt_text from blog
        focus_keyword: blog.focus_keyword || '',
        excerpt: blog.excerpt || '',
      });

      if (blog.image) {
        setImagePreview(blog.image);
      }
    }
  }, [blog]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setMessage({ text: 'Please select a valid image file', type: 'error' });
    }
  };

  const handleQuillChange = (content) => {
    setBlogData((prev) => ({ ...prev, content }));
  };

  const validateBlogData = (data) => {
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      setMessage({ 
        text: `Missing required fields: ${missingFields.join(', ')}`, 
        type: 'error' 
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });
 
    if (!validateBlogData(blogData)) {
       setLoading(false);
       return;
    }
 
    console.log('blogData:', blogData); // Check if fields are correct
    console.log('image:', image); // Check if image is set correctly
 
    try {
       const formData = new FormData();
       Object.entries(blogData).forEach(([key, value]) => {
          formData.append(key, value || '');
       });
       if (image) formData.append('blogimage', image);
 
       console.log('formData before sending:', formData); // Check FormData contents
 
       const response = blog
          ? await updateBlog(blog.id, formData)
          : await createBlog(formData);
 
       console.log('Response from server:', response); // Check server response
       
       setMessage({ text: blog ? 'Blog updated successfully!' : 'Blog created successfully!', type: 'success' });
       if (onBlogUpdated) onBlogUpdated(response.blog || response);
       setTimeout(() => { onClose(); }, 1500);
    } catch (error) {
       console.log('Error:', error); // Log error details
       setMessage({ text: error.response?.data?.message || 'Error saving blog', type: 'error' });
    } finally {
       setLoading(false);
    }
 };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {blog ? 'Edit Blog' : 'Add Blog'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {message.text && (
          <div className={`p-4 mb-4 rounded ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title*
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category*
              </label>
              <input
                type="text"
                name="category"
                value={blogData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Publish Date*
              </label>
              <input
                type="date"
                name="publish_date"
                value={blogData.publish_date}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Author*
              </label>
              <input
                type="text"
                name="author"
                value={blogData.author}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Content*
            </label>
            <QuillEditor
              value={blogData.content}
              onChange={handleQuillChange}
              className="mt-1 block w-full rounded-md border-gray-300 min-h-[200px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={blogData.keywords}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={blogData.tags}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Slug*
              </label>
              <input
                type="text"
                name="slug"
                value={blogData.slug}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meta Description
              </label>
              <textarea
                name="meta_description"
                value={blogData.meta_description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Canonical URL
              </label>
              <input
                type="text"
                name="canonical_url"
                value={blogData.canonical_url}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="mt-1 block w-full border border-gray-300 rounded-md"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image Alt Text
            </label>
            <input
              type="text"
              name="image_alt_text"
              value={blogData.image_alt_text}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (blog ? 'Update Blog' : 'Add Blog')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
