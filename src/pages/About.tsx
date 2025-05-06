
import { motion } from 'framer-motion';
import NewsletterSection from "@/components/NewsletterSection";

const timelineEvents = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Maxom.ai was founded with a mission to make voice AI technology accessible to businesses of all sizes."
  },
  {
    year: "2023",
    title: "First Deployment",
    description: "Our first voice assistant was deployed for a restaurant chain, reducing missed calls by 87% and increasing bookings by 35%."
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Expanded into healthcare, home services, fitness, and automotive industries with specialized voice AI solutions."
  },
  {
    year: "2025",
    title: "The Future",
    description: "Building the next generation of conversational AI that learns, adapts, and delivers exceptional customer experiences."
  }
];

const About = () => {
  return (
    <div className="min-h-screen pt-24">
      <div className="maxom-container">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're transforming how businesses handle voice communications by combining cutting-edge AI with human expertise.
          </p>
        </div>
        
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Mission</h2>
              <p className="text-gray-700 mb-4">
                At Maxom.ai, our mission is to help businesses deliver exceptional customer service through AI-powered voice assistants that sound and respond just like your best team members.
              </p>
              <p className="text-gray-700 mb-4">
                We believe that technology should enhance human capabilities, not replace them. Our voice AI frees your team from repetitive tasks so they can focus on what matters most - building relationships and solving complex problems.
              </p>
              <p className="text-gray-700">
                Every business deserves access to enterprise-level AI technology that's affordable, adaptable, and easy to implement.
              </p>
            </div>
            <div>
              <div className="bg-gradient-main rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Our Values</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="rounded-full bg-white bg-opacity-20 p-2 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Excellence</h4>
                      <p className="text-white text-opacity-80">We strive for perfection in every voice interaction.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-white bg-opacity-20 p-2 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v4"></path>
                        <path d="M12 18v4"></path>
                        <path d="M4.93 4.93l2.83 2.83"></path>
                        <path d="M16.24 16.24l2.83 2.83"></path>
                        <path d="M2 12h4"></path>
                        <path d="M18 12h4"></path>
                        <path d="M4.93 19.07l2.83-2.83"></path>
                        <path d="M16.24 7.76l2.83-2.83"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Innovation</h4>
                      <p className="text-white text-opacity-80">We continuously push the boundaries of what voice AI can do.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-white bg-opacity-20 p-2 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Customer Focus</h4>
                      <p className="text-white text-opacity-80">Everything we do aims to improve our clients' operations.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="rounded-full bg-white bg-opacity-20 p-2 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold">Security</h4>
                      <p className="text-white text-opacity-80">We maintain the highest standards of data protection.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-gray-200"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div className={`md:flex items-center ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                    <div className="md:w-1/2 mb-6 md:mb-0 md:pr-12 md:text-right">
                      {index % 2 === 0 ? (
                        <>
                          <div className="bg-maxom-orange text-white inline-block rounded-full px-4 py-1 text-sm font-medium mb-2">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-gray-600 mt-2">{event.description}</p>
                        </>
                      ) : (
                        <div className="md:hidden">
                          <div className="bg-maxom-orange text-white inline-block rounded-full px-4 py-1 text-sm font-medium mb-2">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-main border-4 border-white flex items-center justify-center text-white font-bold z-10">
                      {index + 1}
                    </div>
                    
                    <div className="md:w-1/2 md:pl-12">
                      {index % 2 !== 0 && (
                        <div className="hidden md:block">
                          <div className="bg-maxom-orange text-white inline-block rounded-full px-4 py-1 text-sm font-medium mb-2">
                            {event.year}
                          </div>
                          <h3 className="text-xl font-bold">{event.title}</h3>
                          <p className="text-gray-600 mt-2">{event.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-20">
          <div className="bg-gradient-main rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-playfair italic">Made By AI & Human</h2>
            <p className="text-xl max-w-3xl mx-auto">
              Our voice AI technology represents the perfect harmony between cutting-edge artificial intelligence and human expertise, delivering experiences that are both technologically advanced and deeply human.
            </p>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default About;
