import React, { useEffect, useState, useCallback } from 'react';
import { getAllPublicProjects } from '../utils/api';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import bgcard from "../assets/bg-card.png";
import { API_IMAGE_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import '../styles/project.css';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [featuredProject, setFeaturedProject] = useState(null);
    const [isOpenIndustries, setIsOpenIndustries] = useState(false);
    const [isOpenServices, setIsOpenServices] = useState(false);
    const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
    const [selectedService, setSelectedService] = useState('All Services');
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [industries, setIndustries] = useState([]);
    const [services, setServices] = useState([]);

    const getFullImageUrl = (imageName) => {
        if (!imageName) return '';
        if (imageName.startsWith('http')) return imageName;
        return `${API_IMAGE_BASE_URL}/project/${imageName}`;
    };

    const getUniqueIndustries = () => {
        const industries = projects.map(project => project.industry);
        return ['All Industries', ...new Set(industries)].filter(Boolean);
    };

    const getUniqueServices = () => {
        const services = projects.map(project => project.services);
        return ['All Services', ...new Set(services)].filter(Boolean);
    };

    const filterProjects = useCallback(() => {
        let filtered = [...projects];
        
        if (selectedIndustry !== 'All Industries') {
            filtered = filtered.filter(project => 
                project.industries.some(ind => ind.name === selectedIndustry)
            );
        }
        
        if (selectedService !== 'All Services') {
            filtered = filtered.filter(project => 
                project.services.some(serv => serv.name === selectedService)
            );
        }
        
        setFilteredProjects(filtered);
    }, [projects, selectedIndustry, selectedService]);

    const fetchPublicProjects = async () => {
        try {
            const projectData = await getAllPublicProjects();
            if (Array.isArray(projectData)) {
                setProjects(projectData);
                setFilteredProjects(projectData);
                if (projectData.length > 0) {
                    setFeaturedProject(projectData[0]);
                }
            } else {
                console.warn("Unexpected project data format:", projectData);
                setProjects([]);
                setFilteredProjects([]);
            }
        } catch (err) {
            console.error('Error fetching public projects:', err);
            setError(err);
        }
    };

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                await Promise.all([
                    fetchIndustries(),
                    fetchServices(),
                    fetchPublicProjects()
                ]);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    useEffect(() => {
        filterProjects();
    }, [selectedIndustry, selectedService, projects]);

    const toggleIndustriesDropdown = () => {
        setIsOpenIndustries(!isOpenIndustries);
        if (isOpenServices) {
            setIsOpenServices(false); // Close the Services dropdown if it's open
        }
    };

    const toggleServicesDropdown = () => {
        setIsOpenServices(!isOpenServices);
        if (isOpenIndustries) {
            setIsOpenIndustries(false); // Close the Industries dropdown if it's open
        }
    };

    const fetchIndustries = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/industries`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                setIndustries(['All Industries', ...data]);
            } catch (e) {
                console.error('Invalid JSON response:', text);
                throw new Error('Invalid JSON response from server');
            }
        } catch (error) {
            console.error('Error fetching industries:', error);
            setIndustries(['All Industries']); // Fallback to default
        }
    };

    const fetchServices = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/services`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const text = await response.text();
            try {
                const data = JSON.parse(text);
                setServices(['All Services', ...data]);
            } catch (e) {
                console.error('Invalid JSON response:', text);
                throw new Error('Invalid JSON response from server');
            }
        } catch (error) {
            console.error('Error fetching services:', error);
            setServices(['All Services']); // Fallback to default
        }
    };

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
            <section className='project-slider pt-[180px] pb-20 quantify-font'>
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
                                <h1 className='tracking-wider uppercase text-9xl font-medium text-[#fff] leading-[.9]'>
                                    Our <br /> Best <br /> Works
                                </h1>
                                <div className='category-info border-t-2 mt-[50px] pt-[40px]'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-6'>
                                            <div className='text-[56px] text-[#fff]'>{projects.length}+</div>
                                            <div className='uppercase text-2xl font-normal text-[#fff]'>
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
                                    <div className="dropdown relative mb-4" id='industriesToggleButton'>
                                        <div 
                                            className='uppercase text-[22px] text-[#fff] w-full text-left flex justify-between items-center cursor-pointer' 
                                            onClick={toggleIndustriesDropdown}
                                        >
                                            {selectedIndustry}
                                            <ChevronDownIcon className={`w-6 h-6 transition-transform ${isOpenIndustries ? 'rotate-180' : ''}`} />
                                        </div>
                                        {isOpenIndustries && (
                                            <ul>
                                                {industries.map((industry, index) => (
                                                    <li key={index}>
                                                        <button 
                                                            onClick={() => {
                                                                setSelectedIndustry(industry);
                                                                setIsOpenIndustries(false);
                                                            }}
                                                            className={`w-full text-[#fff] text-[17px] text-left hover:text-[#ec691f] ${
                                                                selectedIndustry === industry ? 'text-[#000]' : ''
                                                            }`}
                                                        >
                                                            {industry}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="dropdown relative" id='servicesToggleButton'>
                                        <div 
                                            className='uppercase text-[22px] text-[#fff] w-full text-left flex justify-between items-center cursor-pointer' 
                                            onClick={toggleServicesDropdown}
                                        >
                                            {selectedService}
                                            <ChevronDownIcon className={`w-6 h-6 transition-transform ${isOpenServices ? 'rotate-180' : ''}`} />
                                        </div>
                                        {isOpenServices && (
                                            <ul>
                                                {services.map((service, index) => (
                                                    <li key={index}>
                                                        <button 
                                                            onClick={() => {
                                                                setSelectedService(service);
                                                                setIsOpenServices(false);
                                                            }}
                                                            className={`w-full text-[#fff] text-[17px] text-left hover:text-[#ec691f] ${
                                                                selectedService === service ? 'text-[#ec691f]' : ''
                                                            }`}
                                                        >
                                                            {service}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <motion.div 
                                initial="initial"
                                whileHover="hovered"
                                transition="duration"
                                className="text-md text-[#fff] bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden flex items-center cursor-pointer justify-between">
                                    <motion.div variants={{initial: {y: 0}, hovered: {y: "-175%"}, duration: 0.5 }}>Contact Us </motion.div>
                                    <motion.div className='absolute inset-y-6 inset-x-5' variants={{initial: {y: "175%"}, hovered: {y: 0}, duration: 0.5}}>Contact Us</motion.div>
                                    <div className='border-[1px] w-[50px] h-[50px] rounded-full flex items-center justify-center'>
                                        <motion.svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-square-fill" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                        </motion.svg>                                        
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        <div className='col-span-2 mx-3'>
                            <motion.h1 className='text-5xl text-[#fff]'>
                                We've helped over {projects.length} firms reach their full potential, and we're happy to do the same for you!
                            </motion.h1>
                            <div className='grid grid-cols-2 pt-12 max-lg:grid-cols-1 gap-4'>
                                {filteredProjects.map((project) => (
                                    <div key={project.id} className='mx-3 max-lg:mb-3'>
                                        <Link to={`/project-inside/${encodeURIComponent(featuredProject.title)}`} className='block'>
                                            <div className='project-img overflow-hidden relative'>
                                                <img
                                                    className='duration-1000 hover:scale-110 w-full h-full object-cover'
                                                    src={getFullImageUrl(project.image)}
                                                    alt={project.title || 'Project Image'}
                                                />
                                            </div>
                                            <div className='py-[30px] grid gap-4'>
                                                <div className='uppercase text-lg text-[#fff]'>{project.industry}</div>
                                                <div className='text-3xl text-[#fff]'>{project.title}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='pagination justify-center flex text-center gap-6 items-center'>
                                <motion.a 
                                    whileHover={{ ease: "easeIn", duration: .3, backgroundColor: "#ec691f", borderColor: "#ec691f", color: "#fff" }}
                                    transition={{ ease: "easeOut", duration: .3 }}
                                    href="#" className='w-[50px] h-[50px] leading-[50px] text-[20px] border-[1px] border-[#000] rounded-full '>
                                        <span>&laquo;</span>
                                </motion.a>
                                <motion.a 
                                    whileHover={{ ease: "easeIn", duration: .3, backgroundColor: "#ec691f", borderColor: "#ec691f", color: "#fff" }}
                                    transition={{ ease: "easeOut", duration: .3 }}
                                    href="#" className='w-[50px] h-[50px] leading-[50px] text-[20px] border-[1px] border-[#000] rounded-full '>
                                        <span>1</span>
                                </motion.a>
                                <motion.a 
                                    whileHover={{ ease: "easeIn", duration: .3, backgroundColor: "#ec691f", borderColor: "#ec691f", color: "#fff" }}
                                    transition={{ ease: "easeOut", duration: .3 }}
                                    href="#" className='w-[50px] h-[50px] leading-[50px] text-[20px] border-[1px] border-[#000] rounded-full '>
                                        <span>&raquo;</span>
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Project;
