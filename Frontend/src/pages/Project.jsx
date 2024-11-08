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
    const [isOpen, setIsOpen] = useState(false);

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

    function toggleDownfunction() {
        let dropdown = document.querySelector('#industriesToggleButton #industriesDropdown');
        dropdown.classList.toggle("hidden");
    }
    function toggleDownfunction() {
        let dropdown = document.querySelector('#servicesToggleButton #servicesDropdown');
        dropdown.classList.toggle("hidden");
    }


    return (
        <>
            <Header />
            <section className='project-slider py-20 quantify-font'>
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
                                        <a href='#' className='flex items-center all-cases-btn'>
                                            <div className='bg-[#ec691f] p-4 rounded-full arrow-1'>
                                                <svg width="16" height="16" fill="currentColor" className="bi bi-arrow-down stroke-[#fff]" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                                </svg>
                                            </div>
                                            <motion.div
                                                initial="initial"
                                                whileHover="hovered"
                                                transition={{ duration: 0.3 }}
                                                className="text-md text-white bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden"
                                            >
                                                <motion.div variants={{ initial: { y: 0 }, hovered: { y: "-195%" } }}>All Cases</motion.div>
                                                <motion.div className='absolute inset-y-3 inset-x-5' variants={{ initial: { y: "195%" }, hovered: { y: 0 } }}>All Cases</motion.div>
                                            </motion.div>
                                            <div className='bg-[#ec691f] p-4 rounded-full arrow-2'>
                                                <svg width="16" height="16" fill="currentColor" className="bi bi-arrow-down stroke-[#fff]" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1" />
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {featuredProject && (
                            <div className='mx-3 grid h-full'>
                                <Link 
                                    to={`/project-inside/${encodeURIComponent(featuredProject.title)}`} 
                                    className='slider scale-100 grid'
                                >
                                    <div className='project-img overflow-hidden relative max-h-[475px]'>
                                        <img 
                                            className='duration-1000 hover:scale-110 block w-full h-full object-cover' 
                                            src={getFullImageUrl(featuredProject.image)} 
                                            alt={featuredProject.title}
                                        />
                                    </div>
                                    <div className='pt-[30px] pb-[70px] px-[50px] bg-[#ec691f] text-white grid gap-4'>
                                        <div className='uppercase text-lg'>{featuredProject.industry}</div>
                                        <div className='text-3xl'>{featuredProject.title}</div>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className='project-post py-20 quantify-font'>
                <div className='container mx-auto'>
                    <div className='grid grid-cols-3 max-lg:grid-cols-1'>
                        <div className='mx-3 max-lg:mb-3'>
                            <div className='sticky top-8 me-12'>
                                <div className='border-[#ec691f] border-2 rounded-lg p-8 mb-8'>
                                    <form className='grid gap-4'>                                    
                                        <div className="dropdown relative" id='industriesToggleButton'>
                                            <div className='uppercase text-[22px] w-full text-left flex justify-between items-center mb-4 cursor-pointer' onClick={() => setIsOpen((prev) => !prev) }>Industries 
                                                {!isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                                </svg>) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                                                </svg>)
                                                }
                                            </div>
                                            {isOpen &&
                                                <ul className='re top-[50px]' id='industriesDropdown'>
                                                    <li className='mb-2'>
                                                        <a href='#'>All Industries</a>
                                                    </li>
                                                    <li className='mb-2'>
                                                        <a href='#'>{featuredProject.industry}</a>
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                    </form>
                                    <form>
                                        <div className="dropdown relative" id='servicesToggleButton'>
                                            <div className='uppercase text-[22px] w-full text-left flex justify-between items-center cursor-pointer' onClick={() => setIsOpen((prev) => !prev) }>Services 
                                                {!isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                                </svg>) :
                                                (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"/>
                                                </svg>)
                                                }
                                            </div>
                                            {isOpen &&
                                                <ul className='re top-[50px]' id='servicesDropdown'>
                                                    <li className='mb-2'>
                                                        <a href='#'>All Services</a>
                                                    </li>
                                                    <li className='mb-2'>
                                                        <a href='#'>{featuredProject.services}</a>
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                    </form>
                                </div>
                                <motion.div 
                                    initial="initial"
                                    whileHover="hovered"
                                    transition={{ duration: 0.3 }}
                                    className='flex justify-between items-center text-white bg-[#ec691f] relative rounded-full uppercase tracking-wider py-3 px-5 cursor-pointer'>
                                    <div                                        
                                        className="text-md whitespace-nowrap overflow-hidden"
                                    >
                                        <motion.div variants={{ initial: { y: 0 }, hovered: { y: "-185%" } }}>Have a Project?</motion.div>
                                        <motion.div className='absolute inset-y-6 inset-x-5' variants={{ initial: { y: "185%" }, hovered: { y: 0 } }}>Let's Connect</motion.div>
                                    </div>
                                    <div className='whitespace-nowrap w-[45px] h-[45px] grid justify-center content-center overflow-hidden bg-white rounded-[100%]'>
                                        <motion.div className='text-black' variants={{initial: {x: 0}, hovered: {x: "120%"}}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-dots-fill" viewBox="0 0 16 16">
                                                <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                            </svg>
                                        </motion.div>
                                        <motion.div className='text-black inset-y-3 inset-y-5' variants={{initial: {x: "-120%"}, hovered: {x: 0}}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-dots-fill" viewBox="0 0 16 16">
                                                <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 1 0-2 1 1 0 0 1 0 2"/>
                                            </svg>
                                        </motion.div>
                                    </div>
                                </motion.div>
                                
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
                                            <div className='py-[30px] grid gap-4'>
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
