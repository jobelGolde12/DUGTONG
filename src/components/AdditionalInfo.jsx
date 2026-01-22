import React from 'react';
import { 
  Users, 
  Activity, 
  Shield, 
  Heart, 
  Target, 
  Clock, 
  MapPin,
  CheckCircle,
  Award
} from 'lucide-react';

const AdditionalInfo = () => {
  const stats = [
    { icon: <Users className="w-6 h-6" />, label: "Active Donors", value: "500+", color: "text-red-400" },
    { icon: <Activity className="w-6 h-6" />, label: "Lives Saved", value: "1,200+", color: "text-green-400" },
    { icon: <Shield className="w-6 h-6" />, label: "Hospitals", value: "15+", color: "text-blue-400" },
    { icon: <Heart className="w-6 h-6" />, label: "Blood Units", value: "2.5K+", color: "text-purple-400" }
  ];

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precise Matching",
      description: "AI-powered donor-recipient matching based on location, blood type, and availability"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Instant notifications for critical blood needs and donor availability"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Local Focus",
      description: "Exclusively serving Sorsogon Province for faster emergency response"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Verified System",
      description: "All donors undergo proper screening and verification processes"
    }
  ];

  const benefits = [
    "Reduced emergency response time by 60%",
    "Increased donor retention by 45%",
    "Improved hospital coordination efficiency",
    "Enhanced donor appreciation programs",
    "Real-time blood inventory tracking",
    "Secure data management and privacy"
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Stats Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Making an Impact in Sorsogon
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our platform has revolutionized blood donation management across the province
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className={`${stat.color} bg-gray-900 p-3 rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Advanced Features for Better Outcomes
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our system is designed with cutting-edge technology to ensure efficient blood management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Impact */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h3 className="text-3xl font-bold text-white mb-6">
              Measurable Benefits
            </h3>
            <p className="text-gray-400 mb-8">
              Since implementation, DUGTONG has significantly improved blood management across Sorsogon Province through data-driven solutions and community engagement.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50">
            <h3 className="text-2xl font-bold text-white mb-6">
              Vision & Mission
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Our Vision</h4>
                <p className="text-gray-300">
                  To create a self-sustaining blood donation ecosystem in Sorsogon Province where no life is lost due to blood shortage, fostering a culture of regular voluntary donation.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-red-300 mb-3">Future Goals</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Expand to neighboring provinces by 2025</li>
                  <li>• Implement mobile app for on-the-go access</li>
                  <li>• Integrate with national blood bank networks</li>
                  <li>• Launch donor reward and recognition program</li>
                </ul>
              </div>
              
              <div className="pt-6 border-t border-gray-700/50">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900/20 to-purple-900/20 px-4 py-2 rounded-full">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">
                    Join our growing community of life-savers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-900/10 via-purple-900/10 to-blue-900/10 rounded-3xl p-8 border border-gray-700/50">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a donor, hospital staff, or coordinator, join us in building a safer, more efficient blood donation system for Sorsogon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                Become a Donor
              </button>
              <button className="px-8 py-3 bg-gray-700/50 text-white font-semibold rounded-xl border border-gray-600 hover:bg-gray-700/70 transition-colors duration-300">
                Partner with Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalInfo;