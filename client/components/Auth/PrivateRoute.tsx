import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAuthModalOpen } from '../../store/authSlice';
import { setTagMode } from '../../store/uiSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireAdmin = false }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);
  const user = useAppSelector((s) => s.auth.user);
  const deniedAdmin = requireAdmin && isAuthenticated && user?.role !== 'ADMIN';

  // Non-admins hitting #/admin fall back to Live (public main feed)
  useEffect(() => {
    if (deniedAdmin) {
      dispatch(setTagMode('all_vibes'));
    }
  }, [deniedAdmin, dispatch]);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-zinc-800 rounded bg-zinc-900/60 font-mono text-center space-y-4">
        <div className="text-amber-400 font-bold text-sm uppercase">
          {t('auth.restricted')}
        </div>
        <p className="text-xs text-zinc-400 max-w-md">
          {t('auth.authRequired')}
        </p>
        <button
          onClick={() => dispatch(setAuthModalOpen({ open: true, mode: 'login' }))}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 text-cyan-400 rounded text-xs font-bold hover:bg-cyan-500/30 transition-colors uppercase"
        >
          {t('auth.authenticateOperator')}
        </button>
      </div>
    );
  }

  if (requireAdmin && user?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-red-500/40 rounded bg-red-950/20 font-mono text-center space-y-3">
        <div className="text-red-400 font-bold text-sm uppercase">
          {t('auth.adminRequired')}
        </div>
        <p className="text-xs text-zinc-400">
          {t('auth.adminOnly')}
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
