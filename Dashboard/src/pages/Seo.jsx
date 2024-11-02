import React, { useState, useEffect } from 'react';
import { getAllSeo, createSeo, updateSeo, deleteSeo } from '../services/seoApi'; // Adjust the path if necessary
import EditSeo from '../components/EditSeo'; // Modal component for adding/editing SEO entries

const SeoPage = () => {
  const [seoEntries, setSeoEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSeo, setSelectedSeo] = useState(null); // SEO entry selected for editing

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
    setSelectedSeo(null); // Clear the selected SEO for adding a new one
    setShowModal(true); // Show modal
  };

  const handleEditSeo = (seo) => {
    setSelectedSeo(seo); // Set the SEO to be edited
    setShowModal(true); // Show modal
  };

  const handleDeleteSeo = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this SEO entry?');
    if (confirmDelete && id) {
      try {
        await deleteSeo(id); // Call to backend to delete the SEO entry
        setSeoEntries(seoEntries.filter(seo => seo.id !== id)); // Remove the SEO from the state
        console.log(`SEO entry with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error('Error deleting SEO entry:', error);
        alert('Failed to delete SEO entry. Please try again.');
      }
    } else {
      console.error('Invalid SEO ID:', id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">SEO Entries</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddSeo}
        >
          Add SEO Entry
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Page URL</th>
            <th className="py-2">Page Title</th>
            <th className="py-2">Meta Description</th>
            <th className="py-2">Focus Keyword</th>
            <th className="py-2">Canonical URL</th>
            <th className="py-2">Image Alt Tags</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {seoEntries.map(seo => (
            <tr key={seo.id} className="border-t">
              <td className="py-2">{seo.page_url}</td>
              <td className="py-2">{seo.page_title}</td>
              <td className="py-2">{seo.meta_description}</td>
              <td className="py-2">{seo.focus_keyword}</td>
              <td className="py-2">{seo.canonical_url}</td>
              <td className="py-2">{seo.image_alt_tags}</td>
              <td className="py-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditSeo(seo)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteSeo(seo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <EditSeo
          seo={selectedSeo}
          onClose={() => setShowModal(false)}
          onSeoUpdated={(updatedSeo) => {
            if (selectedSeo) {
              setSeoEntries(seoEntries.map(s => (s.id === updatedSeo.id ? updatedSeo : s)));
            } else {
              setSeoEntries([...seoEntries, updatedSeo]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default SeoPage;
