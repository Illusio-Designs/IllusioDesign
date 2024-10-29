import React, { useState, useEffect } from 'react';
import QuillEditor from './QuillEditor'; // Import the QuillEditor component

const EditProject = ({ project, onUpdate, onCancel }) => {
  const [updatedProject, setUpdatedProject] = useState({
    title: project.title,
    content: project.content,
    year: project.year,
    timeline: project.timeline,
    services: project.services,
    industry: project.industry,
    website: project.website,
    slug: project.slug,
    projectimage: null, // Reset the image for editing
    meta_description: project.meta_description || '',
    meta_keywords: project.meta_keywords || '',
    canonical_url: project.canonical_url || '',
    focus_keyword: project.focus_keyword || '',
    image_alt_text: project.image_alt_text || ''
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (project.projectimage) {
      // Set the image preview URL if a project image exists
      setImagePreview(`http://localhost:3000/uploads/project/${project.projectimage}`);
    }
  }, [project.projectimage]);

  // Handle input changes for other fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };

  // Handle content change from QuillEditor
  const handleContentChange = (content) => {
    setUpdatedProject((prev) => ({ ...prev, content }));
  };

  // Handle file input change for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdatedProject((prev) => ({ ...prev, projectimage: file })); // Store the file object
    if (file) {
      // Create a preview URL for the selected image
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(''); // Clear preview if no file is selected
    }
  };

  // Handle form submission to update the project
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProject); // Pass the updated project data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={updatedProject.title}
        onChange={handleInputChange}
        required
      />
      <QuillEditor
        name="content"
        value={updatedProject.content}
        onChange={handleContentChange}
        required
      />
      <input
        type="text"
        name="year"
        value={updatedProject.year}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="timeline"
        value={updatedProject.timeline}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="services"
        value={updatedProject.services}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="slug"
        value={updatedProject.slug}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="industry"
        value={updatedProject.industry}
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="website"
        value={updatedProject.website}
        onChange={handleInputChange}
        required
      />
      
      {/* Image Upload */}
      <input
        type="file"
        name="projectimage"
        onChange={handleFileChange}
        accept="image/*"
      />
      
      {/* Image Preview */}
      {imagePreview && (
        <div className="mt-2">
          <img src={imagePreview} alt="Preview" className="h-48 object-cover rounded" />
        </div>
      )}

      {/* SEO Fields */}
      <input
        type="text"
        name="meta_description"
        value={updatedProject.meta_description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="meta_keywords"
        value={updatedProject.meta_keywords}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="canonical_url"
        value={updatedProject.canonical_url}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="focus_keyword"
        value={updatedProject.focus_keyword}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image_alt_text"
        value={updatedProject.image_alt_text}
        onChange={handleInputChange}
      />

      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditProject;
