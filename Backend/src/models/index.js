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
import Policy from './Policy.js';
import Setting from './Setting.js';
import Content from './Content.js';

// Define associations
Application.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });
Position.hasMany(Application, { foreignKey: 'positionId', as: 'applications' });

// NOTE: PrivacyPolicy and TermsOfService are legacy models, kept only so the
// existing tables stay available for the one-time migration into `policies`.
// All policy reads/writes now go through the unified `Policy` model.

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
  Review,
  Policy,
  Setting,
  Content
};
