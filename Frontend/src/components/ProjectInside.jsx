import React, { useEffect, useState } from 'react';
import Header from './Header';
import { getProjectByTitle } from '../utils/api';
import { useParams } from 'react-router-dom';
import { API_IMAGE_BASE_URL } from '../config';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet'; // Import Helmet

const ProjectInside = () => {
    const { title } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName;
        return `${API_IMAGE_BASE_URL}/project/${imageName}`;
    };

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectByTitle(title);
                console.log("Fetched project data:", projectData);
                setProject(projectData);
            } catch (error) {
                console.error('Error fetching project by title:', error);
                setError(error.message || 'Failed to fetch project by title');
            } finally {
                setLoading(false);
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
            <Helmet>
                <title>{project.title}</title>
                <meta name="description" content={project.meta_description || 'Default project description'} />
                <meta name="keywords" content={project.meta_keywords || 'Default keywords'} />
                <link rel="canonical" href={project.canonical_url || `https://yourdomain.com/${project.slug}`} />
                <meta property="og:title" content={project.title} />
                <meta property="og:description" content={project.meta_description} />
                <meta property="og:url" content={`https://yourdomain.com/${project.slug}`} />
                <meta property="og:image" content={getFullImageUrl(project.image)} />
                <meta property="og:image:alt" content={project.image_alt_text || 'Project Image'} />
            </Helmet>

            <Header />
            <div className="container mx-auto py-10">
                <img
                    className='duration-1000 hover:scale-110 block w-full h-full object-cover'
                    src={getFullImageUrl(project.image)}
                    alt={project.title || 'Project Image'}
                />
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
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
