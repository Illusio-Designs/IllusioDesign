'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { blogAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Blog.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://api.illusiodesigns.agency';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Ensure path starts with /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export default function Blog() {
  const { getToken } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    date: '',
    category: '',
    tags: '',
    content: '',
    author: '',
    publishDate: '',
    seoTitle: '',
    metaDescription: '',
    seoUrl: '',
    image: null
  });
  const [currentMainImage, setCurrentMainImage] = useState(null);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchBlogs();
  }, [currentPage, searchQuery]);

  const fetchBlogs = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await blogAPI.getAll();
      if (result.data) {
        setBlogs(result.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingBlog(null);
    setFormData({
      title: '',
      slug: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      tags: '',
      content: '',
      author: '',
      publishDate: new Date().toISOString().split('T')[0],
      seoTitle: '',
      metaDescription: '',
      seoUrl: '',
      image: null
    });
    setCurrentMainImage(null);
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      date: blog.date || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      content: blog.content || '',
      author: blog.author || '',
      publishDate: blog.publishDate || blog.date || '',
      seoTitle: blog.seoTitle || '',
      metaDescription: blog.metaDescription || '',
      seoUrl: blog.seoUrl || blog.slug || '',
      image: null
    });
    // Set current image for display
    const mainImagePath = blog.image || null;
    setCurrentMainImage(mainImagePath);
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (blog) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await blogAPI.delete(blog.id);
      fetchBlogs();
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add main image
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (editingBlog && !currentMainImage) {
        // If main image was removed, send empty to delete
        formDataToSend.append('image', '');
      }

      if (editingBlog) {
        await blogAPI.update(editingBlog.id, formDataToSend);
        toast.success('Blog updated successfully');
      } else {
        await blogAPI.create(formDataToSend);
        toast.success('Blog created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      setCurrentMainImage(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      // Don't update currentMainImage here - let the preview use URL.createObjectURL
    }
  };

  const removeCurrentMainImage = () => {
    setFormData({ ...formData, image: null });
    setCurrentMainImage(null);
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date' },
    { key: 'category', label: 'Category' },
    { key: 'tags', label: 'Tags', render: (value) => Array.isArray(value) ? value.join(', ') : value || 'N/A' }
  ];

  const filteredBlogs = blogs.filter(blog => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.category?.toLowerCase().includes(query) ||
      blog.tags?.toString().toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="blog-page">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title-wrapper">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="page-title">Blog</h1>
          </div>
          {showTable && !loading && (
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd} title="Add New">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            <h2 className="content-card-title">Blog</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                <Table
                  columns={columns}
                  data={paginatedBlogs}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <Modal
            isOpen={isModalOpen}
            onClose={handleBack}
            title={editingBlog ? 'Edit Blog' : 'Add Blog'}
            size="large"
            inline
          >
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Comma separated"
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <div className="rich-text-editor">
                  <div className="editor-toolbar">
                    <button type="button" className="toolbar-btn">
                      <strong>B</strong>
                    </button>
                    <button type="button" className="toolbar-btn">
                      <em>I</em>
                    </button>
                    <button type="button" className="toolbar-btn">
                      <u>U</u>
                    </button>
                    <button type="button" className="toolbar-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 8L8 10L10 8" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </button>
                    <button type="button" className="toolbar-btn">Heading</button>
                    <button type="button" className="toolbar-btn">Subheading</button>
                    <button type="button" className="toolbar-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4H13M3 8H13M3 12H8" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </button>
                    <button type="button" className="toolbar-btn">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 4H13M3 8H13M3 12H8" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </button>
                  </div>
                  <textarea
                    className="editor-content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                  />
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Feature Images</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <div className="upload-placeholder">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M28 8H12C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40H36C37.6569 40 39 38.6569 39 37V20M28 8L39 20M28 8V20H39" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p>Drag & Drop your Files or Browse</p>
                  </div>
                  
                  {/* Current Image Preview */}
                  {currentMainImage && !formData.image && (
                    <div style={{ marginTop: '12px', position: 'relative' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Current Image:</div>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                          src={getImageUrl(currentMainImage)}
                          alt="Current main"
                          style={{ 
                            maxWidth: '200px', 
                            maxHeight: '150px', 
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid #e5e5e5',
                            display: 'block'
                          }}
                          onError={(e) => {
                            console.error('Image load error:', currentMainImage, 'Full URL:', getImageUrl(currentMainImage));
                            e.target.style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          onClick={removeCurrentMainImage}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove image"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* New Selected Image Preview */}
                  {formData.image && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>New Selected: {formData.image.name}</div>
                      <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          style={{ 
                            maxWidth: '200px', 
                            maxHeight: '150px', 
                            borderRadius: '8px',
                            objectFit: 'cover',
                            border: '1px solid #e5e5e5',
                            display: 'block'
                          }}
                          onError={(e) => {
                            console.error('Preview image load error');
                            e.target.style.display = 'none';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, image: null });
                            if (editingBlog && editingBlog.image) {
                              setCurrentMainImage(editingBlog.image);
                            } else {
                              setCurrentMainImage(null);
                            }
                          }}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Author</label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Publish Date</label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>SEO Title</label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Meta Description</label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>SEO URL</label>
                <input
                  type="text"
                  value={formData.seoUrl}
                  onChange={(e) => setFormData({ ...formData, seoUrl: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
          </Modal>
        )}
      </div>
    </div>
  );
}

