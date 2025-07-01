import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Linkedin, Github, MapPin, Phone, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Profile } from '@shared/schema';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: profile } = useQuery<Profile>({
    queryKey: ['/api/profile'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Pesan berhasil dikirim! Saya akan segera menghubungi Anda.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Hubungi Saya</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mari berdiskusi tentang proyek Anda atau berkolaborasi dalam mengembangkan solusi data-driven
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border rounded-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Kirim Pesan</h2>
              <p className="text-muted-foreground">
                Isi formulir di bawah ini dan saya akan merespons dalam 24 jam
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subjek *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                  placeholder="Konsultasi Proyek Data Science"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Pesan *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
                  placeholder="Ceritakan tentang proyek Anda atau pertanyaan yang ingin didiskusikan..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          {/* Contact Methods */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Informasi Kontak</h3>
            <div className="space-y-4">
              {profile?.email && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Telepon</div>
                  <span>+62 812-3456-7890</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Lokasi</div>
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
            <div className="space-y-3">
              {profile?.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Linkedin className="w-5 h-5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              )}
              {profile?.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
              )}
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span>WhatsApp: +62 812-3456-7890</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-6">
            <h3 className="font-semibold mb-2">Status Ketersediaan</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
              <span className="text-sm">Tersedia untuk proyek baru</span>
            </div>
            <p className="text-sm opacity-90">
              Saat ini saya terbuka untuk diskusi proyek data science, 
              konsultasi analytics, dan kolaborasi pengembangan dashboard.
            </p>
          </div>

          {/* FAQ */}
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">FAQ</h3>
            <div className="space-y-4 text-sm">
              <div>
                <div className="font-medium mb-1">Berapa lama waktu respons?</div>
                <div className="text-muted-foreground">Biasanya saya merespons dalam 24 jam.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Jenis proyek apa yang ditangani?</div>
                <div className="text-muted-foreground">Data science, machine learning, Power BI, dan analytics.</div>
              </div>
              <div>
                <div className="font-medium mb-1">Apakah tersedia konsultasi gratis?</div>
                <div className="text-muted-foreground">Ya, konsultasi awal 30 menit gratis untuk membahas kebutuhan proyek.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}