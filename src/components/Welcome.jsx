import { MapPin, ArrowRight, Shield, Users, Database, Search, Activity, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import HeartIcon from './HeartIcon';
import Orb from './Orb';
import './MagicBento.css';

const Welcome = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Hero Section with Orb Background */}
      <section className="relative h-screen">
        <div className="absolute inset-0 w-full h-full">
          <Orb hue={280} hoverIntensity={0.3} backgroundColor="#000000" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div>
              <HeartIcon />
            </div>
            <h1 className="text-6xl md:text-8xl font-hero-title">
              DUGTONG
            </h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-hero-subtitle mb-4 text-white/90">
            Dugo Ko, Tulong Ko
          </h2>
          
          <p className="text-xl md:text-2xl font-hero text-white/80 mb-6 max-w-3xl">
            A Web-Based Blood Donor Profiling and Management System
          </p>
          
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8">
            <MapPin className="w-5 h-5 text-white/80" />
            <p className="text-white/90 font-hero text-lg">
              for Sorsogon Province
            </p>
          </div>
          
          {/* Get Started Button */}
          <button
            onClick={() => onNavigate('dashboard')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-hero py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 pointer-events-auto"
          >
            <span className="relative z-10 text-lg font-bold">Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-rose-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Rest of Content - MagicBento Themed */}
      <section className="dark-section relative">
        <div className="responsive-container py-16">
          {/* Purpose Card - MagicBento Style */}
          <div className="mb-16">
            <div className="magic-bento-card magic-bento-card--border-glow magic-bento-card--text-autohide glass-card">
              <div className="magic-bento-card__header">
                <div className="feature-icon">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="magic-bento-card__label">Mission</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">Core Purpose</h2>
                <p className="magic-bento-card__description">
                  Collect, organize, display, and manage basic information of voluntary blood donors 
                  residing only within Sorsogon Province to ensure efficient matching and timely assistance.
                </p>
              </div>
            </div>
          </div>

          {/* User Types and Features Grid - MagicBento Style */}
          <div className="card-grid">
            {/* User Types */}
            <div className="magic-bento-card magic-bento-card--border-glow magic-bento-card--text-autohide glass-card">
              <div className="magic-bento-card__header">
                <div className="feature-icon">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="magic-bento-card__label">Users</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">System Users</h2>
                <ul className="user-list">
                  <li>Patients in need of blood assistance</li>
                  <li>Authorized hospital personnel</li>
                  <li>Local health office staff</li>
                  <li>Blood donation organizers</li>
                </ul>
              </div>
            </div>

            {/* Key Features */}
            <div className="magic-bento-card magic-bento-card--border-glow magic-bento-card--text-autohide glass-card">
              <div className="magic-bento-card__header">
                <div className="feature-icon">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <div className="magic-bento-card__label">Features</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Users, title: 'Donor Profiles', desc: 'Complete donor information' },
                    { icon: Search, title: 'Search & Filter', desc: 'Find by type, municipality' },
                    { icon: Activity, title: 'Real-time Updates', desc: 'Manage availability' },
                    { icon: BarChart3, title: 'Statistics', desc: 'Donor demographics' }
                  ].map((feature, index) => (
                    <div key={index} className="bg-black/30 rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <feature.icon className="w-4 h-4 text-purple-400" />
                        <h4 className="text-sm font-bold text-white">{feature.title}</h4>
                      </div>
                      <p className="text-xs text-gray-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scope Section - MagicBento Style */}
          <div className="mt-16">
            <div className="magic-bento-card magic-bento-card--border-glow glass-card">
              <div className="magic-bento-card__header">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="magic-bento-card__label">Scope</div>
              </div>
              <div className="magic-bento-card__content">
                <h2 className="magic-bento-card__title text-center mb-8">System Scope</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Included */}
                  <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h3 className="text-xl font-bold text-white">Included</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Donor profiling and management',
                        'Search and filtering capabilities',
                        'Basic notifications and alerts',
                        'Statistical summaries',
                        'Web-based interface only'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div className="bg-gradient-to-br from-red-900/30 to-rose-900/30 rounded-2xl p-6 border border-red-700/30">
                    <div className="flex items-center gap-3 mb-4">
                      <XCircle className="w-6 h-6 text-red-400" />
                      <h3 className="text-xl font-bold text-white">Not Included</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'Mobile application features',
                        'Blood storage or testing workflows',
                        'Medical history records',
                        'External system integrations',
                        'Production-level optimizations'
                      ].map((item, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-sm font-medium">
          Academic Project • For Educational Purposes Only
        </p>
      </div>
    </div>
  );
};

export default Welcome;