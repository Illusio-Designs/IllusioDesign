import User from './User.js';
import Blog from './Blog.js';
import CaseStudy from './CaseStudy.js';
import Position from './Position.js';
import Application from './Application.js';
import ContactMessage from './ContactMessage.js';
import Team from './Team.js';
import SEO from './SEO.js';
import PrivacyPolicy from './PrivacyPolicy.js';
import TermsOfService from './TermsOfService.js';
import Review from './Review.js';

// Define associations
Application.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });
Position.hasMany(Application, { foreignKey: 'positionId', as: 'applications' });

export {
  User,
  Blog,
  CaseStudy,
  Position,
  Application,
  ContactMessage,
  Team,
  SEO,
  PrivacyPolicy,
  TermsOfService,
  Review
};

