
import { motion } from 'framer-motion';
import { Check, Zap, Clock, Shield, Repeat, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSection from "@/components/NewsletterSection";

const Product = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="maxom-container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How Maxom.ai Works</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our voice AI platform is designed to handle calls, bookings, and orders with the same effectiveness as your best team members.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-main rounded-xl p-1 mb-8">
                <div className="bg-black rounded-lg h-14 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-6 mb-6">
                <div className="flex mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-main flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm">Thank you for calling City Fitness. This is Alex, how can I help you today?</p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-3">
                  <div className="bg-maxom-orange bg-opacity-10 rounded-2xl rounded-tr-none p-4 max-w-xs">
                    <p className="text-sm">Hi, I want to sign up for a yoga class tomorrow morning.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
                    <span className="text-gray-600 text-xs">C</span>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-main flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm">Great! We have two yoga classes tomorrow morning: 7:00 AM Power Yoga and 9:30 AM Gentle Flow. Which one would you prefer?</p>
                  </div>
                </div>
                
                <div className="flex justify-end mb-3">
                  <div className="bg-maxom-orange bg-opacity-10 rounded-2xl rounded-tr-none p-4 max-w-xs">
                    <p className="text-sm">The 9:30 AM class would be perfect.</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
                    <span className="text-gray-600 text-xs">C</span>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="w-8 h-8 rounded-full bg-gradient-main flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-white text-xs">AI</span>
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 max-w-xs">
                    <p className="text-sm">Perfect! I've reserved a spot for you in the 9:30 AM Gentle Flow class tomorrow. Can I get your name and phone number to confirm the booking?</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button className="bg-maxom-orange text-white rounded-full py-2 px-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  Play Full Demo
                </button>
              </div>
            </div>
          </motion.div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Natural Voice Interactions</h2>
            <p className="text-gray-700 mb-8">
              Our AI voice assistant handles conversations just like your best team member would. It understands context, responds to questions naturally, and adapts to each caller's needs.
            </p>
            
            <div className="space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex"
              >
                <div className="rounded-full bg-maxom-orange bg-opacity-10 p-3 mr-4 text-maxom-orange flex-shrink-0">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Smart Voice Recognition</h3>
                  <p className="text-gray-600">Understands diverse accents, background noise, and complex queries with advanced AI.</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex"
              >
                <div className="rounded-full bg-maxom-orange bg-opacity-10 p-3 mr-4 text-maxom-orange flex-shrink-0">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">24/7 Availability</h3>
                  <p className="text-gray-600">Never miss a call, even after hours or during peak times when staff is busy.</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex"
              >
                <div className="rounded-full bg-maxom-orange bg-opacity-10 p-3 mr-4 text-maxom-orange flex-shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Enterprise Security</h3>
                  <p className="text-gray-600">HIPAA-compliant for healthcare and PCI-compliant for payment processing.</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex"
              >
                <div className="rounded-full bg-maxom-orange bg-opacity-10 p-3 mr-4 text-maxom-orange flex-shrink-0">
                  <Repeat className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Continuous Learning</h3>
                  <p className="text-gray-600">Our AI improves with each interaction, constantly refining its understanding of your business.</p>
                </div>
              </motion.div>
            </div>
            
            <Link to="/contact" className="btn-primary inline-flex">
              Request Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="py-16 bg-gray-50">
        <div className="maxom-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our platform connects with your existing systems for a smooth workflow
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['CRM Systems', 'Booking Software', 'POS Systems', 'Calendar Apps', 'Scheduling Tools', 'Healthcare EMR', 'Payment Processors', 'Custom APIs'].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="rounded-full bg-maxom-orange bg-opacity-10 h-12 w-12 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-maxom-orange" />
                </div>
                <p className="font-medium">{integration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default Product;
