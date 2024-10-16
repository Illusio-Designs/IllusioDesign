import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../utils/api'; 
import { color, motion, transform, useAnimation, useScroll } from 'framer-motion';
import Header from '../components/Header';
import bgcard from "../assets/bg-card.png";
import imgbgcard from "../assets/img-bg-card.png";


const Project = () => {

    // const [projects, setProjects] = useState([]); // State to hold the project list
    // const [loading, setLoading] = useState(true); // State to handle loading
    // const [error, setError] = useState(null); // State to handle errors

    // useEffect(() => {
    //     const fetchProjects = async () => {
    //         try {
    //             const projectData = await getAllProjects();
    //             console.log("Projects Data:", projectData); // Log the data to debug
                
    //             // Check if the response is an array or has a specific key
    //             if (Array.isArray(projectData)) {
    //                 setProjects(projectData);
    //             } else if (projectData.projects && Array.isArray(projectData.projects)) {
    //                 setProjects(projectData.projects);
    //             } else {
    //                 console.warn("Unexpected project data format:", projectData);
    //                 setProjects([]);
    //             }
    //         } catch (err) {
    //             console.error('Error fetching projects:', err);
    //             setError(err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchProjects();
    // }, []);

    // if (loading) {
    //     return (
    //         <>
    //             <div>Loading projects...</div>
    //         </>
    //     );
    // }

    // if (error) {
    //     return (
    //         <>
    //             <div>Error fetching projects: {error}</div>
    //         </>
    //     );
    // }

    return (
        <>
            <Header />
            <section className='project-slider py-20'>
                <div className='container m-auto'>
                    <div className='grid grid-cols-2 items-center max-lg:grid-cols-1'>
                        <div className='mx-3 max-lg:mb-3'>
                            <div className='pt-[90px] pb-[44px] px-12' style={{ backgroundImage: `url(${bgcard})`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat'}}>
                                <div className=''>
                                    <h1 className='tracking-wider uppercase text-9xl font-medium text-[#ec691f] quantify-font leading-[.9]'>Our <br/> Best <br/> Works</h1>
                                </div>
                                <div className='category-info border-t-2 mt-[50px] pt-[40px]'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-6'>
                                            <div className='quantify-font text-[56px]'>500+</div>
                                            <div className='uppercase text-2xl font-normal quantify-font'>Projects <br/>Done</div>
                                        </div>
                                        <a href='#' className='flex items-center all-cases-btn'>
                                            <div className='bg-[#ec691f] p-4 rounded-full arrow-1'>
                                                <svg width="16" height="16" fill="currentColor" class="bi bi-arrow-down stroke-[#fff]" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                                                </svg>
                                            </div>
                                            <motion.div 
                                                initial="initial"
                                                whileHover="hovered"
                                                transition="duration"
                                                className="text-md text-white bg-[#ec691f] rounded-full uppercase tracking-wider py-3 px-5 relative whitespace-nowrap overflow-hidden quantify-font">
                                                <motion.div variants={{initial: {y: 0}, hovered: {y: "-195%"}, duration: 0.5 }}>All Cases</motion.div>
                                                <motion.div className='absolute inset-y-3 inset-x-5' variants={{initial: {y: "195%"}, hovered: {y: 0}, duration: 0.5}}>All Cases</motion.div>
                                            </motion.div>
                                            <div className='bg-[#ec691f] p-4 rounded-full arrow-2'>
                                                <svg width="16" height="16" fill="currentColor" class="bi bi-arrow-down stroke-[#fff]" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                                                </svg>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-3'>
                            <a className='slider scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                <div className='project-img overflow-hidden relative'>
                                    <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                </div>
                                <div className='pt-[30px] pb-[70px] px-[50px] grid gap-4 bg-[#ec691f] text-white'>
                                    <div className='uppercase text-lg'>E-commerce</div>
                                    <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='project-post py-20'>
                <div className='container m-auto'>
                    <div className='grid grid-cols-3 max-lg:grid-cols-1'>
                        <div className='mx-3 max-lg:mb-3'>1</div>
                        <div className='mx-3 col-span-2'>                        
                            <motion.h1 className='quantify-font text-5xl'>
                                We've helped over 350 firms reach their full potential, and we're happy to do the same for you! Find out how our skills can contribute to your success.
                            </motion.h1>
                            <div className='grid grid-cols-2 max-lg:grid-cols-1 pt-12'>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                                <div className='mx-3 max-lg:mb-3'>
                                    <a className='scale-100' href='#' style={{ maskImage: `url(${imgbgcard})`, maskSize: '100% 100%', maskRepeat: 'no-repeat'}}>
                                        <div className='project-img overflow-hidden relative'>
                                            <img className='duration-1000 hover:scale-110 block' src='../src/assets/project1.webp' />
                                        </div>                                        
                                    </a>
                                    <div className='py-[30px] grid gap-4'>
                                        <div className='uppercase text-lg'>E-commerce</div>
                                        <div className='quantify-font text-3xl'>Raven.gg — the leading brand for custom esports clothing design</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* <div className="project-list">
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
            </div> */}
        </>
    );
};

export default Project;
