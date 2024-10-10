import React, { useEffect, useState } from 'react';
import { getAllProjects, createProject, updateProjectById, deleteProjectById } from '../utils/projectApi';
import Modal from 'react-modal'; // Assuming you're using 'react-modal', install it using `npm install react-modal`

Modal.setAppElement('#root'); // Required for accessibility

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        year: '',
        industry: '',
        services: '',
        timeline: '',
        content: '',
        mainImage: '',
        secondImage: '',
        assetLink: '',
    });
    const [editProjectId, setEditProjectId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to control modal visibility
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch all projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getAllProjects();
                setProjects(data);
            } catch (err) {
                setError(err);
            }
        };

        fetchProjects();
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditProjectId(null); // Reset edit mode when closing
        setNewProject({ // Reset the form
            title: '',
            year: '',
            industry: '',
            services: '',
            timeline: '',
            content: '',
            mainImage: '',
            secondImage: '',
            assetLink: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            if (editProjectId) {
                // Update the existing project if in edit mode
                const updatedProject = await updateProjectById(editProjectId, newProject);
                setProjects((prev) => prev.map((project) => project.id === editProjectId ? updatedProject : project));
                setSuccess('Project updated successfully!');
            } else {
                // Create a new project
                const createdProject = await createProject(newProject);
                setProjects((prev) => [...prev, createdProject]); // Add the new project to the list
                setSuccess('Project created successfully!');
            }
            closeModal(); // Close modal after success
        } catch (err) {
            setError(err);
        }
    };

    const handleEdit = (project) => {
        setNewProject(project); // Fill the form with the project data to edit
        setEditProjectId(project.id); // Set the edit mode with project ID
        openModal(); // Open modal to edit
    };

    const handleDelete = async (projectId) => {
        try {
            await deleteProjectById(projectId);
            setProjects((prev) => prev.filter((project) => project.id !== projectId)); // Remove the deleted project from the list
            setSuccess('Project deleted successfully!');
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h2>Project Management</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button onClick={openModal}>Create New Project</button>

            <h3>Existing Projects</h3>
            <table>
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

            {/* Modal for Creating/Editing Project */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Project Modal">
                <h2>{editProjectId ? 'Edit Project' : 'Create New Project'}</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" value={newProject.title} onChange={handleChange} required />
                    <input type="number" name="year" placeholder="Year" value={newProject.year} onChange={handleChange} required />
                    <input type="text" name="industry" placeholder="Industry" value={newProject.industry} onChange={handleChange} required />
                    <input type="text" name="services" placeholder="Services" value={newProject.services} onChange={handleChange} required />
                    <input type="text" name="timeline" placeholder="Timeline" value={newProject.timeline} onChange={handleChange} required />
                    <textarea name="content" placeholder="Content" value={newProject.content} onChange={handleChange} required />
                    <input type="text" name="mainImage" placeholder="Main Image URL" value={newProject.mainImage} onChange={handleChange} required />
                    <input type="text" name="secondImage" placeholder="Second Image URL" value={newProject.secondImage} onChange={handleChange} />
                    <input type="text" name="assetLink" placeholder="Asset Link" value={newProject.assetLink} onChange={handleChange} />
                    <button type="submit">{editProjectId ? 'Update Project' : 'Create Project'}</button>
                    <button type="button" onClick={closeModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectManagement;
