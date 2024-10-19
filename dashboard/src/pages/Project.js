import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getAllProjects, createProject, updateProjectById, deleteProjectById } from '../utils/projectApi';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Project.css';

Modal.setAppElement('#root');

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [projectData, setProjectData] = useState({
        title: '',
        year: '',
        industry: '',
        services: '',
        timeline: '',
        content: '',
        url: '',
        image: null,
    });
    const [isEdit, setIsEdit] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (err) {
            console.error('Error while fetching projects:', err);
            setError(err);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
        setProjectData({
            title: '',
            year: '',
            industry: '',
            services: '',
            timeline: '',
            content: '',
            url: '',
            image: null,
        });
        setIsEdit(false);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prev) => ({ ...prev, [name]: value }));
    };

    const handleContentChange = (value) => {
        setProjectData((prev) => ({ ...prev, content: value }));
    };

    const handleFileChange = (file) => {
        setProjectData((prev) => ({ ...prev, image: file[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateProjectById(editProjectId, projectData);
            } else {
                await createProject(projectData);
            }
            await fetchProjects(); // Refetch projects after create/update
            handleCloseModal();
        } catch (err) {
            console.error('Error while submitting project:', err);
            setError(err);
        }
    };

    const handleEdit = (project) => {
        setProjectData({
            title: project.title,
            year: project.year,
            industry: project.industry,
            services: project.services,
            timeline: project.timeline,
            content: project.content,
            url: project.url,
            image: null,
        });
        setEditProjectId(project.id);
        setIsEdit(true);
        handleOpenModal();
    };

    const handleDelete = async (projectId) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProjectById(projectId);
                await fetchProjects(); // Refetch projects after delete
            } catch (err) {
                console.error('Error while deleting project:', err);
                setError(err);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileChange,
        accept: { 'image/*': [] },
    });

    return (
        <div className="project-management">
            <h1>Project Management</h1>
            {error && <p className="error">{error}</p>}
            <button onClick={handleOpenModal}>Add Project</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.title}</td>
                            <td>{project.year}</td>
                            <td>
                                <button onClick={() => handleEdit(project)}>Edit</button>
                                <button onClick={() => handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalOpen} onRequestClose={handleCloseModal}>
                <h2>{isEdit ? 'Edit Project' : 'Add Project'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={projectData.title}
                        onChange={handleChange}
                        placeholder="Project Title"
                        required
                    />
                    <input
                        type="text"
                        name="year"
                        value={projectData.year}
                        onChange={handleChange}
                        placeholder="Year"
                        required
                    />
                    <input
                        type="text"
                        name="industry"
                        value={projectData.industry}
                        onChange={handleChange}
                        placeholder="Industry"
                        required
                    />
                    <input
                        type="text"
                        name="services"
                        value={projectData.services}
                        onChange={handleChange}
                        placeholder="Services"
                    />
                    <input
                        type="text"
                        name="timeline"
                        value={projectData.timeline}
                        onChange={handleChange}
                        placeholder="Timeline"
                    />
                    <ReactQuill
                        value={projectData.content}
                        onChange={handleContentChange}
                        placeholder="Project Description"
                    />
                    <input
                        type="url"
                        name="url"
                        value={projectData.url}
                        onChange={handleChange}
                        placeholder="Project URL"
                    />
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <button type="submit">{isEdit ? 'Update Project' : 'Create Project'}</button>
                    <button type="button" onClick={handleCloseModal}>Cancel</button>
                </form>
            </Modal>
        </div>
    );
};

export default ProjectManagement;
