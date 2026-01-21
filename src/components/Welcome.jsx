import { 
  Users, 
  Search, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Heart,
  MapPin,
  Shield,
  Database
} from 'lucide-react';
import Orb from './Orb';

const Welcome = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-black font-sans">
      {/* Hero Section with Orb Background */}
      <section className="relative w-screen h-screen">
        <div className="absolute inset-0 w-full h-full">
          <Orb hue={280} hoverIntensity={0.3} backgroundColor="#000000" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Heart className="w-10 h-10 text-white" />
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
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-hero py-4 px-10 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
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

      {/* Rest of Content */}
      <section className="relative bg-gradient-to-br from-red-50 via-white to-rose-50">

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Purpose Card */}
        <div className="mb-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-xl">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Core Purpose</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Collect, organize, display, and manage basic information of voluntary blood donors 
              residing only within Sorsogon Province to ensure efficient matching and timely assistance.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* User Types */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-xl">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">System Users</h3>
            </div>
            <ul className="space-y-4">
              {[
                { text: 'Patients in need of blood assistance', color: 'text-red-600' },
                { text: 'Authorized hospital personnel', color: 'text-blue-600' },
                { text: 'Local health office staff', color: 'text-green-600' },
                { text: 'Blood donation organizers', color: 'text-purple-600' }
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className={`${item.color} font-medium`}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Features Grid */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Key Features</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Users, title: 'Donor Profiles', desc: 'Complete donor information management', color: 'bg-red-100', iconColor: 'text-red-600' },
                { icon: Search, title: 'Search & Filter', desc: 'Find donors by blood type, municipality', color: 'bg-blue-100', iconColor: 'text-blue-600' },
                { icon: Activity, title: 'Real-time Updates', desc: 'Manage donor availability and contact', color: 'bg-green-100', iconColor: 'text-green-600' },
                { icon: BarChart3, title: 'Statistics', desc: 'View donor summaries and demographics', color: 'bg-purple-100', iconColor: 'text-purple-600' }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scope Section */}
        <div className="mt-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">System Scope</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Included */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-800">Included</h4>
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
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excluded */}
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-6 border border-rose-200">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-6 h-6 text-rose-600" />
                  <h4 className="text-xl font-bold text-gray-800">Not Included</h4>
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
                      <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Academic Project • For Educational Purposes Only
          </p>
        </div>
      </section>
    </div>
  );
};

export default Welcome;