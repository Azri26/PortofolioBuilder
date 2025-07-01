const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data for portfolio
const profile = {
  id: '1',
  name: 'Data Scientist',
  title: 'Data Scientist & Analytics Expert',
  bio: 'Passionate data scientist dengan keahlian dalam machine learning, data visualization, dan business intelligence. Saya mengubah data kompleks menjadi insights yang dapat ditindaklanjuti.',
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  skills: ['Python', 'R', 'SQL', 'Power BI', 'Tableau', 'Machine Learning', 'Deep Learning', 'Pandas', 'NumPy', 'Scikit-learn'],
  updatedAt: new Date()
};

const projects = [
  {
    id: '1',
    title: 'Customer Churn Prediction',
    description: 'Model machine learning untuk prediksi customer churn dengan akurasi 92%',
    category: 'machine-learning',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Power BI'],
    content: 'Developed a comprehensive machine learning solution to predict customer churn with 92% accuracy. The project involved data preprocessing, feature engineering, model selection, and deployment.',
    featured: true,
    metrics: { accuracy: '92%', precision: '89%', recall: '94%', dataPoints: '50,000+' },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Sales Performance Dashboard',
    description: 'Dashboard Power BI interaktif untuk analisis sales dan tracking KPI',
    category: 'power-bi',
    technologies: ['Power BI', 'SQL', 'DAX', 'Excel'],
    content: 'Created a comprehensive sales dashboard providing real-time insights into sales performance, regional trends, and product analytics.',
    featured: true,
    powerBiUrl: 'https://app.powerbi.com/view?r=your-report-id',
    metrics: { reportViews: '1,200+', kpis: '15', dataSources: '3', updateFrequency: 'Real-time' },
    createdAt: new Date('2024-02-20')
  },
  {
    id: '3',
    title: 'Market Trend Analysis',
    description: 'Analisis statistik tren pasar menggunakan teknik data science lanjutan',
    category: 'analytics',
    technologies: ['R', 'Python', 'Tableau', 'Statistical Modeling'],
    content: 'Conducted comprehensive market trend analysis using statistical modeling and time series analysis.',
    featured: false,
    metrics: { timespan: '5 years', markets: '12', accuracy: '87%', recommendations: '25' },
    createdAt: new Date('2024-03-10')
  }
];

const skillCategories = [
  {
    id: '1',
    name: 'Data Science & ML',
    skills: ['Python', 'R', 'Machine Learning', 'Deep Learning', 'Statistical Analysis'],
    color: '#3b82f6'
  },
  {
    id: '2',
    name: 'Data Visualization',
    skills: ['Power BI', 'Tableau', 'Matplotlib', 'Seaborn', 'Plotly'],
    color: '#10b981'
  },
  {
    id: '3',
    name: 'Database & Tools',
    skills: ['SQL', 'PostgreSQL', 'MongoDB', 'Pandas', 'NumPy'],
    color: '#f59e0b'
  }
];

// API Routes
app.get('/api/profile', (req, res) => {
  res.json(profile);
});

app.get('/api/projects', (req, res) => {
  const { category, featured } = req.query;
  let result = projects;
  
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  
  if (featured === 'true') {
    result = result.filter(p => p.featured);
  }
  
  res.json(result);
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

// Serve static files from client dist (if available)
try {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));
} catch (e) {
  console.log('Static files not found - running in development mode');
}

// Default route for non-API endpoints
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio API Server is running!', 
    endpoints: ['/api/profile', '/api/projects', '/api/skills'],
    status: 'Development mode',
    version: '1.0.0'
  });
});

app.listen(port, () => {
  console.log(`Portfolio server running at http://localhost:${port}`);
});