
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Maxom.ai has transformed our restaurant's phone management. We never miss an order now, even during rush hours.",
    name: "Sarah Chen",
    position: "Owner, Bistro Moderne",
    gradientClass: "bg-gradient-card1",
  },
  {
    quote: "Our patients love the natural-sounding voice assistant. It's helping us book 40% more appointments without adding staff.",
    name: "Dr. Michael Rodriguez",
    position: "Director, HealthFirst Clinic",
    gradientClass: "bg-gradient-card2",
  },
  {
    quote: "The voice AI learns our availability in real-time. Our service technicians can focus on repairs while it handles all calls.",
    name: "Jennifer Patel",
    position: "Operations Manager, Home Experts",
    gradientClass: "bg-gradient-card3",
  },
  {
    quote: "As a fitness studio owner, I'm amazed by how the AI handles complex membership questions and class bookings effortlessly.",
    name: "Jason Lee",
    position: "Founder, FlexFit Studios",
    gradientClass: "bg-gradient-card1",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="maxom-container">
        <div className="flex items-center mb-12">
          <div className="bg-maxom-orange text-white rounded-full px-4 py-1 text-sm font-medium">
            Testimonials
          </div>
          <div className="h-px bg-gray-200 flex-1 ml-4"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What our clients say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${testimonial.gradientClass} gradient-card`}
            >
              <div className="mb-6">
                <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.7 29.2001C8.3 29.2001 5.5 28.1001 3.3 25.9001C1.1 23.7001 0 20.9001 0 17.5001C0 14.5001 0.8 11.8001 2.4 9.40006C4 7.00006 6.2 5.00006 9 3.40006C11.8 1.80006 15 0.800059 18.6 0.400059L19.5 4.10006C16.1 4.90006 13.4 6.20006 11.4 8.00006C9.4 9.80006 8.3 11.8001 8.1 14.0001C8.7 13.6001 9.7 13.4001 11.1 13.4001C13.5 13.4001 15.5 14.2001 17.1 15.8001C18.7 17.4001 19.5 19.4001 19.5 21.8001C19.5 24.2001 18.7 26.2001 17.1 27.8001C15.5 28.8001 13.7 29.2001 11.7 29.2001ZM34.2 29.2001C30.8 29.2001 28 28.1001 25.8 25.9001C23.6 23.7001 22.5 20.9001 22.5 17.5001C22.5 14.5001 23.3 11.8001 24.9 9.40006C26.5 7.00006 28.7 5.00006 31.5 3.40006C34.3 1.80006 37.5 0.800059 41.1 0.400059L42 4.10006C38.6 4.90006 35.9 6.20006 33.9 8.00006C31.9 9.80006 30.8 11.8001 30.6 14.0001C31.2 13.6001 32.2 13.4001 33.6 13.4001C36 13.4001 38 14.2001 39.6 15.8001C41.2 17.4001 42 19.4001 42 21.8001C42 24.2001 41.2 26.2001 39.6 27.8001C38 28.8001 36.2 29.2001 34.2 29.2001Z" fill="white" fillOpacity="0.4"/>
                </svg>
              </div>
              
              <p className="text-xl mb-8">{testimonial.quote}</p>
              
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-white text-opacity-80">{testimonial.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
