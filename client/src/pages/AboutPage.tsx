import { useQuery } from '@tanstack/react-query';
import { Mail, Linkedin, Github, Download, Award, Target, Code } from 'lucide-react';
import { Profile, SkillCategory } from '@shared/schema';

export function AboutPage() {
  const { data: profile, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const { data: skillCategories, isLoading: skillsLoading } = useQuery<SkillCategory[]>({
    queryKey: ['/api/skills'],
  });

  if (profileLoading || skillsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="space-y-6">
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tentang Saya</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mengenal lebih dekat perjalanan saya dalam dunia data science dan analytics
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Bio Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-primary" />
              Profil Singkat
            </h2>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                {profile?.bio || 'Passionate data scientist dengan keahlian dalam machine learning, data visualization, dan business intelligence.'}
              </p>
              <p>
                Saya memiliki pengalaman yang luas dalam mengubah data mentah menjadi insights yang dapat ditindaklanjuti. 
                Dengan latar belakang yang kuat dalam statistik dan programming, saya fokus pada pengembangan solusi 
                data-driven yang memberikan dampak nyata bagi bisnis.
              </p>
              <p>
                Keahlian saya mencakup berbagai aspek data science, mulai dari data collection dan preprocessing, 
                exploratory data analysis, machine learning modeling, hingga deployment dan monitoring model dalam 
                production environment.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-primary" />
              Pengalaman & Prestasi
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold">Senior Data Scientist</h3>
                <p className="text-muted-foreground mb-2">Tech Company • 2022 - Sekarang</p>
                <ul className="text-sm space-y-1">
                  <li>• Mengembangkan model machine learning untuk prediksi customer churn dengan akurasi 92%</li>
                  <li>• Membangun dashboard real-time untuk monitoring KPI bisnis menggunakan Power BI</li>
                  <li>• Memimpin tim data science dalam implementasi MLOps pipeline</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-secondary pl-6">
                <h3 className="text-lg font-semibold">Data Analyst</h3>
                <p className="text-muted-foreground mb-2">Startup Company • 2020 - 2022</p>
                <ul className="text-sm space-y-1">
                  <li>• Menganalisis data user behavior untuk meningkatkan product engagement</li>
                  <li>• Membuat automated reporting system yang menghemat 20+ jam per minggu</li>
                  <li>• Mengimplementasikan A/B testing framework untuk product optimization</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-accent pl-6">
                <h3 className="text-lg font-semibold">Junior Data Scientist</h3>
                <p className="text-muted-foreground mb-2">Consulting Firm • 2019 - 2020</p>
                <ul className="text-sm space-y-1">
                  <li>• Mengembangkan model forecasting untuk demand planning</li>
                  <li>• Membuat visualisasi data interaktif untuk client presentation</li>
                  <li>• Melakukan data cleaning dan preprocessing untuk berbagai project</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Skills Detailed */}
          {skillCategories && skillCategories.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                Keahlian Teknis Detail
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {skillCategories.map((category) => (
                  <div
                    key={category.id}
                    className="bg-card border rounded-lg p-6"
                    style={{ borderColor: category.color + '20' }}
                  >
                    <h3 
                      className="font-semibold mb-4 flex items-center gap-2"
                      style={{ color: category.color }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: category.color + '15',
                            color: category.color
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Profile Card */}
          <div className="bg-card border rounded-lg p-6 text-center">
            {profile?.profileImageUrl && (
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{profile?.name || 'Data Scientist'}</h3>
            <p className="text-muted-foreground mb-4">{profile?.title || 'Data Scientist & Analytics Expert'}</p>
            
            {/* Contact Links */}
            <div className="space-y-3">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{profile.email}</span>
                </a>
              )}
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="text-sm">LinkedIn Profile</span>
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm">GitHub Profile</span>
                </a>
              )}
            </div>
          </div>

          {/* Resume Download */}
          {profile?.resumeUrl && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
              <h3 className="font-semibold mb-2">Download CV</h3>
              <p className="text-sm opacity-90 mb-4">
                Unduh CV lengkap untuk melihat detail pengalaman dan kualifikasi
              </p>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>
          )}

          {/* Fun Facts */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Fakta Menarik</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Telah menganalisis lebih dari 10TB data</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Mengembangkan 50+ dashboard Power BI</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Berkontribusi pada 15+ project open source</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Berpengalaman 5+ tahun di bidang data</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}