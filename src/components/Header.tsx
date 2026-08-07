import React, { useState } from 'react';
import { 
  Grid, 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  UserCheck, 
  Sparkles,
  Briefcase,
  ChevronDown,
  Building2,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Key,
  Shield,
  Sliders
} from 'lucide-react';
import { Consultant, UserSession, UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  selectedConsultant: Consultant;
  consultants: Consultant[];
  onConsultantChange: (consultant: Consultant) => void;
  currentUser: UserSession | null;
  onLogout: () => void;
  onOpenRoleModal: () => void;
  onNavigateTab: (tab: any) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  selectedConsultant,
  consultants,
  onConsultantChange,
  currentUser,
  onLogout,
  onOpenRoleModal,
  onNavigateTab,
  isDarkMode,
  onToggleDarkMode,
  searchTerm,
  onSearchChange,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className={`h-16 border-b transition-colors duration-200 px-4 md:px-6 flex items-center justify-between sticky top-0 z-40 ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
    }`}>
      {/* Left: App Launcher & Logo */}
      <div className="flex items-center gap-3">
        <button 
          title="Microsoft 365 Launcher"
          className={`p-2 rounded-lg transition-colors ${
            isDarkMode ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          <Grid className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-bold">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
              INTERFLOW
            </span>
          </div>
        </div>
      </div>

      {/* Right: Admin Console Button, Theme, Notifications */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* If Admin, show shortcut to User Management */}
        {currentRole === 'Admin' && (
          <button
            onClick={() => onNavigateTab('admin-console')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="hidden md:inline">Console Admin</span>
          </button>
        )}

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          className={`p-2 rounded-xl border transition-colors ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
              : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
          }`}
          title="Basculer le mode sombre / clair"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button 
            title="Notifications InterFlow"
            className={`p-2 rounded-xl border relative transition-colors ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          </button>
        </div>

        {/* Selected User & Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' 
                : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <img 
              src={currentUser?.avatar || selectedConsultant.avatar} 
              alt={currentUser?.prenom || selectedConsultant.prenom}
              className="w-7 h-7 rounded-lg object-cover ring-2 ring-blue-500/50"
            />
            <div className="text-left hidden lg:block">
              <p className="text-xs font-bold leading-tight flex items-center gap-1">
                {currentUser ? `${currentUser.prenom} ${currentUser.nom}` : `${selectedConsultant.prenom} ${selectedConsultant.nom}`}
              </p>
              <p className="text-[10px] text-blue-500 font-semibold leading-none">
                {currentUser ? `Rôle: ${currentUser.role}` : `${selectedConsultant.grade}`}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}>
              {/* Active user header */}
              {currentUser && (
                <div className="p-3 border-b border-slate-200 dark:border-slate-800 mb-2 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl">
                  <div className="flex items-center gap-2.5">
                    <img src={currentUser.avatar} alt={currentUser.prenom} className="w-8 h-8 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold truncate">{currentUser.prenom} {currentUser.nom}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-slate-500">Rôle Assigné :</span>
                    <span className="font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {currentUser.role}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-1 space-y-1">
                {currentRole === 'Admin' && (
                  <button
                    onClick={() => {
                      onNavigateTab('admin-console');
                      setShowProfileMenu(false);
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors text-xs font-bold text-purple-400 ${
                      isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span>Console de Gestion Utilisateurs</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    onOpenRoleModal();
                    setShowProfileMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors text-xs font-semibold ${
                    isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Key className="w-4 h-4 text-blue-500" />
                  <span>Matrice des Rôles & Habilitations</span>
                </button>
              </div>

              {/* Consultant switcher section for demo */}
              {currentRole === 'Consultant' && (
                <>
                  <div className="p-2 border-t border-slate-200 dark:border-slate-800 my-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Changer de consultant démo</p>
                  </div>

                  {consultants.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onConsultantChange(c);
                        setShowProfileMenu(false);
                      }}
                      className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors text-xs ${
                        c.id === selectedConsultant.id
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <img src={c.avatar} alt={c.prenom} className="w-6 h-6 rounded-lg object-cover" />
                      <div className="truncate">
                        <p className="font-semibold text-xs truncate">{c.prenom} {c.nom}</p>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{c.title}</p>
                      </div>
                    </button>
                  ))}
                </>
              )}

              {/* Logout Button */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-colors text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Se déconnecter de la session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
