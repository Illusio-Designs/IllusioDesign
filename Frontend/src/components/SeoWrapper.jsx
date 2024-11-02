import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getPublicSeoByUrl } from '../utils/api'; // Ensure this import is correct

const SeoWrapper = ({ pageId }) => {
    const [seoData, setSeoData] = useState({
        page_title: 'Default Title',
        meta_description: 'Default description',
        focus_keyword: 'default, keywords',
        canonical_url: 'http://example.com/default-url',
        image_alt_tags: '',
    });

    useEffect(() => {
        const fetchSeoData = async () => {
            if (!pageId) {
                console.error('Page ID is required to fetch SEO data');
                return;
            }
            console.log(`Fetching SEO data for pageId: ${pageId}`);
            try {
                const response = await getPublicSeoByUrl(pageId); // Ensure pageId is passed correctly
                if (response) {
                    console.log('SEO data fetched successfully:', response);
                    setSeoData(response);
                } else {
                    console.warn('No SEO data found, using default values.');
                }
            } catch (error) {
                console.error('Error fetching SEO data:', error);
            }
        };

        fetchSeoData(); // Call the function to fetch SEO data
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
