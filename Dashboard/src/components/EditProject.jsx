// src/components/EditProject.jsx
import React, { useState } from 'react';
import QuillEditor from './QuillEditor'; // Import the QuillEditor component

const EditProject = ({ project, onUpdate, onCancel }) => {
  const [updatedProject, setUpdatedProject] = useState({ 
    title: project.title, 
    description: project.description 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (html) => {
    setUpdatedProject((prev) => ({ ...prev, description: html })); // Update description with Quill editor content
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedProject);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={updatedProject.title}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <QuillEditor initialHtml={updatedProject.description} onChange={handleDescriptionChange} /> {/* Use QuillEditor for description */}
        </label>
      </div>
      <button type="submit">Update Project</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditProject;
