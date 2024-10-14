import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getProjectByTitle } from '../utils/api';

const ProjectInside = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProjectByTitle('example-title'); // Replace 'example-title' with the actual title
                setProject(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Header />
            <div>
                <h1>{project.title}</h1>
                <p>{project.content}</p>
            </div>
        </>
    );
};

export default ProjectInside;