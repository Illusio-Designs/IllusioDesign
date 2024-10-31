// src/constants/defaultSeoData.js

// This array contains default SEO data for different pages of the website.
// Each object in the array represents SEO data for a specific page.
const defaultSeoData = [
  {
    page_url: '/', // The URL path for the home page
    page_title: 'Home Page', // The title to be displayed in search results
    meta_description: 'Welcome to our website!', // The meta description for search engines
    focus_keyword: 'home, welcome', // Keywords to optimize for
    canonical_url: 'http://example.com/', // The canonical URL for the page
    image_alt_tags: 'default image for home page', // Alt text for images
  },
  // Uncomment and add more entries for other pages as needed
  // {
  //   page_url: '/about', // The URL path for the about page
  //   page_title: 'About Us', // The title to be displayed in search results
  //   meta_description: 'Learn more about us.', // The meta description for search engines
  //   focus_keyword: 'about, company', // Keywords to optimize for
  //   canonical_url: 'http://example.com/about', // The canonical URL for the page
  //   image_alt_tags: 'default image for about page', // Alt text for images
  // },
  {
    page_url: '/services', // The URL path for the services page
    page_title: 'Our Services', // The title to be displayed in search results
    meta_description: 'Explore the services we offer.', // The meta description for search engines
    focus_keyword: 'services, offerings', // Keywords to optimize for
    canonical_url: 'http://example.com/services', // The canonical URL for the page
    image_alt_tags: 'default image for services page', // Alt text for images
  },
  {
    page_url: '/contactus', // The URL path for the contact page
    page_title: 'Contact Us', // The title to be displayed in search results
    meta_description: 'Get in touch with us.', // The meta description for search engines
    focus_keyword: 'contact, reach us', // Keywords to optimize for
    canonical_url: 'http://example.com/contact', // The canonical URL for the page
    image_alt_tags: 'default image for contact page', // Alt text for images
  },
  // Add more entries for other pages as needed
];

// Export the default SEO data array using CommonJS syntax
module.exports = defaultSeoData;
