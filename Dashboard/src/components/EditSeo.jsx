import React, { useState, useEffect } from 'react';
import { createSeo, updateSeo } from '../services/seoApi'; // Ensure the API methods are correctly imported

const EditSeo = ({ seo, onClose, onSeoUpdated }) => {
  const [formData, setFormData] = useState({
    page_url: '',
    page_title: '',
    meta_description: '',
    focus_keyword: '',
    canonical_url: '',
    image_alt_tags: '',
  });

  useEffect(() => {
    if (seo) {
      // Populate form data for editing
      setFormData({
        page_url: seo.page_url || '',
        page_title: seo.page_title || '',
        meta_description: seo.meta_description || '',
        focus_keyword: seo.focus_keyword || '',
        canonical_url: seo.canonical_url || '',
        image_alt_tags: seo.image_alt_tags || '',
      });
    }
  }, [seo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = seo ? 'updateSeo' : 'createSeo';
      const updatedSeo = seo
        ? await updateSeo(seo.id, formData) 
        : await createSeo(formData);
      onSeoUpdated(updatedSeo);
    } catch (error) {
      console.error('Error saving SEO entry:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3 className="text-lg font-bold">{seo ? 'Edit SEO Entry' : 'Add SEO Entry'}</h3>
        
        <div>
          <label>Page URL:</label>
          <input
            type="text"
            name="page_url"
            value={formData.page_url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Page Title:</label>
          <input
            type="text"
            name="page_title"
            value={formData.page_title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Meta Description:</label>
          <textarea
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Focus Keyword:</label>
          <input
            type="text"
            name="focus_keyword"
            value={formData.focus_keyword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Canonical URL:</label>
          <input
            type="text"
            name="canonical_url"
            value={formData.canonical_url}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image Alt Tags:</label>
          <input
            type="text"
            name="image_alt_tags"
            value={formData.image_alt_tags}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditSeo;
