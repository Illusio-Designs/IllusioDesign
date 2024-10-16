// components/SeoWrapper.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const SeoWrapper = ({ pageId }) => {
    const [seoData, setSeoData] = useState({
        title: '',
        description: '',
        keywords: '',
        // Add other SEO fields as needed
    });

    useEffect(() => {
        const fetchSeoData = async () => {
            try {
                const response = await fetch(`/api/seo/${pageId}`); // Adjust the API endpoint as necessary
                const data = await response.json();
                setSeoData(data);
            } catch (error) {
                console.error('Error fetching SEO data:', error);
            }
        };

        fetchSeoData();
    }, [pageId]);

    return (
        <Helmet>
            <title>{seoData.title || 'Default Title'}</title>
            <meta name="description" content={seoData.description || 'Default description'} />
            <meta name="keywords" content={seoData.keywords || 'default, keywords'} />
            <meta name="cronicalurl" content={seoData.cronicalurl || 'default, cronicalurl'} />
            {/* Add other meta tags as needed */}
        </Helmet>
    );
};

export default SeoWrapper;

