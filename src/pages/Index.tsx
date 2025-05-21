
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FeatureSection from "@/components/FeatureSection";
import NewsletterSection from "@/components/NewsletterSection";

const Index = () => {
  const organizationData = {
    name: "Maxom.ai",
    url: "https://maxom.ai",
    logo: "https://maxom.ai/logo.png",
    sameAs: [
      "https://twitter.com/maxom_ai",
      "https://linkedin.com/company/maxom-ai"
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-123-4567',
      contactType: 'customer service'
    }
  };

  const productData = {
    name: "Maxom Voice AI Assistant",
    description: "Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human.",
    offers: {
      '@type': 'Offer',
      price: '99.00',
      priceCurrency: 'USD'
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Maxom.ai | The Voice AI That Talks Like Your Team" 
        description="Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human."
        keywords="voice ai, ai assistant, call automation, ai booking system, customer service ai"
      />
      <StructuredData type="Organization" data={organizationData} />
      <StructuredData type="Product" data={productData} />
      <HeroSection />
      <IndustriesSection />
      <FeatureSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;
