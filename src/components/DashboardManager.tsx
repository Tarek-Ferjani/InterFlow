import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  Building, 
  Send,
  Zap,
  BarChart2,
  UserCheck,
  Plus
} from 'lucide-react';
import { Consultant, Formation, Mission } from '../types';
import { AddMissionModal } from './AddMissionModal';
import { AddFormationModal } from './AddFormationModal';

interface DashboardManagerProps {
  consultants: Consultant[];
  missions: Mission[];
  formations?: Formation[];
  isDarkMode: boolean;
  onSelectConsultant: (consultant: Consultant) => void;
  onNavigateTab: (tab: any) => void;
  onAddMission?: (mission: Mission) => void;
  onAddFormation?: (formation: Formation) => void;
}

export const DashboardManager: React.FC<DashboardManagerProps> = ({
  consultants,
  missions,
  formations = [],
  isDarkMode,
  onSelectConsultant,
  onNavigateTab,
  onAddMission,
  onAddFormation,
}) => {
  const [isAddMissionOpen, setIsAddMissionOpen] = useState(false);
  const [isAddFormationOpen, setIsAddFormationOpen] = useState(false);

  const totalIntercontrat = consultants.length;
  const avgJoursIntercontrat = Math.round(
    consultants.reduce((acc, c) => acc + c.joursIntercontrat, 0) / (consultants.length || 1)
  );
  const avgEmployabilite = Math.round(
    consultants.reduce((acc, c) => acc + c.employabilite, 0) / (consultants.length || 1)
  );
  const totalCertsObtenues = consultants.reduce((acc, c) => acc + c.certifications.length, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
              <Users className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Module Staffing Manager & Direction ESN
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Pilotage du Bench & Staffing Intercontrat
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Suivi opérationnel des consultants, publication de nouvelles missions et gestion du catalogue de formations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onAddMission && (
            <button 
              onClick={() => setIsAddMissionOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publier une Mission Client</span>
            </button>
          )}

          {onAddFormation && (
            <button 
              onClick={() => setIsAddFormationOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Formation</span>
            </button>
          )}

          <button 
            onClick={() => onNavigateTab('matching-missions')}
            className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition-all flex items-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-300" />
            <span>Matching IA</span>
          </button>
        </div>
      </div>

      {/* Manager KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Bench Intercontrat</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalIntercontrat}</p>
          <p className="text-[10px] text-slate-500 font-medium">consultants actifs</p>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Durée Moyenne</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{avgJoursIntercontrat}j</p>
          <p className="text-[10px] text-amber-600 font-medium">-28% vs trimestre dernier</p>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Employabilité Moyenne</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgEmployabilite}%</p>
          <p className="text-[10px] text-emerald-600 font-medium">Haut niveau de qualification</p>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Certifications Obtenues</span>
            <Award className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalCertsObtenues}</p>
          <p className="text-[10px] text-purple-600 font-medium">PL-600, AI-102, SC-100</p>
        </div>

        <div className={`p-4 rounded-2xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Staffing Forecast</span>
            <BarChart2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">85%</p>
          <p className="text-[10px] text-indigo-600 font-medium">Taux placement prévisionnel</p>
        </div>
      </div>

      {/* Consultants Bench Table */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-500" />
          Liste des Consultants en Intercontrat (Bench Actif)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-2">Consultant</th>
                <th className="py-3 px-2">Grade / Spécialité</th>
                <th className="py-3 px-2">Manager</th>
                <th className="py-3 px-2">Jours Intercontrat</th>
                <th className="py-3 px-2">Employabilité</th>
                <th className="py-3 px-2">Certifications</th>
                <th className="py-3 px-2 text-right">Actions Staffing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {consultants.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.prenom} className="w-8 h-8 rounded-xl object-cover" />
                      <div>
                        <p className="font-bold">{c.prenom} {c.nom}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-[10px] mr-1">
                      {c.grade}
                    </span>
                    <span className="text-slate-500 text-[11px]">{c.title}</span>
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-600 dark:text-slate-400">{c.manager}</td>
                  <td className="py-3 px-2 font-bold text-amber-600 dark:text-amber-400">{c.joursIntercontrat} jours</td>
                  <td className="py-3 px-2 font-black text-emerald-600 dark:text-emerald-400">{c.employabilite}%</td>
                  <td className="py-3 px-2 font-semibold text-slate-700 dark:text-slate-300">
                    {c.certifications.length} valides
                  </td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => {
                        onSelectConsultant(c);
                        onNavigateTab('matching-missions');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                    >
                      Matcher Missions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Modals */}
      {onAddMission && (
        <AddMissionModal
          isOpen={isAddMissionOpen}
          onClose={() => setIsAddMissionOpen(false)}
          onAddMission={onAddMission}
          isDarkMode={isDarkMode}
        />
      )}

      {onAddFormation && (
        <AddFormationModal
          isOpen={isAddFormationOpen}
          onClose={() => setIsAddFormationOpen(false)}
          onAddFormation={onAddFormation}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
