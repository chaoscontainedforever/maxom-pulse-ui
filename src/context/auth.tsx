
// This file now serves as a re-export to maintain backward compatibility
// while the actual implementation has been moved to src/context/auth/index.tsx

export { AuthContext, AuthProvider, useAuth } from './auth/index';

// Types re-exports for backward compatibility
export type { AuthContextType } from './auth/types';
