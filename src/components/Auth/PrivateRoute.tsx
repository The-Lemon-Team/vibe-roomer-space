import React from 'react';
import { useAuthStore } from '../../store/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, user, setAuthModalOpen } = useAuthStore();

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-zinc-800 rounded bg-zinc-900/60 font-mono text-center space-y-4">
        <div className="text-amber-400 font-bold text-sm uppercase">
          [RESTRICTED_ACCESS_ROUTE]
        </div>
        <p className="text-xs text-zinc-400 max-w-md">
          Authentication required to view or modify this resource. Please sign in to your operator account.
        </p>
        <button
          onClick={() => setAuthModalOpen(true, 'login')}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded text-xs font-bold hover:bg-cyan-500/30 transition-colors uppercase"
        >
          [AUTHENTICATE_OPERATOR]
        </button>
      </div>
    );
  }

  if (requireAdmin && user?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-red-500/40 rounded bg-red-950/20 font-mono text-center space-y-3">
        <div className="text-red-400 font-bold text-sm uppercase">
          [ADMIN_AUTHORIZATION_REQUIRED]
        </div>
        <p className="text-xs text-zinc-400">
          Only operators with ADMIN privileges can access this route.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
