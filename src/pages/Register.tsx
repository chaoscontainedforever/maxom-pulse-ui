
import SignUpForm from "@/components/SignUpForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Redirect to onboarding if the user is already authenticated
  useEffect(() => {
    if (user) {
      console.log("User already authenticated, redirecting to onboarding...");
      navigate('/onboarding');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <SignUpForm />
    </div>
  );
};

export default Register;
