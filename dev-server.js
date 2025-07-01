#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Sample data for portfolio
const projects = [
  {
    id: '1',
    title: 'Sales Analysis Dashboard',
    description: 'Power BI dashboard analyzing sales performance across multiple regions',
    category: 'powerbi',
    image: '/api/placeholder/400/300',
    technologies: ['Power BI', 'SQL', 'Excel'],
    featured: true,
    createdAt: new Date('2024-01-15'),
    liveUrl: 'https://app.powerbi.com/sample-dashboard',
    githubUrl: 'https://github.com/user/sales-dashboard'
  },
  {
    id: '2', 
    title: 'Customer Segmentation Analysis',
    description: 'Machine learning project for customer segmentation using clustering algorithms',
    category: 'datascience',
    image: '/api/placeholder/400/300',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib'],
    featured: true,
    createdAt: new Date('2024-02-10'),
    githubUrl: 'https://github.com/user/customer-segmentation'
  }
];

const profile = {
  id: '1',
  name: 'Data Science Professional',
  title: 'Data Analyst & Power BI Developer',
  bio: 'Experienced data professional specializing in business intelligence and analytics',
  email: 'contact@example.com',
  phone: '+1234567890',
  location: 'Your City, Country',
  website: 'https://your-portfolio.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourname',
  avatar: '/api/placeholder/150/150',
  skills: ['Power BI', 'SQL', 'Python', 'Excel', 'Tableau'],
  experience: '3+ years',
  createdAt: new Date(),
  updatedAt: new Date()
};

const skillCategories = [
  {
    id: '1',
    name: 'Business Intelligence',
    skills: ['Power BI', 'Tableau', 'SQL Server', 'Excel'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Data Science',
    skills: ['Python', 'R', 'Machine Learning', 'Statistics'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// API Routes
app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;
  let filteredProjects = projects;
  
  if (category) {
    filteredProjects = filteredProjects.filter(p => p.category === category);
  }
  
  if (featured === 'true') {
    filteredProjects = filteredProjects.filter(p => p.featured);
  }
  
  res.json(filteredProjects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.get('/api/skills', (req, res) => {
  res.json(skillCategories);
});

// Serve static files from client/dist if available
const clientDistPath = path.join(__dirname, 'client', 'dist');
try {
  app.use(express.static(clientDistPath));
} catch (e) {
  console.log('Client dist not found, serving API only');
}

// Default route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API Server is running!', 
    endpoints: ['/api/profile', '/api/projects', '/api/skills'],
    status: 'Active',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Portfolio server running at http://0.0.0.0:${PORT}`);
  console.log(`📁 API endpoints available:`);
  console.log(`   GET /api/profile`);
  console.log(`   GET /api/projects`);
  console.log(`   GET /api/skills`);
  console.log(`💻 Server ready for connections`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});