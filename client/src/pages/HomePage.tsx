import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Project, Profile } from '@shared/schema';

export function HomePage() {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const { data: featuredProjects, isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects', { featured: 'true' }],
  });

  if (profileLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
              {profile?.name || 'Data Scientist'}
            </h1>
            <p className="text-xl lg:text-2xl mb-8 opacity-90 animate-slide-up">
              {profile?.title || 'Data Scientist & Analytics Expert'}
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up">
              {profile?.bio || 'Mengubah data menjadi insights yang dapat ditindaklanjuti dengan keahlian dalam machine learning, visualisasi data, dan business intelligence.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href="/projects">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  Lihat Proyek
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                  Hubungi Saya
                </button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mt-12">
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Proyek Unggulan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Berikut adalah beberapa proyek data science dan analytics terbaik yang telah saya kerjakan
            </p>
          </div>

          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects?.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <div className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                    {project.imageUrl && (
                      <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {project.category.replace('-', ' ').toUpperCase()}
                        </span>
                        {project.powerBiUrl && (
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/projects">
              <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
                Lihat Semua Proyek
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Keahlian Teknis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tools dan teknologi yang saya kuasai dalam data science dan analytics
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile?.skills?.map((skill, index) => (
              <div
                key={skill}
                className="bg-card border p-4 rounded-lg text-center hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}