import { connectDB } from '../config/db.js';
import CaseStudy from '../models/CaseStudy.js';

const projects = [
  {
    title: 'Aicumen AI',
    description: 'Intelligent automation system powered by state-of-the-art AI technology, enabling organizations to streamline operations and enhance productivity through smart solutions.',
    image: '/images/aicumen-ai.webp',
    link: 'https://www.aicumen.ai/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '1 months',
    duration: '1 months',
    results: ['Enhanced automation capabilities', 'Improved user experience', 'Scalable architecture'],
    location: 'India',
    projectName: 'AICUMEN',
    year: new Date().getFullYear().toString(),
    industry: 'Technology',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'AMRUTKUMAR GOVINDDAS LLP',
    description: 'Sophisticated digital storefront presenting luxury jewelry pieces with intuitive navigation, smooth checkout process, and trusted payment security.',
    image: '/images/amrutkumar-jewelry.webp',
    link: 'https://amrutkumargovinddasllp.com/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '2 Days',
    duration: '2 Days',
    results: ['Improved conversion rates', 'Enhanced user experience', 'Mobile-responsive design'],
    location: 'India',
    projectName: 'AMRUTKUMAR',
    year: new Date().getFullYear().toString(),
    industry: 'Jewelry',
    industries: 'Jewelry',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'AMRUTKUMAR GOVINDDAS LLP (App)',
    description: 'Mobile app experience for AMRUTKUMAR GOVINDDAS LLP, bringing their premium jewelry collection and seamless shopping journey directly to users\' devices.',
    image: '/images/Amrut App.webp',
    link: '#',
    category: 'app',
    tags: ['#MOBILE APP DESIGN', '#MOBILE APP DEVELOPMENT'],
    techStack: ['React Native', 'Node.js'],
    timeline: '5 months',
    duration: '5 months',
    results: ['Native mobile experience', 'Improved user engagement', 'Seamless shopping journey'],
    location: 'India',
    projectName: 'AMRUTKUMAR APP',
    year: new Date().getFullYear().toString(),
    industry: 'Jewelry',
    industries: 'Jewelry',
    services: 'Mobile App Design, Mobile App Development',
    published: true
  },
  {
    title: 'Crosscoin',
    description: 'Contemporary e-commerce destination specializing in premium sock collections, combining stylish aesthetics with superior comfort for daily use.',
    image: '/images/crosscoin.webp',
    link: 'https://crosscoin.in/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    duration: '3 months',
    results: ['Modern e-commerce platform', 'Improved sales conversion', 'User-friendly interface'],
    location: 'India',
    projectName: 'CROSSCOIN',
    year: new Date().getFullYear().toString(),
    industry: 'E-commerce',
    industries: 'E-commerce',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'Immune Protector',
    description: 'Comprehensive wellness resource center delivering valuable insights and quality supplements designed to naturally boost and maintain immune health.',
    image: '/images/immune-protector.webp',
    link: 'https://www.immuneprotector.in/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '2 months',
    duration: '2 months',
    results: ['Enhanced user engagement', 'Improved content delivery', 'Better user experience'],
    location: 'India',
    projectName: 'IMMUNE PROTECTOR',
    year: new Date().getFullYear().toString(),
    industry: 'Healthcare',
    industries: 'Healthcare',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'Nanak Finserv',
    description: 'Digital banking ecosystem providing creative financial tools and services tailored for individual consumers and corporate clients seeking modern banking solutions.',
    image: '/images/nanak-finserv.webp',
    link: 'https://nanakfinserv.com/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '4 months',
    duration: '4 months',
    results: ['Secure banking platform', 'Improved user trust', 'Enhanced functionality'],
    location: 'India',
    projectName: 'NANAK FINSERV',
    year: new Date().getFullYear().toString(),
    industry: 'Finance',
    industries: 'Finance',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'Radhe Consultancy',
    description: 'Expert advisory network linking companies with seasoned consultants who deliver strategic guidance to drive organizational expansion and success.',
    image: '/images/radhe-consultancy.webp',
    link: 'https://radheconsultancy.co.in/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    duration: '3 months',
    results: ['Professional platform', 'Improved client engagement', 'Better service delivery'],
    location: 'India',
    projectName: 'RADHE CONSULTANCY',
    year: new Date().getFullYear().toString(),
    industry: 'Consulting',
    industries: 'Consulting',
    services: 'Website Design, Website Development',
    published: true
  },
  {
    title: 'Vivera Lighting',
    description: 'Contemporary illumination specialist creating stylish fixtures and eco-friendly lighting options perfect for both home environments and workplace settings.',
    image: '/images/vivera-lighting.webp',
    link: 'https://www.viveralighting.com/',
    category: 'web',
    tags: ['#WEBSITE DESIGN', '#WEBSITE DEVELOPMENT'],
    techStack: ['React', 'Node.js'],
    timeline: '3 months',
    duration: '3 months',
    results: ['Modern design showcase', 'Improved product visibility', 'Enhanced user experience'],
    location: 'India',
    projectName: 'VIVERA LIGHTING',
    year: new Date().getFullYear().toString(),
    industry: 'Retail',
    industries: 'Retail',
    services: 'Website Design, Website Development',
    published: true
  }
];

export const initCaseStudies = async () => {
  try {
    console.log('🔄 Connecting to database...');
    await connectDB();
    
    console.log('🔄 Initializing case studies...');
    
    for (const projectData of projects) {
      // Check if case study with this title already exists
      const existing = await CaseStudy.findOne({
        where: { title: projectData.title }
      });
      
      if (existing) {
        console.log(`  ℹ️  Case study already exists: ${projectData.title} (ID: ${existing.id})`);
      } else {
        await CaseStudy.create(projectData);
        console.log(`  ✅ Created case study: ${projectData.title}`);
      }
    }
    
    console.log('✅ Case studies initialization completed');
  } catch (error) {
    console.error('❌ Error initializing case studies:', error);
    throw error;
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.includes('initCaseStudies.js')) {
  initCaseStudies()
    .then(() => {
      console.log('✅ Script completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error);
      process.exit(1);
    });
}

