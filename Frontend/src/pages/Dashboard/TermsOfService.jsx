'use client';

import { useState, useEffect, useRef } from 'react';
import { termsOfServiceAPI } from '@/services/api';
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
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/TermsOfService.css';

export default function TermsOfService() {
  const [termsOfService, setTermsOfService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingTerms, setEditingTerms] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const initialFormData = { content: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side before initializing editor
  useEffect(() => {
    setIsClient(true);
  }, []);

  // TipTap editor instance - only create on client side
  const editor = useEditor(
    {
      immediatelyRender: false,
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
          placeholder: 'Write your terms of service content here...',
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
        // Use functional update to ensure we're working with latest formData
        setFormData(prev => ({ ...prev, content: html }));
      },
    },
    [isClient]
  );

  const resetForm = () => {
    setEditingTerms(null);
    setFormData(initialFormData);
    if (editor) {
      editor.commands.setContent(initialFormData.content || '');
    }
  };

  // Update editor content when formData.content changes
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
    fetchTermsOfService();
  }, [currentPage]);

  const fetchTermsOfService = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await termsOfServiceAPI.getAll();
      if (result.data) {
        setTermsOfService(result.data);
      }
    } catch (error) {
      console.error('Error fetching terms of service:', error);
      toast.error('Failed to fetch terms of service. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (terms) => {
    setEditingTerms(terms);
    const termsContent = terms.content || '';
    setFormData({
      content: termsContent
    });
    // Don't directly set editor content here - let useEffect handle it after formData is set
    // This prevents race conditions where onUpdate fires with stale formData
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (terms) => {
    if (!confirm('Are you sure you want to delete this terms of service?')) return;
    try {
      await termsOfServiceAPI.delete(terms.id);
      fetchTermsOfService();
      toast.success('Terms of Service deleted successfully');
    } catch (error) {
      console.error('Error deleting terms of service:', error);
      toast.error('Failed to delete terms of service: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Normalize content before sending (remove double <br> tags)
      const normalizedFormData = {
        ...formData,
        content: normalizeContentForSave(formData.content || '')
      };
      
      if (editingTerms) {
        await termsOfServiceAPI.update(editingTerms.id, normalizedFormData);
        toast.success('Terms of Service updated successfully');
      } else {
        await termsOfServiceAPI.create(normalizedFormData);
        toast.success('Terms of Service created successfully');
      }
      
      resetForm();
      setIsModalOpen(false);
      setShowTable(true);
      fetchTermsOfService();
    } catch (error) {
      console.error('Error saving terms of service:', error);
      toast.error('Failed to save terms of service: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    resetForm();
    setShowTable(true);
    setIsModalOpen(false);
  };

  const stripHtml = (html) => {
    if (!html || typeof html !== 'string') return '';
    return html.replace(/<[^>]+>/g, '').trim();
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { 
      key: 'content', 
      label: 'Content', 
      render: (value) => {
        const text = stripHtml(value);
        if (!text) return 'N/A';
        return text.length > 120 ? text.substring(0, 120) + '...' : text;
      } 
    },
    { 
      key: 'lastUpdated', 
      label: 'Last Updated', 
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' 
    },
    { 
      key: 'createdAt', 
      label: 'Created At', 
      render: (value) => value ? new Date(value).toLocaleDateString() : 'N/A' 
    }
  ];

  const totalPages = Math.ceil(termsOfService.length / itemsPerPage);
  const paginatedData = termsOfService.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="terms-of-service-page">
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Terms of Service</h1>
        </div>
        {showTable && !loading && (
          <div className="page-header-right">
            <div className="page-add-button-wrapper">
              <button className="add-btn-inline" onClick={handleAdd}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add New</span>
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
                <h2 className="content-card-title">Terms of Service</h2>
                <Table
                  columns={columns}
                  data={paginatedData}
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
            title={editingTerms ? 'Edit Terms of Service' : 'Add Terms of Service'}
            size="large"
            inline
          >
            <form onSubmit={handleSubmit} className="terms-of-service-form">
              <div className="form-grid">
                <div className="form-column">
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
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Saving...' : editingTerms ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
}
