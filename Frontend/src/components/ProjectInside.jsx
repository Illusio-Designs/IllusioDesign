import React, { useEffect, useState } from 'react';
import Header from './Header';
import { getProjectByTitle } from '../utils/api';
import { useParams } from 'react-router-dom';
import { API_IMAGE_BASE_URL } from '../config';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet'; // Import Helmet
import '../styles/project.css';
import Footer from './Footer';
import { transform } from 'framer-motion';

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
            <div className='block'>
                <section className="project-postdetails pt-[170px] pb-[50px] w-full relative flex overflow-hidden flex-row justify-center rounded-b-[2.5rem] min-h-[44.5rem]" style={{transform: "translate(0)"}}>
                    <div className='container mx-auto z-[9] flex flex-col justify-center'>
                        <ul className='pt-[50px]'>
                            <li>
                                <a href="/project" className='text-[#fff]'>All Projects</a>
                            </li>
                            <li></li>
                        </ul>
                        <h1 className="text-5xl font-bold mb-4 quantify-font text-[#fff] py-[120px]">{project.title}</h1>
                        <div className='flex items-center justify-between border-t-[1px] pt-5'>
                            <h5 className='text-[#fff] font-medium text-2xl quantify-font'>{project.year || 'Not available'}</h5>
                            <a href='#about-us' className='text-[#fff] font-medium text-2xl quantify-font flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className ="bi bi-arrow-down-circle me-2" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"/>
                                </svg>
                                Scroll
                            </a>
                        </div>
                    </div>
                    <div className='project-img absolute w-full h-full inset-0 z-[-1] '>
                        <img
                            className='block w-full h-full object-cover inset-0'
                            src={getFullImageUrl(project.image)}
                            alt={project.title || 'Project Image'}
                        />                    
                    </div>
                </section>
                <section className='container mx-auto py-20'>
                    <div className='project-content pt-10'>
                        <div className='grid grid-cols-3 max-lg:grid-cols-1'>
                            <div className='col-span-2 mx-3'>
                                <h1 className="text-3xl font-bold mb-4 quantify-font text-[#fff]">{project.title}</h1>
                                <div className="mb-6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.content) }} />
                            </div>
                            <div className='mx-3 max-lg:mb-3'>
                                <div className='sticky top-8 text-right text-[#fff]'>
                                    <div className="year mb-3">
                                        <strong className='quantify-font text-xl'>Year:</strong><br></br> <p>{project.year || 'Not available'}</p>
                                    </div>
                                    <div className='timeline mb-3'>
                                        <strong className='quantify-font text-xl'>Timeline:</strong> <p>{project.timeline || 'Not available'}</p>
                                    </div>
                                    <div className='services mb-3'>
                                        <strong className='quantify-font text-xl'>Services:</strong> <p>{project.services ? project.services.split(',').join(', ') : 'Not available'}</p>
                                    </div>
                                    <div className='industry mb-3'>
                                        <strong className='quantify-font text-xl'>Industry:</strong> <p>{project.industry ? project.industry.split(',').join(', ') : 'Not available'}</p>
                                    </div>
                                    <div className='website mb-3'>
                                        <strong className='quantify-font text-xl'>Website:</strong> <p>{project.website ? <a href={project.website} target="_blank" rel="noopener noreferrer">Visit Website</a> : 'Not available'}</p>
                                    </div>
                                </div>                            
                            </div>                        
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ProjectInside;
