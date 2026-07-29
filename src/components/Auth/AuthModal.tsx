import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { BaseModal } from '../Common/BaseModal';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register(email, username, password);
      }
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (_) {
      // Error handled in auth store
    }
  };

  return (
    <BaseModal
      isOpen={isAuthModalOpen}
      onClose={() => setAuthModalOpen(false)}
      systemTag="[SYSTEM_AUTHENTICATION]"
      title={authModalMode === 'login' ? 'USER LOGIN' : 'REGISTER NEW PROFILE'}
      maxWidth="max-w-md"
      containerClassName="p-6"
    >
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
              <span>[CREATE]</span>
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};
