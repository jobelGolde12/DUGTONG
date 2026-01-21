import { MapPin, ArrowRight, Shield, Users, Database, Search, Activity, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import HeartIcon from './HeartIcon';
import Orb from './Orb';
import MagicBento from './MagicBento';

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

      {/* MagicBento Component Section */}
      <section className="dark-section relative">
        <MagicBento 
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          disableAnimations={false}
          enableTilt={true}
          clickEffect={true}
          enableMagnetism={true}
        />
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