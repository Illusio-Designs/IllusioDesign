import React, { useEffect, useState } from 'react';
import { getAllPublicProjects } from '../utils/api';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bgcard from "../assets/bg-card.png";
import { API_IMAGE_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import '../styles/project.css';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [featuredProject, setFeaturedProject] = useState(null);

    // Helper function to construct full image URL
    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName;
        return `${API_IMAGE_BASE_URL}/project/${imageName}`;
    };

    useEffect(() => {
        const fetchPublicProjects = async () => {
            try {
                const projectData = await getAllPublicProjects();
                if (Array.isArray(projectData)) {
                    setProjects(projectData);
                    if (projectData.length > 0) {
                        setFeaturedProject(projectData[0]);
                    }
                } else {
                    console.warn("Unexpected project data format:", projectData);
                    setProjects([]);
                }
            } catch (err) {
                console.error('Error fetching public projects:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPublicProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading public projects...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl">Error fetching public projects: {error.message || error.toString()}</div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <section className='project-slider py-20'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-2 items-center max-lg:grid-cols-1'>
                        <div className='mx-3 max-lg:mb-3'>
                            <div 
                                className='pt-[90px] pb-[44px] px-12' 
                                style={{ 
                                    backgroundImage: `url(${bgcard})`, 
                                    backgroundSize: '100% 100%', 
                                    backgroundRepeat: 'no-repeat' 
                                }}
                            >
                                <h1 className='tracking-wider uppercase text-9xl font-medium text-[#ec691f] leading-[.9]'>
                                    Our <br /> Best <br /> Works
                                </h1>
                                <div className='category-info border-t-2 mt-[50px] pt-[40px]'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-6'>
                                            <div className='text-[56px]'>{projects.length}+</div>
                                            <div className='uppercase text-2xl font-normal'>
                                                Projects <br /> Done
                                            </div>
                                        </div>
                                        <a href='#' className='flex items-center'>
                                            <div className='bg-[#ec691f] p-4 rounded-full'>
                                                <svg width="16" height="16" fill="currentColor" className="text-white" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                                </svg>
                                            </div>
                                            <motion.div
                                                initial="initial"
                                                whileHover="hovered"
                                                transition={{ duration: 0.3 }}
                                                className="text-md text-white bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5"
                                            >
                                                <motion.div variants={{ initial: { y: 0 }, hovered: { y: "-195%" } }}>All Cases</motion.div>
                                                <motion.div className='absolute inset-y-3 inset-x-5' variants={{ initial: { y: "195%" }, hovered: { y: 0 } }}>All Cases</motion.div>
                                            </motion.div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {featuredProject && (
                            <div className='mx-3'>
                                <Link 
                                    to={`/project-inside/${encodeURIComponent(featuredProject.title)}`} 
                                    className='slider'
                                >
                                    <div className='project-img overflow-hidden relative max-h-[475px]'>
                                        <img 
                                            className='duration-1000 hover:scale-110 w-full h-full object-cover' 
                                            src={getFullImageUrl(featuredProject.image)} 
                                            alt={featuredProject.title}
                                        />
                                    </div>
                                    <div className='pt-[30px] pb-[70px] px-[50px] bg-[#ec691f] text-white'>
                                        <div className='uppercase text-lg'>{featuredProject.industry}</div>
                                        <div className='text-3xl'>{featuredProject.title}</div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className='project-post py-20'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-3 max-lg:grid-cols-1'>
                        <div className='mx-3 max-lg:mb-3'>
                            <div className='sticky top-8 border-[#ec691f] border-2 rounded-lg p-8'>
                                <form>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="w-full px-4 py-2 text-left bg-white border rounded-md focus:outline-none"
                                        >
                                            Industries
                                        </button>
                                        <ul className="absolute left-0 w-full mt-2 bg-white border rounded-md shadow-lg">
                                            <li className="px-4 py-2 hover:bg-gray-200">Action</li>
                                            <li className="px-4 py-2 hover:bg-gray-200">Another action</li>
                                            <li className="px-4 py-2 hover:bg-gray-200">Something else here</li>
                                        </ul>
                                    </div>
                                    <select className='form-select w-full mt-4' id="cars" name="cars">
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className='mx-3 col-span-2'>
                            <motion.h1 className='text-5xl'>
                                We've helped over {projects.length} firms reach their full potential, and we're happy to do the same for you!
                            </motion.h1>
                            <div className='grid grid-cols-2 pt-12 max-lg:grid-cols-1'>
                                {projects.map((project) => (
                                    <div key={project.id} className='mx-3 max-lg:mb-3'>
                                        <Link to={`/project-inside/${encodeURIComponent(project.title)}`} className='block'>
                                            <div className='project-img overflow-hidden relative'>
                                                <img
                                                    className='duration-1000 hover:scale-110 w-full h-full object-cover'
                                                    src={getFullImageUrl(project.image)}
                                                    alt={project.title || 'Project Image'}
                                                />
                                            </div>
                                            <div className='py-[30px]'>
                                                <div className='uppercase text-lg'>{project.industry}</div>
                                                <div className='text-3xl'>{project.title}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Project;
