import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeroContent {
  badgeText: string;
  heading: string;
  subheading: string;
}

const defaultContent: HeroContent = {
  badgeText: "Introducing Voice AI",
  heading: "The Voice AI That <span class=\"gradient-text\">Talks Like Your Team</span>",
  subheading: "Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human."
};

const HeroSection = () => {
  const [content, setContent] = useState<HeroContent>(defaultContent);

  useEffect(() => {
    // Check if there's any CMS content stored in localStorage
    const savedContent = localStorage.getItem('cms_hero_content');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        // Format the heading to include the gradient text span if not already present
        if (!parsedContent.heading.includes("gradient-text")) {
          parsedContent.heading = `The Voice AI That <span class="gradient-text">${parsedContent.heading.replace("The Voice AI That ", "")}</span>`;
        }
        setContent(parsedContent);
      } catch (e) {
        console.error("Error parsing saved hero content:", e);
      }
    }
  }, []);

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      <div className="maxom-container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-block bg-maxom-violet bg-opacity-10 rounded-full px-4 py-1 mb-6">
            <span className="text-maxom-violet font-medium">{content.badgeText}</span>
          </div>
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            dangerouslySetInnerHTML={{ __html: content.heading }}
          />
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {content.subheading}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link to="/contact" className="btn-primary">
              Request Access <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/product" className="btn-outline">
              See How It Works
            </Link>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative rounded-2xl shadow-xl mx-auto bg-white dark:bg-card p-2 max-w-5xl"
          >
            <div className="bg-gradient-main rounded-xl p-1 mb-2">
              <div className="bg-black rounded-lg h-14 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-main flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Voice assistant conversation preview</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Click demo to hear sample</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
