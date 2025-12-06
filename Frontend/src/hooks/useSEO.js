'use client';

import { useEffect } from 'react';
import { seoAPI } from '@/services/api';

/**
 * Custom hook to fetch and apply SEO metadata for a page
 * @param {string} pageName - The page identifier (e.g., 'home', 'about', 'contact')
 */
export const useSEO = (pageName) => {
  useEffect(() => {
    if (!pageName) return;

    const applySEO = async () => {
      try {
        const response = await seoAPI.getByPagePublic(pageName);
        const seoData = response.data;

        if (seoData) {
          // Debug: Log SEO data (only in development)
          if (process.env.NODE_ENV === 'development') {
            console.log(`✅ SEO loaded for page: ${pageName}`, seoData);
          }
          
          // Update document title
          if (seoData.title) {
            document.title = seoData.title;
          }

          // Update meta description
          let metaDescription = document.querySelector('meta[name="description"]');
          if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
          }
          if (seoData.description) {
            metaDescription.setAttribute('content', seoData.description);
          }

          // Update meta keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (seoData.keywords) {
            if (!metaKeywords) {
              metaKeywords = document.createElement('meta');
              metaKeywords.setAttribute('name', 'keywords');
              document.head.appendChild(metaKeywords);
            }
            metaKeywords.setAttribute('content', seoData.keywords);
          }

          // Update Open Graph tags
          const ogTags = {
            'og:title': seoData.ogTitle || seoData.title,
            'og:description': seoData.ogDescription || seoData.description,
            'og:image': seoData.ogImage ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://api.illusiodesigns.agency'}${seoData.ogImage}` : null,
            'og:type': 'website',
            'og:url': typeof window !== 'undefined' ? window.location.href : null
          };

          Object.entries(ogTags).forEach(([property, content]) => {
            if (content) {
              let ogTag = document.querySelector(`meta[property="${property}"]`);
              if (!ogTag) {
                ogTag = document.createElement('meta');
                ogTag.setAttribute('property', property);
                document.head.appendChild(ogTag);
              }
              ogTag.setAttribute('content', content);
            }
          });

          // Update Twitter Card tags
          if (seoData.ogTitle || seoData.title) {
            let twitterCard = document.querySelector('meta[name="twitter:card"]');
            if (!twitterCard) {
              twitterCard = document.createElement('meta');
              twitterCard.setAttribute('name', 'twitter:card');
              twitterCard.setAttribute('content', 'summary_large_image');
              document.head.appendChild(twitterCard);
            }

            let twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (!twitterTitle) {
              twitterTitle = document.createElement('meta');
              twitterTitle.setAttribute('name', 'twitter:title');
              document.head.appendChild(twitterTitle);
            }
            twitterTitle.setAttribute('content', seoData.ogTitle || seoData.title);

            if (seoData.ogDescription || seoData.description) {
              let twitterDescription = document.querySelector('meta[name="twitter:description"]');
              if (!twitterDescription) {
                twitterDescription = document.createElement('meta');
                twitterDescription.setAttribute('name', 'twitter:description');
                document.head.appendChild(twitterDescription);
              }
              twitterDescription.setAttribute('content', seoData.ogDescription || seoData.description);
            }

            if (seoData.ogImage) {
              let twitterImage = document.querySelector('meta[name="twitter:image"]');
              if (!twitterImage) {
                twitterImage = document.createElement('meta');
                twitterImage.setAttribute('name', 'twitter:image');
                document.head.appendChild(twitterImage);
              }
              twitterImage.setAttribute('content', `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'https://api.illusiodesigns.agency'}${seoData.ogImage}`);
            }
          }
        }
      } catch (error) {
        // Log error if SEO data is not found
        console.warn(`⚠️ SEO data not found for page: ${pageName}`);
        if (process.env.NODE_ENV === 'development') {
          console.warn('Error details:', error);
        }
      }
    };

    applySEO();
  }, [pageName]);
};

