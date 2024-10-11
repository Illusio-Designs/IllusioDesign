// src/components/ProjectManagement.jsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  getAllProjects,
  createProject,
  updateProjectById,
  deleteProjectById,
} from '../utils/projectApi';
import { useDropzone } from 'react-dropzone';
import api from '../utils/projectApi';
import ReactQuill from 'react-quill'; // Import Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill CSS
import './Project.css'; // Custom styles

Modal.setAppElement('#root');

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    year: '',
    industry: '',
    services: '',
    timeline: '',
    content: '', // Quill content will be stored as text or HTML
    mainImage: '',
    assetLink: '',
  });
  const [editProjectId, setEditProjectId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();

    return () => {
      setProjects([]);
    };
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditProjectId(null);
    setNewProject({
      title: '',
      year: '',
      industry: '',
      services: '',
      timeline: '',
      content: '',
      mainImage: '',
      assetLink: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setNewProject((prev) => ({ ...prev, content }));
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('image', file);

    api
      .post('/projects/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        const imageUrl = response.data.url;
        setNewProject((prev) => ({ ...prev, mainImage: imageUrl }));
        setSuccess('Image uploaded successfully!');
      })
      .catch(() => {
        setError('Failed to upload image.');
      });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let project;
      if (editProjectId) {
        project = await updateProjectById(editProjectId, newProject);
        setProjects((prev) =>
          prev.map((p) => (p.id === editProjectId ? project : p))
        );
        setSuccess('Project updated successfully!');
      } else {
        project = await createProject(newProject);
        setProjects((prev) => [...prev, project]);
        setSuccess('Project created successfully!');
      }
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save project.');
    }
  };

  const handleEdit = (project) => {
    setNewProject({
      title: project.title,
      year: project.year,
      industry: project.industry,
      services: project.services,
      timeline: project.timeline,
      content: project.content,
      mainImage: project.mainImage,
      assetLink: project.assetLink,
    });
    setEditProjectId(project.id);
    openModal();
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteProjectById(projectId);
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
      setSuccess('Project deleted successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete project.');
    }
  };

  return (
    <div className="project-management">
      <h2>Project Management</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <button onClick={openModal} className="create-button">
        Create New Project
      </button>

      <h3>Existing Projects</h3>
      <table className="projects-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
            <th>Industry</th>
            <th>Services</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.year}</td>
              <td>{project.industry}</td>
              <td>{project.services}</td>
              <td>
                <button
                  onClick={() => handleEdit(project)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Project Modal"
        className="project-modal"
        overlayClassName="project-modal-overlay"
      >
        <h2>{editProjectId ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={handleSubmit} className="project-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newProject.title}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={newProject.year}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={newProject.industry}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="services"
            placeholder="Services"
            value={newProject.services}
            onChange={handleChange}
            required
            className="form-input"
          />
          <input
            type="text"
            name="timeline"
            placeholder="Timeline"
            value={newProject.timeline}
            onChange={handleChange}
            required
            className="form-input"
          />

          {/* Quill Rich Text Editor */}
          <div className="editor-container">
            <ReactQuill
              value={newProject.content}
              onChange={handleContentChange}
              modules={ProjectManagement.modules}
              formats={ProjectManagement.formats}
            />
          </div>

          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop the main image here, or click to select one</p>
          </div>

          <input
            type="text"
            name="assetLink"
            placeholder="Asset Link"
            value={newProject.assetLink}
            onChange={handleChange}
            required
            className="form-input"
          />

          <div className="form-buttons">
            <button type="submit" className="submit-button">
              {editProjectId ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Quill modules and formats
ProjectManagement.modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
    ['clean'] // remove formatting button
  ],
};

ProjectManagement.formats = [
  'header', 'bold', 'italic', 'underline', 'link', 'image'
];

export default ProjectManagement;
