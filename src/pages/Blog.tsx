
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NewsletterSection from "@/components/NewsletterSection";

const blogPosts = [
  {
    id: 1,
    title: "How Voice AI is Transforming Customer Service",
    excerpt: "Discover how businesses are using voice AI to improve customer experiences and reduce response times.",
    date: "May 2, 2025",
    author: "Emily Chen",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: 2,
    title: "The Future of Voice Technology in Healthcare",
    excerpt: "From appointment scheduling to patient follow-ups, voice AI is making healthcare more accessible.",
    date: "April 28, 2025",
    author: "Dr. Michael Rivera",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
  },
  {
    id: 3,
    title: "Voice AI vs. Traditional Call Centers: A Cost Analysis",
    excerpt: "Breaking down the numbers: How voice AI can reduce operational costs while improving service quality.",
    date: "April 21, 2025",
    author: "Sarah Johnson",
    category: "Business",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
  },
  {
    id: 4,
    title: "Best Practices for Voice AI Implementation",
    excerpt: "A step-by-step guide to successfully implementing voice AI in your business without disrupting operations.",
    date: "April 15, 2025",
    author: "Alex Torres",
    category: "Implementation Guide",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
  },
  {
    id: 5,
    title: "Voice AI Privacy and Security: What You Need to Know",
    excerpt: "Understanding the security measures that protect sensitive information in voice AI interactions.",
    date: "April 10, 2025",
    author: "Daniel Wong",
    category: "Security",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095"
  },
  {
    id: 6,
    title: "How Restaurants Are Boosting Revenue with Voice AI",
    excerpt: "Case studies showing how restaurants have increased bookings and order accuracy with voice AI.",
    date: "April 5, 2025",
    author: "Maria Garcia",
    category: "Success Stories",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Maxom.ai Blog</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Insights, updates, and best practices for implementing voice AI in your business.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 mb-16">
          <div className="w-full lg:w-8/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`${post.image}?w=600&h=400&fit=crop`} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span className="bg-maxom-orange bg-opacity-10 text-maxom-orange rounded-full px-3 py-1">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <Link to={`/blog/${post.id}`} className="text-maxom-orange font-medium flex items-center hover:underline">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-3/12 lg:ml-auto">
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {["All Posts", "Industry Insights", "Implementation Guide", "Success Stories", "Healthcare", "Business", "Security"].map((category) => (
                  <li key={category}>
                    <Link to={`/blog/category/${category.toLowerCase().replace(" ", "-")}`} className="text-gray-600 hover:text-maxom-orange">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={`popular-${post.id}`} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                      <img 
                        src={`${post.image}?w=100&h=100&fit=crop`} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default Blog;
