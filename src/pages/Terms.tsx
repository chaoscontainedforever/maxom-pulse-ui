
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Last updated: May 1, 2025
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Maxom.ai. These Terms of Service govern your use of our website, products, and services. By accessing or using Maxom.ai, you agree to be bound by these Terms.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              "Service" refers to the Maxom.ai voice AI platform, including all features, tools, and applications provided by Maxom.ai.
            </p>
            <p>
              "User" refers to individuals who access or use our Service, including clients, authorized users, and visitors to our website.
            </p>
            
            <h2>3. Account Terms</h2>
            <p>
              To use certain aspects of our Service, you may be required to create an account. You are responsible for maintaining the security of your account and password. Maxom.ai cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.
            </p>
            
            <h2>4. Service Access and Usage</h2>
            <p>
              Subject to these Terms, Maxom.ai grants you a limited, non-exclusive, non-transferable license to access and use our Service. You agree not to:
            </p>
            <ul>
              <li>Use the Service for any illegal purpose or in violation of any laws</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Copy, modify, or create derivative works of the Service or any content</li>
              <li>Use the Service to store or transmit harmful code</li>
              <li>Share, resell, or lease your access to the Service to others</li>
            </ul>
            
            <h2>5. Data Usage and Privacy</h2>
            <p>
              Our collection and use of your personal information is governed by our <Link to="/privacy" className="text-maxom-orange">Privacy Policy</Link>. By using our Service, you consent to our data practices as outlined in that policy.
            </p>
            
            <h2>6. Service Modifications and Updates</h2>
            <p>
              Maxom.ai reserves the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We may also update these Terms from time to time. Continued use of the Service after any such changes constitutes your consent to such changes.
            </p>
            
            <h2>7. Billing and Payments</h2>
            <p>
              Certain features of our Service may require payment. Payment terms are specified at the time of purchase. All payments are non-refundable unless expressly stated otherwise.
            </p>
            
            <h2>8. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software code, are owned by Maxom.ai and are protected by intellectual property laws.
            </p>
            
            <h2>9. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            
            <h2>10. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL MAXOM.AI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
            </p>
            
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@maxom.ai or use our <Link to="/contact" className="text-maxom-orange">Contact Page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
