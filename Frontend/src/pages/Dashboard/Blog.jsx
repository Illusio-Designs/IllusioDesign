'use client';

import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearch } from '@/contexts/SearchContext';
import { blogAPI } from '@/services/api';
import { toast } from 'react-toastify';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import Loader from '@/components/common/Loader';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { normalizeContentForSave } from '@/utils/contentNormalizer';
import { toSlug } from '@/utils/urlSlug';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/Blog.css';

// Use NEXT_PUBLIC_IMAGE_URL for images (consistent with public pages)
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'https://api.illusiodesigns.agency';

// Helper function to construct image URL
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  // Ensure path starts with /
  const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${IMAGE_BASE_URL}${normalizedPath}`;
};

export default function Blog() {
  const { getToken } = useAuth();
  const { searchQuery } = useSearch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingBlog, setEditingBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    seoKeywords: '',
    seoUrl: '',
    image: null
  });
  const [originalTitle, setOriginalTitle] = useState('');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [currentMainImage, setCurrentMainImage] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side before initializing editor
  useEffect(() => {
    setIsClient(true);
  }, []);

  // TipTap editor instance - only create on client side
  const editor = useEditor(
    {
      immediatelyRender: false, // Prevent SSR hydration mismatch - this is the key fix
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        }),
        Image,
        Placeholder.configure({
          placeholder: 'Write your blog content here...',
        }),
      ],
      content: formData.content || '',
      editorProps: {
        attributes: {
          class: 'tiptap-editor',
        },
        // Preserve all Unicode characters including emojis when pasting
        transformPastedHTML: (html) => {
          // Return HTML as-is to preserve emojis and all Unicode characters
          return html;
        },
      },
      onUpdate: ({ editor }) => {
        // Use getHTML() which preserves Unicode characters including emojis
        // TipTap automatically preserves all Unicode characters in HTML output
        const html = editor.getHTML();
        setFormData({ ...formData, content: html });
      },
    },
    [isClient] // Only create when isClient is true
  );

  // Update editor content when formData.content changes (e.g., when editing)
  // Use a ref to prevent infinite loops and ensure we only update when needed
  const isUpdatingEditorRef = useRef(false);
  useEffect(() => {
    if (editor && formData.content !== editor.getHTML() && !isUpdatingEditorRef.current) {
      isUpdatingEditorRef.current = true;
      editor.commands.setContent(formData.content || '');
      // Reset flag after a short delay to allow editor to update
      setTimeout(() => {
        isUpdatingEditorRef.current = false;
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.content]);

  // Cleanup editor on unmount
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

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
      seoKeywords: '',
      seoUrl: '',
      image: null
    });
    setOriginalTitle('');
    setIsSlugManuallyEdited(false);
    if (editor) {
      editor.commands.setContent('');
    }
    setCurrentMainImage(null);
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    const blogContent = blog.content || '';
    
    // Format date properly for date inputs (YYYY-MM-DD)
    const formatDate = (dateValue) => {
      if (!dateValue) return '';
      if (typeof dateValue === 'string') {
        // If it's already in YYYY-MM-DD format, return as is
        if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return dateValue;
        }
        // Try to parse and format
        const date = new Date(dateValue);
        if (!isNaN(date.getTime())) {
          return date.toISOString().split('T')[0];
        }
      }
      return '';
    };
    
    setOriginalTitle(blog.title || '');
    setIsSlugManuallyEdited(false);
    setFormData({
      title: blog.title || '',
      slug: blog.slug || '',
      date: formatDate(blog.date) || new Date().toISOString().split('T')[0],
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : (blog.tags || ''),
      content: blogContent,
      author: blog.author || '',
      publishDate: formatDate(blog.publishDate || blog.date) || new Date().toISOString().split('T')[0],
      seoTitle: blog.seoTitle || '',
      metaDescription: blog.metaDescription || '',
      seoKeywords: blog.seoKeywords || '',
      seoUrl: blog.seoUrl || blog.slug || '',
      image: null
    });
    // Don't directly set editor content here - let useEffect handle it after formData is set
    // This prevents race conditions where onUpdate fires with stale formData
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
      
      // Always include content field (even if empty), preserving UTF-8 encoding for emojis
      Object.keys(formData).forEach(key => {
        if (key === 'content') {
          // Always append content, preserving UTF-8 encoding for emojis and Unicode characters
          // Normalize double <br> tags to single <br> tags
          const content = normalizeContentForSave(formData[key] || '');
          // Ensure content is properly encoded as UTF-8
          formDataToSend.append(key, content);
        } else if (key === 'slug') {
          // Always include slug, generate from title if empty
          const slugToSend = formData.slug && formData.slug.trim() 
            ? formData.slug.trim() 
            : toSlug(formData.title || '');
          formDataToSend.append(key, slugToSend);
        } else if (key !== 'image' && formData[key] !== null && formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Debug: Log content being sent
      console.log('Submitting blog with content:', {
        hasContent: !!formData.content,
        contentLength: formData.content?.length,
        contentPreview: formData.content?.substring(0, 200)
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
          <h1 className="page-title">Blog</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New Blog</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="content-card">
        {showTable ? (
          <>
            {loading ? (
              <Loader size="large" />
            ) : (
              <>
                <h2 className="content-card-title">Blog</h2>
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
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    // Auto-generate slug from title only if:
                    // 1. Creating new blog (no editingBlog), OR
                    // 2. Title changed from original AND slug hasn't been manually edited
                    if (!editingBlog || (!isSlugManuallyEdited && newTitle !== originalTitle)) {
                      const newSlug = toSlug(newTitle);
                      setFormData({ ...formData, title: newTitle, slug: newSlug });
                    } else {
                      setFormData({ ...formData, title: newTitle });
                    }
                  }}
                  required
                />
              </div>

              <div className="form-group">
                <label>Slug (URL-friendly)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    setIsSlugManuallyEdited(true);
                    setFormData({ ...formData, slug: toSlug(e.target.value) });
                  }}
                  placeholder="Auto-generated from title"
                  required
                />
                <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  This will be used in the URL. Auto-generated from title, but you can edit it.
                </small>
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
                <div className="rich-text-editor-wrapper">
                  {isClient && editor && (
                    <>
                      {/* Toolbar */}
                      <div className="tiptap-toolbar">
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleBold().run()}
                          className={editor.isActive('bold') ? 'is-active' : ''}
                          title="Bold"
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleItalic().run()}
                          className={editor.isActive('italic') ? 'is-active' : ''}
                          title="Italic"
                        >
                          <em>I</em>
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleStrike().run()}
                          className={editor.isActive('strike') ? 'is-active' : ''}
                          title="Strike"
                        >
                          <s>S</s>
                        </button>
                        <div className="toolbar-divider"></div>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                          title="Heading 1"
                        >
                          H1
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <div className="toolbar-divider"></div>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleBulletList().run()}
                          className={editor.isActive('bulletList') ? 'is-active' : ''}
                          title="Bullet List"
                        >
                          •
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().toggleOrderedList().run()}
                          className={editor.isActive('orderedList') ? 'is-active' : ''}
                          title="Numbered List"
                        >
                          1.
                        </button>
                        <div className="toolbar-divider"></div>
                        <button
                          type="button"
                          onClick={() => {
                            const url = window.prompt('Enter URL:');
                            if (url) {
                              editor.chain().focus().setLink({ href: url }).run();
                            }
                          }}
                          className={editor.isActive('link') ? 'is-active' : ''}
                          title="Link"
                        >
                          🔗
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = window.prompt('Enter image URL:');
                            if (url) {
                              editor.chain().focus().setImage({ src: url }).run();
                            }
                          }}
                          title="Image"
                        >
                          🖼️
                        </button>
                        <button
                          type="button"
                          onClick={() => editor.chain().focus().unsetLink().run()}
                          className={editor.isActive('link') ? '' : 'disabled'}
                          title="Remove Link"
                          disabled={!editor.isActive('link')}
                        >
                          Unlink
                        </button>
                      </div>
                      {/* Editor Content */}
                      <EditorContent editor={editor} />
                    </>
                  )}
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
                <label>SEO Keywords</label>
                <textarea
                  value={formData.seoKeywords}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  rows={3}
                  placeholder="Comma separated keywords"
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

