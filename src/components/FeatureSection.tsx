
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Puzzle, Zap, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: '24/7 Availability',
    description: 'Never miss a customer call, even after hours or during peak times when staff is busy.'
  },
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: 'Seamless Integration',
    description: 'Connects with your existing systems from booking software to CRM and POS systems.'
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Natural Conversations',
    description: 'Understands context, handles interruptions, and speaks naturally like a real team member.'
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with HIPAA compliance for healthcare and PCI for payments.'
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="maxom-container">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Voice AI That Powers Your Business</h2>
              <p className="text-gray-700 mb-8">
                Our advanced voice AI platform handles calls, takes orders, and books appointments just like your best team member. It learns your business language and workflow, freeing your staff to focus on what matters most.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="rounded-full bg-maxom-orange bg-opacity-10 p-3 mr-4 text-maxom-orange flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/product" className="btn-primary inline-flex">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-main p-1">
                <div className="bg-white rounded-t-xl p-4 flex">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-gray-100 rounded px-3 py-1 text-xs text-gray-600 flex-grow text-center">
                    voice-assistant-demo.mp3
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-main flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
                      <p className="text-sm">Good afternoon! This is Sarah from Bistro Moderne. How can I help you today?</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mb-3">
                    <div className="bg-maxom-orange bg-opacity-10 rounded-2xl rounded-tr-none p-4 max-w-xs">
                      <p className="text-sm">Hi, I'd like to make a dinner reservation for tomorrow.</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
                      <span className="text-gray-600 text-xs">C</span>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-main flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-white text-xs">AI</span>
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
                      <p className="text-sm">Great! I'd be happy to help with that. For how many people would you like to make the reservation?</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Voice Transcript</div>
                    <div className="text-xs text-gray-500">Live Demo</div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="flex-1 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium">
                      Skip
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-maxom-orange text-white text-sm font-medium flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      Play
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
