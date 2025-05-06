
import { Link } from 'react-router-dom';

const Cookies = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="maxom-container">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Last updated: May 1, 2025
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md p-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              This Cookie Policy explains how Maxom.ai uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>
            
            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work more efficiently and to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, Maxom.ai) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>
            
            <h2>3. Why Do We Use Cookies?</h2>
            <p>
              We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.
            </p>
            
            <h2>4. Types of Cookies We Use</h2>
            <p>
              The specific types of first and third-party cookies served through our website and the purposes they perform include:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</li>
              <li><strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to its use.</li>
              <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</li>
              <li><strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting advertisements based on your interests.</li>
              <li><strong>Social Media Cookies:</strong> These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites.</li>
            </ul>
            
            <h2>5. How Can You Control Cookies?</h2>
            <p>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie banner on our website.
            </p>
            <p>
              You can also set or amend your web browser controls to accept or refuse cookies. Most web browsers allow you to control cookies through their settings preferences. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
            
            <h2>6. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. Any changes will become effective when we post the revised Cookie Policy on our website.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us at privacy@maxom.ai or use our <Link to="/contact" className="text-maxom-orange">Contact Page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cookies;
