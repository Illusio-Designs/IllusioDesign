const SeoModel = require('../../models/seo'); // Adjust the import based on your project structure
const defaultSeoData = require('../../constants/defaultSeoData'); // Adjust the path to where you saved defaultSeoData.js

// Initialize default SEO data
exports.initializeDefaultSeo = async (req, res) => {
  try {
    console.log('Initializing default SEO data...');
    for (const seo of defaultSeoData) {
      const existingSeo = await SeoModel.findOne({ where: { page_url: seo.page_url } });
      if (!existingSeo) {
        const newSeo = new SeoModel(seo);
        await newSeo.save();
        console.log(`Added SEO entry for URL: ${seo.page_url}`);
      } else {
        console.log(`SEO entry already exists for URL: ${seo.page_url}`);
      }
    }
    res.status(200).json({ message: 'Default SEO data initialized.' });
  } catch (error) {
    console.error('Error initializing SEO data:', error);
    res.status(500).json({ message: 'Error initializing SEO data.' });
  }
};

// Get all SEO entries
exports.getAllPublicSeo = async (req, res) => {
  try {
    console.log('Fetching all public SEO entries...');
    const seoEntries = await SeoModel.findAll(); // Ensure you're using the correct ORM method
    console.log(`Retrieved ${seoEntries.length} SEO entries.`);
    res.status(200).json(seoEntries);
  } catch (error) {
    console.error('Error retrieving SEO entries:', error);
    res.status(500).json({ message: "Error retrieving SEO entries", error });
  }
};

// Get a single SEO entry by page URL
exports.getPublicSeoByPageUrl = async (req, res) => {
  const pageUrl = req.params.pageUrl;
  console.log(`Fetching SEO entry for page URL: ${pageUrl}`);
  
  try {
    const seoEntry = await SeoModel.findOne({ where: { page_url: pageUrl } });
    if (!seoEntry) {
      console.log(`SEO entry not found for URL: ${pageUrl}`);
      return res.status(404).json({ message: "SEO entry not found" });
    }
    console.log(`SEO entry found for URL: ${pageUrl}`, seoEntry);
    res.status(200).json(seoEntry);
  } catch (error) {
    console.error('Error retrieving SEO entry:', error);
    res.status(500).json({ message: "Error retrieving SEO entry", error: error.message });
  }
};

// Fetch a single SEO entry by page title
exports.getPublicSeoByTitle = async (req, res) => {
    const pageTitle = req.params.pageTitle; // Capture the page title from the request parameters
    console.log(`Fetching SEO entry for page title: ${pageTitle}`); // Log the page title being fetched
    
    try {
        const seoEntry = await SeoModel.findOne({ where: { page_title: pageTitle } });
        if (!seoEntry) {
            console.log(`SEO entry not found for title: ${pageTitle}`);
            return res.status(404).json({ message: "SEO entry not found" });
        }
        console.log(`SEO entry found for title: ${pageTitle}`, seoEntry); // Log the found entry
        res.status(200).json(seoEntry);
    } catch (error) {
        console.error('Error retrieving SEO entry:', error);
        res.status(500).json({ message: "Error retrieving SEO entry", error: error.message });
    }
};

