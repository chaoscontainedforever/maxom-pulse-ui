
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Last updated: May 1, 2025
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At Maxom.ai, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our voice AI platform and visit our website.
            </p>
            
            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in various ways, including:
            </p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, company information, and other contact details you provide.</li>
              <li><strong>Voice Data:</strong> Audio recordings and transcriptions of calls processed by our voice AI.</li>
              <li><strong>Usage Information:</strong> How you interact with our service, including features used, time spent, and actions taken.</li>
              <li><strong>Device Information:</strong> Information about the device you use to access our service, including IP address, browser type, and operating system.</li>
              <li><strong>Analytics Data:</strong> Data collected through cookies and similar technologies about your usage patterns.</li>
            </ul>
            
            <h2>3. How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing and maintaining our service</li>
              <li>Improving and personalizing our service</li>
              <li>Processing payments and managing your account</li>
              <li>Responding to your inquiries and providing customer support</li>
              <li>Training and improving our voice AI technology</li>
              <li>Sending you marketing communications (with your consent)</li>
              <li>Complying with legal obligations</li>
            </ul>
            
            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
            
            <h2>5. Disclosure of Your Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party companies that perform services on our behalf, such as payment processing, data analysis, and customer support.</li>
              <li><strong>Business Partners:</strong> With your consent, we may share your information with our business partners.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets.</li>
            </ul>
            
            <h2>6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
              <li>Withdrawal of consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information in the "Contact Us" section.
            </p>
            
            <h2>7. Children's Privacy</h2>
            <p>
              Our service is not directed at children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.
            </p>
            
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@maxom.ai or use our <Link to="/contact" className="text-maxom-orange">Contact Page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
