import React, { useState, useEffect } from 'react';
import { getAllSeo, createSeo, updateSeo, deleteSeo } from '../services/seoApi';
import EditSeo from '../components/EditSeo';

const Seo = () => {
  const [seoEntries, setSeoEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeo, setSelectedSeo] = useState(null);

  useEffect(() => {
    const fetchSeoEntries = async () => {
      try {
        const fetchedSeo = await getAllSeo();
        setSeoEntries(fetchedSeo);
      } catch (error) {
        console.error('Error fetching SEO entries:', error);
      }
    };
    fetchSeoEntries();
  }, []);

  const handleAddSeo = () => {
    setSelectedSeo(null);
    setShowModal(true);
  };

  const handleEditSeo = (seo) => {
    setSelectedSeo(seo);
    setShowModal(true);
  };

  const handleDeleteSeo = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this SEO entry?');
    if (confirmDelete) {
      try {
        await deleteSeo(id);
        setSeoEntries(seoEntries.filter(seo => seo.id !== id));
        console.log(`SEO entry with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting SEO entry:', error);
        alert('Failed to delete SEO entry. Please try again.');
      }
    }
  };

  const handleSeoUpdate = async (updatedSeo) => {
    try {
      if (selectedSeo) {
        const response = await updateSeo(updatedSeo);
        setSeoEntries(seoEntries.map(seo => (seo.id === response.id ? response : seo)));
        console.log(`SEO entry with ID ${response.id} updated successfully.`);
      } else {
        const newSeo = await createSeo(updatedSeo);
        setSeoEntries([...seoEntries, newSeo]);
        console.log(`New SEO entry added successfully.`);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error updating SEO entry:', error);
      alert('Failed to update SEO entry. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold">SEO Entries</h2>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleAddSeo}>
        Add SEO Entry
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th>Page URL</th>
            <th>Page Title</th>
            <th>Meta Description</th>
            <th>Focus Keyword</th>
            <th>Canonical URL</th>
            <th>Image Alt Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {seoEntries.map(seo => (
            <tr key={seo.id}>
              <td>{seo.page_url}</td>
              <td>{seo.page_title}</td>
              <td>{seo.meta_description}</td>
              <td>{seo.focus_keyword}</td>
              <td>{seo.canonical_url}</td>
              <td>{seo.image_alt_tags}</td>
              <td>
                <button onClick={() => handleEditSeo(seo)}>Edit</button>
                <button onClick={() => handleDeleteSeo(seo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <EditSeo
          seo={selectedSeo}
          onClose={() => setShowModal(false)}
          onSeoUpdated={handleSeoUpdate}
        />
      )}
    </div>
  );
};

export default Seo; 