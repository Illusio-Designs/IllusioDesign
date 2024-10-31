import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const SeoWrapper = ({ pageId }) => {
    const [seoData, setSeoData] = useState({
        page_title: 'Default Title',       // Default Title
        meta_description: 'Default description', // Default description
        focus_keyword: 'default, keywords',    // Default keywords
        canonical_url: 'http://example.com/default-url',    // Default canonical URL
        image_alt_tags: '',   // Default image alt tags
    });

    useEffect(() => {
        const fetchSeoData = async () => {
            try {
                const response = await fetch(`/api/seo/${pageId}`); // Adjust the API endpoint as necessary
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSeoData(data);
            } catch (error) {
                console.error('Error fetching SEO data:', error);
                // If fetching fails, default values are already set in state
            }
        };

        fetchSeoData();
    }, [pageId]);

    return (
        <Helmet>
            <title>{seoData.page_title}</title>
            <meta name="description" content={seoData.meta_description} />
            <meta name="keywords" content={seoData.focus_keyword} />
            <link rel="canonical" href={seoData.canonical_url} />
            <meta name="image" content={seoData.image_alt_tags} />
            {/* Add other meta tags as needed */}
        </Helmet>
    );
};

export default SeoWrapper;
