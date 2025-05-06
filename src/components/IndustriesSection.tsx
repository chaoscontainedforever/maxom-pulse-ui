
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, Utensils, Stethoscope, Car } from 'lucide-react';

const industries = [
  {
    id: 'restaurants',
    title: 'Restaurants',
    icon: <Utensils className="h-8 w-8 text-maxom-orange" />,
    description: 'Streamline order taking, handle reservation calls, and manage customer inquiries even when your staff is busy.',
    features: ['Order capture', 'Reservation management', 'Missed call handling', 'Menu information'],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: <Stethoscope className="h-8 w-8 text-maxom-orange" />,
    description: 'Automate appointment scheduling and routine patient inquiries while maintaining compliance and privacy standards.',
    features: ['Voice appointment booking', 'Insurance verification', 'Patient follow-up', 'Medical information'],
  },
  {
    id: 'home-services',
    title: 'Home Services',
    icon: <Phone className="h-8 w-8 text-maxom-orange" />,
    description: 'Never miss a potential customer. Our voice AI handles service inquiries and books appointments 24/7.',
    features: ['Appointment scheduling', 'Service information', 'Quote requests', 'Emergency dispatch'],
  },
  {
    id: 'fitness',
    title: 'Fitness Studios',
    icon: <Calendar className="h-8 w-8 text-maxom-orange" />,
    description: 'Handle class bookings, membership inquiries, and schedule changes while your staff focuses on in-person clients.',
    features: ['Class booking', 'Membership Q&A', 'Schedule information', 'Trainer availability'],
  },
  {
    id: 'auto',
    title: 'Auto Dealerships',
    icon: <Car className="h-8 w-8 text-maxom-orange" />,
    description: 'Manage service appointments, answer vehicle inquiries, and connect customers with sales representatives automatically.',
    features: ['Service scheduling', 'Parts availability', 'Vehicle information', 'Sales connections'],
  },
];

const IndustriesSection = () => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries We Serve</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our voice AI platform is tailored for specific industries, ensuring it understands the unique language and needs of your business.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {industries.map((industry) => (
            <button
              key={industry.id}
              onClick={() => setActiveIndustry(industry)}
              className={`rounded-full px-5 py-2 font-medium transition-all duration-200 ${
                activeIndustry.id === industry.id
                  ? 'bg-maxom-orange text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {industry.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeIndustry.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="bg-maxom-violet bg-opacity-10 rounded-full p-3 inline-block mb-6">
                {activeIndustry.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeIndustry.title}</h3>
              <p className="text-gray-700 mb-6">{activeIndustry.description}</p>
              
              <h4 className="font-semibold mb-4 text-lg">Key Features</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeIndustry.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="rounded-full bg-green-100 p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 bg-gradient-to-r from-maxom-violet to-maxom-orange p-8 md:p-12 text-white flex items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">See How It Works</h3>
                <p className="mb-6">Listen to our {activeIndustry.title.toLowerCase()} AI voice assistant handle a real customer interaction.</p>
                <div className="bg-white bg-opacity-20 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6200" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Sample Conversation</p>
                      <p className="text-sm text-white text-opacity-80">0:45</p>
                    </div>
                  </div>
                  <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-1/3 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesSection;
