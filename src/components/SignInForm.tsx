
// This component is now integrated directly into the Login page
// This file is kept for backward compatibility but its functionality
// has been moved to src/pages/Login.tsx

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

const SignInForm = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  // Functionality moved to Login.tsx
  return null;
};

export default SignInForm;
