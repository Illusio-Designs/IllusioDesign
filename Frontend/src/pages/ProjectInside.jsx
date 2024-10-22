import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProjectByTitle } from '../utils/api'; // Import getProjectByTitle function
import { useParams } from 'react-router-dom'; // Import useParams to get the title from the URL
import { API_IMAGE_BASE_URL } from '../config';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitizing HTML

const ProjectInside = () => {
    const { title } = useParams(); // Get the title from the URL
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName; // Return if it's already a full URL

        return `${API_IMAGE_BASE_URL}/project/${imageName}`; // Construct the full URL for the image
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectByTitle(title); // Fetch project by title
                console.log("Fetched project data:", projectData); // Log the project data
                setProject(projectData); // Set the project data
            } catch (error) {
                console.error('Error fetching project by title:', error);
                setError(error.message || 'Failed to fetch project by title'); // Set error message if any
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchProject();
    }, [title]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading project...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="container mx-auto py-10">
                <img
                className='duration-1000 hover:scale-110 block w-full h-full object-cover'
                src={getFullImageUrl(project.image)}
                alt={project.title || 'Project Image'}
                />
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                {/* Use DOMPurify to sanitize the content before rendering */}
                <div className="mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.content) }} />
                
                
                <div className="text-lg">
                    <strong>Year:</strong> {project.year || 'Not available'}
                </div>
                <div className="text-lg">
                    <strong>Timeline:</strong> {project.timeline || 'Not available'}
                </div>
                <div className="text-lg">
                    <strong>Services:</strong> {project.services ? project.services.split(',').join(', ') : 'Not available'}
                </div>
                <div className="text-lg">
                    <strong>Industry:</strong> {project.industry ? project.industry.split(',').join(', ') : 'Not available'}
                </div>
                <div className="text-lg">
                    <strong>Website:</strong> {project.website ? <a href={project.website} target="_blank" rel="noopener noreferrer">Visit Website</a> : 'Not available'}
                </div>
            </div>
        </>
    );
};

export default ProjectInside;
