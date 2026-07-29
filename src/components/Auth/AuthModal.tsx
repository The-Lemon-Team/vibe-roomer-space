import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalMode,
    setAuthModalOpen,
    setAuthModalMode,
    login,
    register,
    isLoading,
    error,
    clearError,
  } = useAuthStore();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register(email, username, password, role);
      }
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (_) {
      // Error handled in auth store
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
      <div className="relative w-full max-w-md bg-zinc-950 border border-cyan-500/50 rounded-lg p-6 shadow-[0_0_30px_rgba(0,255,204,0.15)] text-zinc-100">
        {/* Modal Close Cross */}
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-cyan-400 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Tactical Header */}
        <div className="mb-6 border-b border-zinc-800 pb-3">
          <div className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase mb-1">
            [SYSTEM_AUTHENTICATION]
          </div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-100">
            {authModalMode === 'login' ? 'OPERATOR LOGIN' : 'REGISTER NEW OPERATOR'}
          </h2>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex border-b border-zinc-800 mb-6 text-xs">
          <button
            type="button"
            onClick={() => {
              clearError();
              setAuthModalMode('login');
            }}
            className={`flex-1 py-2 font-bold transition-colors text-center border-b-2 ${
              authModalMode === 'login'
                ? 'border-cyan-400 text-cyan-400 bg-cyan-950/20'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            [SIGN_IN]
          </button>
          <button
            type="button"
            onClick={() => {
              clearError();
              setAuthModalMode('register');
            }}
            className={`flex-1 py-2 font-bold transition-colors text-center border-b-2 ${
              authModalMode === 'register'
                ? 'border-amber-400 text-amber-400 bg-amber-950/20'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            [REGISTER]
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/60 rounded text-xs text-red-300">
            [ERROR]: {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {authModalMode === 'register' && (
            <div>
              <label className="block text-zinc-400 mb-1">USERNAME</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. cyber_operator"
                className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-zinc-400 mb-1">EMAIL ADDRESS</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@viberoom.net"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">PASSWORD</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded text-zinc-100 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {authModalMode === 'register' && (
            <div>
              <label className="block text-zinc-400 mb-1">ROLE ASSIGNMENT</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('USER')}
                  className={`py-2 px-3 border rounded text-center transition-colors font-bold ${
                    role === 'USER'
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                      : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  USER
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`py-2 px-3 border rounded text-center transition-colors font-bold ${
                    role === 'ADMIN'
                      ? 'border-amber-500 bg-amber-950/40 text-amber-300'
                      : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  ADMIN
                </button>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2.5 rounded font-bold uppercase transition-all flex justify-center items-center ${
                authModalMode === 'login'
                  ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/30'
                  : 'bg-amber-500/20 border border-amber-500 text-amber-400 hover:bg-amber-500/30'
              } disabled:opacity-50`}
            >
              {isLoading ? (
                <span>AUTHENTICATING...</span>
              ) : authModalMode === 'login' ? (
                <span>[EXECUTE_SIGN_IN]</span>
              ) : (
                <span>[CREATE_OPERATOR_ACCOUNT]</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
