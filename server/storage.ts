import { Project, Profile, SkillCategory, InsertProject, InsertProfile, InsertSkillCategory } from "../shared/schema.js";

export interface IStorage {
  // Projects
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | null>;
  deleteProject(id: string): Promise<boolean>;

  // Profile
  getProfile(): Promise<Profile | null>;
  updateProfile(profile: InsertProfile): Promise<Profile>;

  // Skills
  getAllSkillCategories(): Promise<SkillCategory[]>;
  createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory>;
  updateSkillCategory(id: string, category: Partial<InsertSkillCategory>): Promise<SkillCategory | null>;
  deleteSkillCategory(id: string): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private projects: Project[] = [];
  private profile: Profile | null = null;
  private skillCategories: SkillCategory[] = [];

  constructor() {
    this.seedData();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private seedData() {
    // Seed profile data
    this.profile = {
      id: this.generateId(),
      name: "Data Scientist",
      title: "Data Scientist & Analytics Expert",
      bio: "Passionate data scientist with expertise in machine learning, data visualization, and business intelligence. I love turning complex data into actionable insights.",
      email: "your.email@example.com",
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      skills: [
        "Python", "R", "SQL", "Power BI", "Tableau", "Machine Learning", 
        "Deep Learning", "Data Visualization", "Statistical Analysis", 
        "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch"
      ],
      updatedAt: new Date(),
    };

    // Seed skill categories
    this.skillCategories = [
      {
        id: this.generateId(),
        name: "Data Science & ML",
        skills: ["Python", "R", "Machine Learning", "Deep Learning", "Statistical Analysis", "Scikit-learn", "TensorFlow", "PyTorch"],
        color: "#3b82f6"
      },
      {
        id: this.generateId(),
        name: "Data Visualization",
        skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "Plotly", "D3.js"],
        color: "#10b981"
      },
      {
        id: this.generateId(),
        name: "Database & Tools",
        skills: ["SQL", "PostgreSQL", "MongoDB", "Pandas", "NumPy", "Jupyter"],
        color: "#f59e0b"
      }
    ];

    // Seed sample projects
    this.projects = [
      {
        id: this.generateId(),
        title: "Customer Churn Prediction",
        description: "Machine learning model to predict customer churn using advanced analytics",
        category: "machine-learning",
        technologies: ["Python", "Scikit-learn", "Pandas", "Power BI"],
        content: "Developed a comprehensive machine learning solution to predict customer churn with 92% accuracy. The project involved data preprocessing, feature engineering, model selection, and deployment.",
        featured: true,
        metrics: {
          accuracy: "92%",
          precision: "89%",
          recall: "94%",
          dataPoints: "50,000+"
        },
        createdAt: new Date("2024-01-15")
      },
      {
        id: this.generateId(),
        title: "Sales Performance Dashboard",
        description: "Interactive Power BI dashboard for sales analytics and KPI tracking",
        category: "power-bi",
        technologies: ["Power BI", "SQL", "DAX", "Excel"],
        content: "Created a comprehensive sales dashboard providing real-time insights into sales performance, regional trends, and product analytics. Features interactive visualizations and automated reporting.",
        featured: true,
        powerBiUrl: "https://app.powerbi.com/view?r=your-report-id",
        metrics: {
          reportViews: "1,200+",
          kpis: "15",
          dataSources: "3",
          updateFrequency: "Real-time"
        },
        createdAt: new Date("2024-02-20")
      },
      {
        id: this.generateId(),
        title: "Market Trend Analysis",
        description: "Statistical analysis of market trends using advanced data science techniques",
        category: "analytics",
        technologies: ["R", "Python", "Tableau", "Statistical Modeling"],
        content: "Conducted comprehensive market trend analysis using statistical modeling and time series analysis. Identified key market patterns and provided strategic recommendations.",
        featured: false,
        metrics: {
          timespan: "5 years",
          markets: "12",
          accuracy: "87%",
          recommendations: "25"
        },
        createdAt: new Date("2024-03-10")
      }
    ];
  }

  // Projects implementation
  async getAllProjects(): Promise<Project[]> {
    return [...this.projects].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.projects.find(p => p.id === id) || null;
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return this.projects.filter(p => p.category === category);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects.filter(p => p.featured);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      createdAt: new Date(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | null> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    this.projects[index] = { ...this.projects[index], ...project };
    return this.projects[index];
  }

  async deleteProject(id: string): Promise<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.projects.splice(index, 1);
    return true;
  }

  // Profile implementation
  async getProfile(): Promise<Profile | null> {
    return this.profile;
  }

  async updateProfile(profileData: InsertProfile): Promise<Profile> {
    if (this.profile) {
      this.profile = {
        ...this.profile,
        ...profileData,
        updatedAt: new Date(),
      };
    } else {
      this.profile = {
        ...profileData,
        id: this.generateId(),
        updatedAt: new Date(),
      };
    }
    return this.profile;
  }

  // Skills implementation
  async getAllSkillCategories(): Promise<SkillCategory[]> {
    return [...this.skillCategories];
  }

  async createSkillCategory(category: InsertSkillCategory): Promise<SkillCategory> {
    const newCategory: SkillCategory = {
      ...category,
      id: this.generateId(),
    };
    this.skillCategories.push(newCategory);
    return newCategory;
  }

  async updateSkillCategory(id: string, categoryData: Partial<InsertSkillCategory>): Promise<SkillCategory | null> {
    const index = this.skillCategories.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    this.skillCategories[index] = { ...this.skillCategories[index], ...categoryData };
    return this.skillCategories[index];
  }

  async deleteSkillCategory(id: string): Promise<boolean> {
    const index = this.skillCategories.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.skillCategories.splice(index, 1);
    return true;
  }
}