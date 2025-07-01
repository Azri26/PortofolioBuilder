import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { ArrowLeft, Calendar, Github, ExternalLink, Tag, BarChart3 } from 'lucide-react';
import { Project } from '@shared/schema';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['/api/projects', id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Proyek Tidak Ditemukan</h1>
        <p className="text-muted-foreground mb-8">Proyek yang Anda cari tidak tersedia.</p>
        <Link href="/projects">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Kembali ke Proyek
          </button>
        </Link>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/projects">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Proyek
        </button>
      </Link>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Project Image */}
          {project.imageUrl && (
            <div className="lg:w-1/2">
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className={project.imageUrl ? 'lg:w-1/2' : 'w-full'}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                {project.category.replace('-', ' ').toUpperCase()}
              </span>
              {project.featured && (
                <span className="text-sm font-medium px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                  UNGGULAN
                </span>
              )}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{project.title}</h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              {project.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(project.createdAt)}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo Langsung
                </a>
              )}
              {project.powerBiUrl && (
                <a
                  href={project.powerBiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Power BI Dashboard
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Detail Proyek</h2>
            <div className="whitespace-pre-wrap">{project.content}</div>
          </div>

          {/* Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Hasil & Metrik</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="bg-card border rounded-lg p-4">
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </div>
                    <div className="text-xl font-semibold mt-1">
                      {typeof value === 'string' ? value : JSON.stringify(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technologies */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Teknologi yang Digunakan
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Stats */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Informasi Proyek</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-muted-foreground">Kategori</div>
                <div className="font-medium capitalize">
                  {project.category.replace('-', ' ')}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Tanggal Dibuat</div>
                <div className="font-medium">{formatDate(project.createdAt)}</div>
              </div>
              {project.featured && (
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-medium">Proyek Unggulan</div>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Tertarik dengan proyek ini?</h3>
            <p className="text-sm opacity-90 mb-4">
              Mari diskusikan bagaimana saya bisa membantu proyek Anda
            </p>
            <Link href="/contact">
              <button className="bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-full">
                Hubungi Saya
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}