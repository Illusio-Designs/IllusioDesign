import React, { useState, useEffect } from 'react';
import { createSeo, updateSeo } from '../services/seoApi';

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
      const updatedSeo = seo ? await updateSeo({ ...formData, id: seo.id }) : await createSeo(formData);
      onSeoUpdated(updatedSeo);
    } catch (error) {
      console.error('Error saving SEO entry:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h3>{seo ? 'Edit SEO Entry' : 'Add SEO Entry'}</h3>
        <input type="text" name="page_url" value={formData.page_url} onChange={handleChange} required />
        <input type="text" name="page_title" value={formData.page_title} onChange={handleChange} required />
        <textarea name="meta_description" value={formData.meta_description} onChange={handleChange} required />
        <input type="text" name="focus_keyword" value={formData.focus_keyword} onChange={handleChange} />
        <input type="text" name="canonical_url" value={formData.canonical_url} onChange={handleChange} />
        <input type="text" name="image_alt_tags" value={formData.image_alt_tags} onChange={handleChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditSeo;
