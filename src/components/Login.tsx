import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  KeyRound, 
  ArrowRight, 
  ShieldAlert,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserSession } from '../types';
import { DEFAULT_USERS } from '../mockData';

interface LoginProps {
  onLogin: (user: UserSession) => void;
  isDarkMode: boolean;
  usersList?: UserSession[];
}

export const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, usersList }) => {
  const activeUsersList = usersList && usersList.length > 0 ? usersList : DEFAULT_USERS;
  
  // Default to Admin user if available, otherwise default admin email
  const adminUser = activeUsersList.find(u => u.role === 'Admin') || activeUsersList[0];
  
  const [email, setEmail] = useState<string>(adminUser?.email || 'a.kershaw@interflow-esn.com');
  const [password, setPassword] = useState<string>('●●●●●●●●●●●●');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      // Find matching user in the system or log in as Admin
      const matched = activeUsersList.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      
      if (matched) {
        // Authenticate as matched user with Admin privileges
        onLogin({
          ...matched,
          role: 'Admin', // Admin privileges guaranteed for admin login portal
          status: 'Actif',
          lastLogin: 'En ce moment'
        });
      } else {
        // Create new Admin session for new admin email
        const emailParts = email.split('@')[0].split('.');
        const prenom = emailParts[0] ? emailParts[0].charAt(0).toUpperCase() + emailParts[0].slice(1) : 'Admin';
        const nom = emailParts[1] ? emailParts[1].charAt(0).toUpperCase() + emailParts[1].slice(1) : 'InterFlow';

        onLogin({
          id: `user-admin-${Date.now()}`,
          nom,
          prenom,
          email: email.trim(),
          role: 'Admin',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
          title: 'Administrateur SI & Gouvernance InterFlow',
          department: 'Direction des Systèmes d\'Information',
          status: 'Actif',
          lastLogin: 'En ce moment'
        });
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Header bar */}
      <div className={`w-full px-6 py-4 border-b flex items-center justify-between ${
        isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white/80'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                INTERFLOW
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Espace Admin SI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Plateforme d'Administration & Gestion des Profils Intercontrat
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Accès Administrateur Restreint</span>
        </div>
      </div>

      {/* Main Login Area */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Connexion <span className="text-purple-500">InterFlow</span>
            </h1>
          </div>

          {/* Admin Login Form Card */}
          <div className={`p-6 md:p-8 rounded-3xl border shadow-xl flex flex-col justify-between ${
            isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div>
              {/* Form Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold">Connexion</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Saisissez votre adresse email et mot de passe</p>
                </div>
                <div className="w-9 h-9 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                  <KeyRound className="w-4 h-4" />
                </div>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="email@interflow-esn.com"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500 focus:border-transparent'
                        : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-purple-500 focus:border-transparent'
                    }`}
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Mot de passe"
                      className={`w-full pl-3.5 pr-10 py-2.5 text-xs rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        isDarkMode
                          ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500 focus:border-transparent'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:ring-purple-500 focus:border-transparent'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Vérification des identifiants...</span>
                    </>
                  ) : (
                    <>
                      <span>Se connecter</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`px-6 py-3 border-t text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between ${
        isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-slate-100/60'
      }`}>
        <p>© 2026 InterFlow — Console d'Administration & Gestion des Profils</p>
        <div className="flex gap-4 font-medium">
          <a href="#privacy" onClick={e=>e.preventDefault()} className="hover:underline">Confidentialité</a>
          <a href="#terms" onClick={e=>e.preventDefault()} className="hover:underline">Conditions d'utilisation</a>
          <a href="#support" onClick={e=>e.preventDefault()} className="hover:underline">Support IT</a>
        </div>
      </div>
    </div>
  );
};
