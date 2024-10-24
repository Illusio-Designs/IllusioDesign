import React, { useState, useEffect } from 'react';
import { getAllBlogs, deleteBlog } from '../services/blogApi'; // Use getAllBlogs instead of listBlogs
import EditBlog from '../components/EditBlog'; // Modal component for adding/editing blogs

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null); // Blog selected for editing

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getAllBlogs(); // Updated to use getAllBlogs
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleAddBlog = () => {
    setSelectedBlog(null); // Clear the selected blog for adding a new one
    setShowModal(true); // Show modal
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog); // Set the blog to be edited
    setShowModal(true); // Show modal
  };

  const handleDeleteBlog = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete && id) {
      try {
        await deleteBlog(id); // Call to backend to delete the blog and associated SEO data
        setBlogs(blogs.filter(blog => blog.id !== id)); // Remove the blog from the state
        console.log(`Blog with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
      }
    } else {
      console.error('Invalid blog ID:', id);
    }
  };
  


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Blogs</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddBlog}
        >
          Add Blog
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Title</th>
            <th className="py-2">Category</th>
            <th className="py-2">Author</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id} className="border-t">
              <td className="py-2">{blog.title}</td>
              <td className="py-2">{blog.category}</td>
              <td className="py-2">{blog.author}</td>
              <td className="py-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditBlog(blog)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteBlog(blog.id)} // Ensure blog.id is used here
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
      {showModal && (
        <EditBlog
          blog={selectedBlog} // Pass the selected blog for editing or null for adding
          onClose={() => setShowModal(false)}
          onBlogUpdated={(updatedBlog) => {
            if (selectedBlog) {
              setBlogs(blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)));
            } else {
              setBlogs([...blogs, updatedBlog]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default BlogPage;
