
import { motion } from 'framer-motion';
import { Utensils, Stethoscope, Phone, Calendar, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSection from "@/components/NewsletterSection";

const solutions = [
  {
    icon: <Utensils className="h-10 w-10" />,
    title: "Restaurants",
    description: "Never miss another takeout order or reservation call. Our voice AI handles orders, answers menu questions, and manages reservations.",
    features: ["Order capture", "Missed call handling", "Reservation management", "Menu information"],
    gradientClass: "bg-gradient-card1"
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Healthcare",
    description: "Streamline patient scheduling and information. HIPAA-compliant voice AI provides 24/7 appointment booking and routine information.",
    features: ["Voice appointment booking", "Insurance verification", "Patient follow-up", "Medical information"],
    gradientClass: "bg-gradient-card2"
  },
  {
    icon: <Phone className="h-10 w-10" />,
    title: "Home Services",
    description: "Boost booking capacity and never miss a call. Our voice AI schedules service appointments and answers customer inquiries.",
    features: ["Appointment scheduling", "Service information", "Quote requests", "Emergency dispatch"],
    gradientClass: "bg-gradient-card3"
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Fitness Studios",
    description: "Automate class bookings and inquiries. Let our voice AI handle scheduling while your team focuses on in-person clients.",
    features: ["Class booking", "Membership Q&A", "Schedule information", "Trainer availability"],
    gradientClass: "bg-gradient-card1"
  },
  {
    icon: <Car className="h-10 w-10" />,
    title: "Auto Dealerships",
    description: "Manage service appointments and inquiries effortlessly. Our voice AI schedules maintenance visits and answers vehicle questions.",
    features: ["Service scheduling", "Parts availability", "Vehicle information", "Sales connections"],
    gradientClass: "bg-gradient-card2"
  }
];

const Solutions = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="maxom-container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Industry-Specific Voice AI Solutions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our voice AI platform is tailored for specific industries, with customized vocabularies and workflows to meet your unique needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className={`${solution.gradientClass} p-6 text-white`}>
                <div className="bg-white bg-opacity-20 rounded-full p-4 inline-block mb-4">
                  {solution.icon}
                </div>
                <h2 className="text-2xl font-bold mb-2">{solution.title}</h2>
                <p className="mb-4">{solution.description}</p>
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2 mb-6">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="rounded-full bg-green-100 p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link to="/contact" className="text-maxom-orange font-medium flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="py-16 bg-gradient-main">
        <div className="maxom-container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to see Maxom.ai in action?</h2>
            <p className="text-lg mb-8">
              Schedule a demo to see how our voice AI can transform your customer communications.
            </p>
            <Link to="/contact" className="bg-white text-maxom-orange hover:bg-opacity-90 rounded-full py-3 px-8 font-semibold transition-all duration-200 inline-flex items-center">
              Request Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default Solutions;
