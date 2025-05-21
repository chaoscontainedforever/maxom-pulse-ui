
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const SEO = ({
  title = 'Maxom.ai | The Voice AI That Talks Like Your Team',
  description = 'Automate calls, bookings, and customer support with voice AI that sounds natural and handles real conversations like a human.',
  keywords = 'voice ai, conversational ai, ai phone assistant, ai booking, restaurant ai, healthcare ai',
  ogImage = 'https://maxom.ai/images/og-image.jpg', // This will need to be updated with your actual OG image
  ogType = 'website',
  canonicalUrl = 'https://maxom.ai', // Replace with your actual domain
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;
