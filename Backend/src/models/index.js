import User from './User.js';
import Blog from './Blog.js';
import CaseStudy from './CaseStudy.js';
import Position from './Position.js';
import Application from './Application.js';
import ContactMessage from './ContactMessage.js';
import Team from './Team.js';
import SEO from './SEO.js';
import Review from './Review.js';
import Policy from './Policy.js';
import Setting from './Setting.js';
import Content from './Content.js';
import Milestone from './Milestone.js';

// Define associations
Application.belongsTo(Position, { foreignKey: 'positionId', as: 'position' });
Position.hasMany(Application, { foreignKey: 'positionId', as: 'applications' });

// All policy reads/writes go through the unified `Policy` model. The legacy
// privacy_policy / terms_of_service tables are no longer modelled here — the
// one-time migration in initDatabase.js reads them via raw SQL instead, so
// sequelize.sync() no longer recreates those decommissioned tables.

export {
  User,
  Blog,
  CaseStudy,
  Position,
  Application,
  ContactMessage,
  Team,
  SEO,
  Review,
  Policy,
  Setting,
  Content,
  Milestone
};
