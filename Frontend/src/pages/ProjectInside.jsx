import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getAllProjects } from '../utils/api'; 

const ProjectInside = () => {
    const [projects, setProjects] = useState([]); // State to hold the project list
    const [loading, setLoading] = useState(true); // State to handle loading
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectData = await getAllProjects();
                console.log("Projects Data:", projectData); // Log the data to debug
                
                // Check if the response is an array or has a specific key
                if (Array.isArray(projectData)) {
                    setProjects(projectData);
                } else if (projectData.projects && Array.isArray(projectData.projects)) {
                    setProjects(projectData.projects);
                } else {
                    console.warn("Unexpected project data format:", projectData);
                    setProjects([]);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <>
                <div>Loading projects...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div>Error fetching projects: {error}</div>
            </>
        );
    }
    return (
        <>
            <Header />
            <div className="project-list">
                <h2>All Projects</h2>
                {projects.length === 0 ? (
                    <div>No projects available.</div>
                ) : (
                    <ul>
                        {projects.map((project) => (
                            <li key={project.id} className="project-item">
                                <h3>{project.title}</h3>
                                <p><strong>Year:</strong> {project.year}</p>
                                <p><strong>Industry:</strong> {project.industry}</p>
                                <p><strong>Services:</strong> {project.services}</p>
                                <p><strong>Timeline:</strong> {project.timeline}</p>
                                <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
                                {project.mainImage && (
                                    <img src={project.mainImage} alt={`${project.title} Main`} className="project-image" />
                                )}
                                {project.assetLink && (
                                    <p><a href={project.assetLink} target="_blank" rel="noopener noreferrer">View Assets</a></p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default ProjectInside;