import React, { useEffect, useState } from 'react';
import { getAllProjects, createProject, updateProjectById, deleteProjectById } from '../utils/projectApi'; // Adjust the import path as necessary

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
    const [editProjectId, setEditProjectId] = useState(null); // State to hold project ID for editing
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
            setEditProjectId(null); // Exit edit mode
        } catch (err) {
            setError(err);
        }
    };

    const handleEdit = (project) => {
        setNewProject(project); // Fill the form with the project data to edit
        setEditProjectId(project.id); // Set the edit mode with project ID
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
            </form>

            <h3>Existing Projects</h3>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h4>{project.title} ({project.year})</h4>
                        <p>{project.industry} - {project.services}</p>
                        <button onClick={() => handleEdit(project)}>Edit</button>
                        <button onClick={() => handleDelete(project.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectManagement;
