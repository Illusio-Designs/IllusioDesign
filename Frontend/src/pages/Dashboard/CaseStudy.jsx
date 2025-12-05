'use client';

import { useState, useEffect, useRef } from 'react';
import { caseStudyAPI } from '@/services/api';
import { toast } from 'react-toastify';
import { useSearch } from '@/contexts/SearchContext';
import Table from '@/components/common/Table';
import Modal from '@/components/common/Modal';
import Pagination from '@/components/common/Pagination';
import '@/styles/pages/Dashboard/shared.css';
import '@/styles/pages/Dashboard/CaseStudy.css';

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

export default function CaseStudy() {
  const { searchQuery } = useSearch();
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Helper function to clean strings from JSON artifacts
  const cleanString = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/\\/g, '') // Remove backslashes
      .replace(/\|/g, '') // Remove pipes
      .replace(/[\[\]"]/g, '') // Remove brackets and quotes
      .trim();
  };

  // Helper to parse array field and return clean comma-separated string
  const parseArrayField = (field) => {
    if (!field) return '';
    try {
      // If it's already a string with JSON artifacts, try to parse
      if (typeof field === 'string') {
        // Check if it looks like JSON
        if (field.trim().startsWith('[') || field.includes('\\')) {
          try {
            const parsed = JSON.parse(field);
            if (Array.isArray(parsed)) {
              return parsed.map(item => cleanString(item)).filter(item => item).join(', ');
            }
          } catch (e) {
            // If parsing fails, clean the string
            return cleanString(field);
          }
        }
        // If it's a simple string, clean it
        return cleanString(field);
      }
      // If it's already an array
      if (Array.isArray(field)) {
        return field.map(item => cleanString(item)).filter(item => item).join(', ');
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  // Helper to parse results array and return clean newline-separated string
  const parseResultsField = (field) => {
    if (!field) return '';
    try {
      let resultsArray = field;
      
      // If it's a string, try to parse as JSON
      if (typeof field === 'string') {
        if (field.trim().startsWith('[') || field.includes('\\')) {
          try {
            resultsArray = JSON.parse(field);
          } catch (e) {
            // If not JSON, return cleaned string
            return cleanString(field);
          }
        } else {
          // Simple string, return as is
          return field;
        }
      }
      
      // Handle array
      if (Array.isArray(resultsArray)) {
        return resultsArray.map(result => {
          // If result is a string, use it
          if (typeof result === 'string') {
            return cleanString(result);
          }
          // If result is an object (old format), get title or description
          if (result && typeof result === 'object') {
            return cleanString(result.title || result.description || '');
          }
          return '';
        }).filter(r => r).join('\n');
      }
      
      return '';
    } catch (e) {
      return '';
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [editingCaseStudy, setEditingCaseStudy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const fetchingRef = useRef(false);
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    industries: '',
    description: '',
    services: '',
    duration: '',
    link: '',
    category: '',
    tags: '',
    techStack: '',
    timeline: '',
    results: '',
    location: '',
    clientName: '',
    seoTitle: '',
    metaDescription: '',
    seoUrl: '',
    image: null,
    additionalImages: []
  });
  const [currentMainImage, setCurrentMainImage] = useState(null);
  const [currentAdditionalImages, setCurrentAdditionalImages] = useState([]);

  useEffect(() => {
    if (fetchingRef.current) return;
    fetchCaseStudies();
  }, [currentPage]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchCaseStudies = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    try {
      const result = await caseStudyAPI.getAll();
      if (result.data) {
        setCaseStudies(result.data);
      }
    } catch (error) {
      console.error('Error fetching case studies:', error);
      toast.error('Failed to fetch projects. Please check if backend is running.');
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  const handleAdd = () => {
    setEditingCaseStudy(null);
    setFormData({
      title: '',
      year: new Date().getFullYear().toString(),
      industries: '',
      description: '',
      services: '',
      duration: '',
      link: '',
      category: '',
      tags: '',
      techStack: '',
      timeline: '',
      results: '',
      location: '',
      clientName: '',
      seoTitle: '',
      metaDescription: '',
      seoUrl: '',
      image: null,
      additionalImages: []
    });
    setCurrentMainImage(null);
    setCurrentAdditionalImages([]);
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleEdit = (caseStudy) => {
    setEditingCaseStudy(caseStudy);
    setFormData({
      title: caseStudy.title || '',
      year: caseStudy.year || new Date().getFullYear().toString(),
      industries: caseStudy.industry || caseStudy.industries || '',
      description: caseStudy.description || '',
      services: caseStudy.services || caseStudy.category || '',
      duration: caseStudy.duration || '',
      link: caseStudy.link || '',
      category: caseStudy.category || '',
      tags: parseArrayField(caseStudy.tags),
      techStack: parseArrayField(caseStudy.techStack),
      timeline: caseStudy.timeline || caseStudy.duration || '',
      results: parseResultsField(caseStudy.results),
      location: caseStudy.location || '',
      clientName: caseStudy.clientName || caseStudy.projectName || '',
      seoTitle: caseStudy.seoTitle || '',
      metaDescription: caseStudy.metaDescription || '',
      seoUrl: caseStudy.seoUrl || '',
      image: null,
      additionalImages: [],
      additionalImagesToKeep: Array.isArray(caseStudy.additionalImages) ? caseStudy.additionalImages : []
    });
    // Set current images for display
    // Ensure image path is correct
    const mainImagePath = caseStudy.image || null;
    setCurrentMainImage(mainImagePath);
    
    // Ensure additional images paths are correct
    const additionalImages = Array.isArray(caseStudy.additionalImages) ? caseStudy.additionalImages : [];
    setCurrentAdditionalImages(additionalImages);
    setIsModalOpen(true);
    setShowTable(false);
  };

  const handleDelete = async (caseStudy) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await caseStudyAPI.delete(caseStudy.id);
      fetchCaseStudies();
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast.error('Failed to delete project: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'image' && key !== 'additionalImages' && key !== 'additionalImagesToKeep' && formData[key] !== null && formData[key] !== '') {
          // Handle array fields (tags, techStack, results)
          if (key === 'tags' || key === 'techStack') {
            // Convert comma-separated string to array
            const value = formData[key].trim();
            if (value) {
              const array = value.split(',').map(item => item.trim()).filter(item => item);
              formDataToSend.append(key, JSON.stringify(array));
            }
          } else if (key === 'results') {
            // Convert newline-separated string to array of strings (just lines, no title/description)
            const value = formData[key].trim();
            if (value) {
              const lines = value.split('\n').map(line => line.trim()).filter(line => line);
              // Store as array of strings, each line is a result
              formDataToSend.append(key, JSON.stringify(lines));
            }
          } else if (key === 'industries') {
            // Map industries to industry for backend
            formDataToSend.append('industry', formData[key]);
          } else if (key === 'clientName') {
            // Map clientName to projectName for backend
            formDataToSend.append('projectName', formData[key]);
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });
      
      // Add main image
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (editingCaseStudy && !currentMainImage) {
        // If main image was removed, send empty to delete
        formDataToSend.append('image', '');
      }
      
      // Handle additional images
      if (editingCaseStudy) {
        // When editing, always send existingAdditionalImages (even if empty)
        // This tells backend which images to keep
        const imagesToKeep = formData.additionalImagesToKeep !== undefined 
          ? formData.additionalImagesToKeep 
          : currentAdditionalImages.map(img => img.startsWith('http') ? img.replace(IMAGE_BASE_URL, '') : img);
        
        if (imagesToKeep.length > 0) {
          imagesToKeep.forEach((img) => {
            formDataToSend.append('existingAdditionalImages', img);
          });
        } else {
          // Send empty string to indicate all should be removed
          formDataToSend.append('existingAdditionalImages', '');
        }
      }
      
      // Add new additional images
      if (formData.additionalImages && formData.additionalImages.length > 0) {
        formData.additionalImages.forEach((file) => {
          if (file instanceof File) {
            formDataToSend.append('additionalImages', file);
          }
        });
      }

      if (editingCaseStudy) {
        await caseStudyAPI.update(editingCaseStudy.id, formDataToSend);
        toast.success('Project updated successfully');
      } else {
        await caseStudyAPI.create(formDataToSend);
        toast.success('Project created successfully');
      }
      
      setIsModalOpen(false);
      setShowTable(true);
      setCurrentMainImage(null);
      setCurrentAdditionalImages([]);
      fetchCaseStudies();
    } catch (error) {
      console.error('Error saving case study:', error);
      toast.error('Failed to save project: ' + error.message);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      // Don't update currentMainImage here - let the preview use URL.createObjectURL
    }
  };

  const handleAdditionalImagesChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setFormData({ ...formData, additionalImages: [...formData.additionalImages, ...files] });
    }
  };

  const removeAdditionalImage = (index) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    const newPreviews = currentAdditionalImages.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalImages: newImages });
    setCurrentAdditionalImages(newPreviews);
  };

  const removeCurrentMainImage = () => {
    setFormData({ ...formData, image: null });
    setCurrentMainImage(null);
  };

  const removeCurrentAdditionalImage = (index) => {
    const newImages = currentAdditionalImages.filter((_, i) => i !== index);
    setCurrentAdditionalImages(newImages);
    // Update formData to track kept images (excluding the removed one)
    if (editingCaseStudy && editingCaseStudy.additionalImages) {
      const updatedImages = editingCaseStudy.additionalImages.filter((_, i) => i !== index);
      setFormData({ 
        ...formData, 
        additionalImagesToKeep: updatedImages
      });
    }
  };

  const columns = [
    { key: 'id', label: 'Sr. No.', render: (value, row, index) => index + 1 + (currentPage - 1) * itemsPerPage },
    { key: 'title', label: 'Title' },
    { key: 'createdAt', label: 'Date', render: (value) => value ? new Date(value).toISOString().split('T')[0] : 'N/A' },
    { key: 'industry', label: 'Industries', render: (value) => value || 'N/A' },
    { key: 'category', label: 'Service', render: (value) => value || 'N/A' }
  ];

  // Filter case studies based on search query
  const filteredCaseStudies = caseStudies.filter(cs => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cs.title?.toLowerCase().includes(query) ||
      cs.industry?.toLowerCase().includes(query) ||
      cs.category?.toLowerCase().includes(query) ||
      cs.projectName?.toLowerCase().includes(query) ||
      cs.clientName?.toLowerCase().includes(query) ||
      cs.description?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredCaseStudies.length / itemsPerPage);
  const paginatedData = filteredCaseStudies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleBack = () => {
    setShowTable(true);
    setIsModalOpen(false);
  };

  return (
    <div className="case-study-page">
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title-wrapper">
            <button className="back-btn" onClick={handleBack}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h1 className="page-title">Project</h1>
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
            <h2 className="content-card-title">Project</h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
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
            title={editingCaseStudy ? 'Edit Project' : 'Add Project'}
            size="large"
            inline
          >
        <form onSubmit={handleSubmit} className="case-study-form">
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
                <label>Year</label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Industries</label>
                <input
                  type="text"
                  value={formData.industries}
                  onChange={(e) => setFormData({ ...formData, industries: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <div className="rich-text-editor">
                  <div className="editor-toolbar">
                    <button type="button" className="toolbar-btn"><strong>B</strong></button>
                    <button type="button" className="toolbar-btn"><em>I</em></button>
                    <button type="button" className="toolbar-btn"><u>U</u></button>
                    <button type="button" className="toolbar-btn">Heading</button>
                    <button type="button" className="toolbar-btn">Subheading</button>
                  </div>
                  <textarea
                    className="editor-content"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={10}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Link (Project URL)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label>Category (Project Type)</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="branding">Branding & Design</option>
                  <option value="web">Web</option>
                  <option value="app">App</option>
                  <option value="b2b">B2B & Custom Solution</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Comma separated (e.g., Design, UI, UX)"
                />
              </div>

              <div className="form-group">
                <label>Tech Stack</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="Comma separated (e.g., React, Node.js, MongoDB)"
                />
              </div>

              <div className="form-group">
                <label>Timeline</label>
                <input
                  type="text"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  placeholder="e.g., 3 months, 6 weeks"
                />
              </div>

              <div className="form-group">
                <label>Results</label>
                <textarea
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  rows={5}
                  placeholder="One result per line&#10;e.g.,&#10;Increased Conversion Rate&#10;Better User Engagement&#10;Improved Performance"
                />
                <small style={{ color: '#666', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                  One result per line (just the result text, no title/description format needed)
                </small>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="USA, India, Australia, etc."
                />
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Client name (e.g., Company Name)"
                />
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>Main Image (Feature Image)</label>
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
                            if (editingCaseStudy && editingCaseStudy.image) {
                              setCurrentMainImage(editingCaseStudy.image);
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
                <label>Additional Images (Gallery Images)</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="file-input"
                  />
                  <div className="upload-placeholder">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path d="M28 8H12C10.3431 8 9 9.34315 9 11V37C9 38.6569 10.3431 40 12 40H36C37.6569 40 39 38.6569 39 37V20M28 8L39 20M28 8V20H39" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <p>Drag & Drop Multiple Files or Browse</p>
                  </div>
                  
                  {/* Current Additional Images */}
                  {editingCaseStudy && currentAdditionalImages.length > 0 && formData.additionalImages.length === 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Current Images ({currentAdditionalImages.length}):</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                        {currentAdditionalImages.map((img, index) => (
                          <div key={index} style={{ position: 'relative' }}>
                            <img 
                              src={getImageUrl(img)}
                              alt={`Current ${index + 1}`}
                              style={{ 
                                width: '100%', 
                                height: '100px', 
                                borderRadius: '8px',
                                objectFit: 'cover',
                                border: '1px solid #e5e5e5',
                                display: 'block'
                              }}
                              onError={(e) => {
                                console.error('Image load error:', img, 'Full URL:', getImageUrl(img));
                                e.target.style.display = 'none';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeCurrentAdditionalImage(index)}
                              style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                background: '#ef4444',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* New Selected Additional Images */}
                  {formData.additionalImages.length > 0 && (
                    <div style={{ marginTop: '12px' }}>
                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        New Selected ({formData.additionalImages.length}):
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '8px' }}>
                        {formData.additionalImages.map((file, index) => {
                          const previewUrl = file instanceof File ? URL.createObjectURL(file) : 
                            (file.startsWith('http') ? file : `${IMAGE_BASE_URL}${file}`);
                          return (
                            <div key={index} style={{ position: 'relative' }}>
                              <img 
                                src={previewUrl}
                                alt={`Preview ${index + 1}`}
                                style={{ 
                                  width: '100%', 
                                  height: '100px', 
                                  borderRadius: '8px',
                                  objectFit: 'cover'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => removeAdditionalImage(index)}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '20px',
                                  height: '20px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                title="Remove"
                              >
                                ×
                              </button>
                              {file instanceof File && (
                                <div style={{ 
                                  fontSize: '10px', 
                                  color: '#666', 
                                  marginTop: '4px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}>
                                  {file.name}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Services</label>
                <input
                  type="text"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
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

