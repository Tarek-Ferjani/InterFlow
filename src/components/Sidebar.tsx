import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Sparkles, 
  GraduationCap, 
  Target, 
  Bot, 
  Users, 
  BarChart3, 
  ShieldCheck,
  Lock,
  UserPlus
} from 'lucide-react';
import { UserRole } from '../types';

export type ActiveTab = 
  | 'dashboard-consultant'
  | 'gestion-cv'
  | 'generation-cv'
  | 'formations'
  | 'matching-missions'
  | 'copilot-rh'
  | 'dashboard-manager'
  | 'dashboard-rh'
  | 'admin-console';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  currentRole: UserRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isDarkMode,
  currentRole,
}) => {
  // Navigation sections filtered strictly according to user's assigned role
  const mainNav = [
    {
      id: 'dashboard-consultant' as ActiveTab,
      label: 'Dashboard Consultant',
      icon: LayoutDashboard,
      badge: 'Mon Suivi',
      roles: ['Consultant']
    },
    {
      id: 'gestion-cv' as ActiveTab,
      label: 'Gestion & Analyse CV IA',
      icon: FileText,
      badge: 'ATS Score',
      roles: ['Consultant']
    },
    {
      id: 'generation-cv' as ActiveTab,
      label: 'Génération CV 4-en-1',
      icon: Sparkles,
      badge: 'Templates',
      roles: ['Consultant']
    },
    {
      id: 'formations' as ActiveTab,
      label: 'Recommandation Formations',
      icon: GraduationCap,
      badge: 'MS Learn',
      roles: ['Consultant']
    },
    {
      id: 'matching-missions' as ActiveTab,
      label: 'Matching Missions',
      icon: Target,
      badge: 'Scoring IA',
      roles: ['Consultant', 'Manager']
    },
    {
      id: 'copilot-rh' as ActiveTab,
      label: 'Copilot RH',
      icon: Bot,
      badge: 'IA Chat',
      highlight: true,
      roles: ['Consultant']
    }
  ].filter(item => item.roles.includes(currentRole));

  const managementNav = [
    {
      id: 'dashboard-manager' as ActiveTab,
      label: 'Dashboard Manager',
      icon: Users,
      badge: 'Bench Intercontrat',
      roles: ['Manager']
    },
    {
      id: 'dashboard-rh' as ActiveTab,
      label: 'Dashboard RH',
      icon: BarChart3,
      badge: 'Analytics GPEC',
      roles: ['RH']
    }
  ].filter(item => item.roles.includes(currentRole));

  const adminNav = [
    {
      id: 'admin-console' as ActiveTab,
      label: 'Console Utilisateurs & Droits',
      icon: ShieldCheck,
      badge: 'Admin SI',
      highlightAdmin: true,
      roles: ['Admin']
    }
  ].filter(item => item.roles.includes(currentRole));

  return (
    <aside className={`w-64 border-r flex flex-col justify-between shrink-0 transition-colors duration-200 ${
      isDarkMode ? 'bg-[#1e1e1e] border-slate-800 text-slate-200' : 'bg-white border-[#EDEBE9] text-[#323130]'
    }`}>
      <div className="p-3 space-y-5 overflow-y-auto">
        {/* Admin Section (Only for Admin Role) */}
        {adminNav.length > 0 && (
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-400">
                Administration & Governance SI
              </span>
            </div>

            <nav className="space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-all group rounded-xl ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-md'
                        : isDarkMode
                        ? 'text-purple-300 hover:bg-purple-950/40'
                        : 'text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>

                    <span className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {item.badge}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Section 1: Espace Consultant & IA */}
        {mainNav.length > 0 && (
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Espace Consultant & IA
              </span>
            </div>

            <nav className="space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-all group rounded-md ${
                      isActive
                        ? isDarkMode
                          ? 'bg-slate-800 text-[#0078D4] border-l-4 border-[#0078D4] font-semibold'
                          : 'bg-[#F3F2F1] text-[#0078D4] border-l-4 border-[#0078D4] font-semibold'
                        : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800/60 border-l-4 border-transparent'
                        : 'text-[#605E5C] hover:bg-[#FAF9F8] hover:text-[#0078D4] border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-[#0078D4]' : item.highlight ? 'text-amber-500' : 'text-slate-400'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide shrink-0 ${
                        isActive 
                          ? 'bg-[#0078D4]/15 text-[#0078D4]' 
                          : item.highlight
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-[#EDEBE9] text-[#323130]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Section 2: Management & RH */}
        {managementNav.length > 0 && (
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pilotage Staffing & RH
              </span>
            </div>

            <nav className="space-y-1">
              {managementNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-all group rounded-md ${
                      isActive
                        ? isDarkMode
                          ? 'bg-slate-800 text-[#0078D4] border-l-4 border-[#0078D4] font-semibold'
                          : 'bg-[#F3F2F1] text-[#0078D4] border-l-4 border-[#0078D4] font-semibold'
                        : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-800/60 border-l-4 border-transparent'
                        : 'text-[#605E5C] hover:bg-[#FAF9F8] hover:text-[#0078D4] border-l-4 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isActive ? 'text-[#0078D4]' : 'text-slate-400'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide shrink-0 ${
                        isActive 
                          ? 'bg-[#0078D4]/15 text-[#0078D4]' 
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-[#EDEBE9] text-[#323130]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Footer Banner info */}
      <div className={`p-3 border-t text-xs ${
        isDarkMode ? 'border-slate-800 bg-slate-900/50 text-slate-400' : 'border-slate-200 bg-white/60 text-slate-500'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="font-semibold text-[11px] text-slate-700 dark:text-slate-300">Dataverse RBAC In-Effect</span>
        </div>
        <p className="text-[10px] leading-tight text-slate-400">
          Isolation stricte par rôle active ({currentRole}).
        </p>
      </div>
    </aside>
  );
};
