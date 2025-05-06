
import { motion } from 'framer-motion';
import { MapPin, Building, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSection from "@/components/NewsletterSection";

const careersData = {
  openPositions: [
    {
      id: 1,
      title: "Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Develop and improve our voice recognition models and natural language processing systems."
    },
    {
      id: 2,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build intuitive user interfaces for our voice AI management console and client-facing applications."
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York, NY",
      type: "Full-time",
      description: "Help our clients successfully implement and maximize value from our voice AI platform."
    },
    {
      id: 4,
      title: "AI Voice Trainer",
      department: "AI Training",
      location: "Remote",
      type: "Contract",
      description: "Help train and refine our voice AI models for specific industries and use cases."
    },
    {
      id: 5,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Define product strategy and roadmap for our voice AI platform and integrations."
    },
    {
      id: 6,
      title: "Sales Development Representative",
      department: "Sales",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Identify and engage with potential clients to demonstrate the value of our voice AI solutions."
    }
  ],
  benefits: [
    {
      title: "Health & Wellness",
      items: ["Comprehensive health insurance", "Mental health benefits", "Gym membership", "Wellness stipend"]
    },
    {
      title: "Work-Life Balance",
      items: ["Flexible work hours", "Remote work options", "Unlimited PTO", "Paid parental leave"]
    },
    {
      title: "Growth & Development",
      items: ["Learning & development budget", "Conference stipends", "Career coaching", "Internal mobility"]
    },
    {
      title: "Team & Culture",
      items: ["Regular team events", "Lunch & learns", "Volunteer opportunities", "Diverse & inclusive workplace"]
    }
  ]
};

const Careers = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="maxom-container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're on a mission to transform how businesses communicate with their customers. Join us in building the next generation of voice AI.
          </p>
        </div>
        
        <div className="bg-gradient-main rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="md:flex">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Culture</h2>
              <p className="mb-6">
                At Maxom.ai, we're passionate about using AI to solve real business problems. Our team combines expertise in machine learning, linguistics, and business operations to create voice solutions that sound and respond like your best team members.
              </p>
              <p>
                We believe in creating a workplace where innovation thrives, diverse perspectives are valued, and everyone has the opportunity to make an impact.
              </p>
            </div>
            <div className="md:w-1/2 md:pl-12 mt-8 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop" 
                alt="Maxom.ai team" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careersData.openPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-3">{position.title}</h3>
                <div className="flex flex-wrap gap-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm mr-4">
                    <Building className="h-4 w-4 mr-1" />
                    {position.department}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mr-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    {position.location}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Briefcase className="h-4 w-4 mr-1" />
                    {position.type}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{position.description}</p>
                <Link 
                  to={`/careers/${position.id}`} 
                  className="bg-maxom-orange text-white rounded-full py-2 px-6 inline-flex items-center hover:opacity-90 transition-opacity"
                >
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careersData.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                <h3 className="font-bold mb-4 text-center">{benefit.title}</h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <div className="rounded-full bg-green-100 p-1 mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default Careers;
