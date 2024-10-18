import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  getAllProjects,
  createProject,
  updateProjectById,
  deleteProjectById,
  uploadImage,
} from '../utils/projectApi';
import { useDropzone } from 'react-dropzone';
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

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      const imageUrl = await uploadImage(file); // Use the uploadImage function
      setNewProject((prev) => ({ ...prev, mainImage: imageUrl }));
      setSuccess('Image uploaded successfully!');
    } catch (error) {
      console.error(error);
      setError('Failed to upload image.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Debugging: Log the project data before submission
    console.log('Project data before submission:', newProject);

    // Validate that all required fields are filled
    const isValid =
      newProject.title &&
      newProject.year &&
      newProject.industry &&
      newProject.services &&
      newProject.timeline &&
      newProject.content &&
      newProject.mainImage; // Add any other validations if necessary

    if (!isValid) {
      setError('All fields are required.');
      return;
    }

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
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal">
        <h2>{editProjectId ? 'Edit Project' : 'Create New Project'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newProject.title}
            onChange={handleChange}
            placeholder="Project Title"
            required
          />
          <input
            type="text"
            name="year"
            value={newProject.year}
            onChange={handleChange}
            placeholder="Year"
            required
          />
          <input
            type="text"
            name="industry"
            value={newProject.industry}
            onChange={handleChange}
            placeholder="Industry"
            required
          />
          <input
            type="text"
            name="services"
            value={newProject.services}
            onChange={handleChange}
            placeholder="Services"
            required
          />
          <input
            type="text"
            name="timeline"
            value={newProject.timeline}
            onChange={handleChange}
            placeholder="Timeline"
            required
          />
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag 'n' drop main image here, or click to select</p>
            {newProject.mainImage && <img src={newProject.mainImage} alt="Uploaded" />}
          </div>
          <ReactQuill value={newProject.content} onChange={handleContentChange} />
          <input
            type="text"
            name="assetLink"
            value={newProject.assetLink}
            onChange={handleChange}
            placeholder="Asset Link"
          />
          <button type="submit" className="submit-button">
            {editProjectId ? 'Update Project' : 'Create Project'}
          </button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProjectManagement;
