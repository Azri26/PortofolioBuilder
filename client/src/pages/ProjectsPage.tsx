import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Filter, Grid, List, ExternalLink, Github, Calendar } from 'lucide-react';
import { Project } from '@shared/schema';

export function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const categories = [
    { value: 'all', label: 'Semua Proyek' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'power-bi', label: 'Power BI' },
    { value: 'machine-learning', label: 'Machine Learning' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'web-development', label: 'Web Development' },
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Proyek Saya</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Koleksi lengkap proyek data science, analytics, dan Power BI yang telah saya kerjakan
        </p>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-background border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Projects Count */}
      <div className="mb-8">
        <p className="text-muted-foreground">
          Menampilkan {filteredProjects.length} dari {projects.length} proyek
        </p>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">Tidak ada proyek ditemukan</h3>
          <p className="text-muted-foreground">Coba ubah filter untuk melihat proyek lainnya</p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-6'
        }>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/projects/${project.id}`}>
        <div className="group bg-card border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6">
            {project.imageUrl && (
              <div className="md:w-48 aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {project.category.replace('-', ' ').toUpperCase()}
                  </span>
                  {project.featured && (
                    <span className="text-xs font-medium px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                      UNGGULAN
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                      +{project.technologies.length - 4} lainnya
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {(project.liveUrl || project.powerBiUrl) && (
                    <a
                      href={project.liveUrl || project.powerBiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
        {project.imageUrl && (
          <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            {project.featured && (
              <div className="absolute top-4 left-4">
                <span className="text-xs font-medium px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full">
                  UNGGULAN
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
              {project.category.replace('-', ' ').toUpperCase()}
            </span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {formatDate(project.createdAt)}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                +{project.technologies.length - 3} lainnya
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {(project.liveUrl || project.powerBiUrl) && (
                <a
                  href={project.liveUrl || project.powerBiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}