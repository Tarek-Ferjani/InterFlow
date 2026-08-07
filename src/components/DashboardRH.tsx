import React, { useState } from 'react';
import { 
  BarChart3, 
  Award, 
  TrendingUp, 
  FileCheck2, 
  GraduationCap, 
  Layers,
  Sparkles,
  Plus,
  Briefcase,
  BookOpen
} from 'lucide-react';
import { Consultant, Formation, Mission } from '../types';
import { AddMissionModal } from './AddMissionModal';
import { AddFormationModal } from './AddFormationModal';

interface DashboardRHProps {
  consultants: Consultant[];
  formations?: Formation[];
  missions?: Mission[];
  onAddMission?: (mission: Mission) => void;
  onAddFormation?: (formation: Formation) => void;
  isDarkMode: boolean;
}

export const DashboardRH: React.FC<DashboardRHProps> = ({
  consultants,
  formations = [],
  missions = [],
  onAddMission,
  onAddFormation,
  isDarkMode,
}) => {
  const [isAddMissionOpen, setIsAddMissionOpen] = useState(false);
  const [isAddFormationOpen, setIsAddFormationOpen] = useState(false);

  const totalConsultants = consultants.length;
  const certifiedRatio = Math.round(
    (consultants.filter(c => c.certifications.length > 0).length / (totalConsultants || 1)) * 100
  );
  const avgCvUpdateRate = 92; // %
  const reductionIntercontratRate = -32; // %

  const categoryCounts = [
    { name: 'Power Platform', count: 12, percent: 85, trend: '+15%' },
    { name: 'IA Générative & Copilot', count: 9, percent: 72, trend: '+40%' },
    { name: 'Cloud Azure & Infra', count: 8, percent: 68, trend: '+10%' },
    { name: 'Data & Power BI', count: 10, percent: 78, trend: '+22%' },
    { name: 'Cybersécurité', count: 5, percent: 45, trend: '+30%' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner with Action Buttons */}
      <div className={`p-6 rounded-3xl border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <BarChart3 className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Module Direction RH · Pilotage Capital Humain & Compétences
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Tableau de Bord Exécutif & KPI RH
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Suivi des plans de développement de carrière, gestion des catalogues de formations MS Learn et des missions clients.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onAddFormation && (
            <button
              onClick={() => setIsAddFormationOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter au Catalogue Formation</span>
            </button>
          )}

          {onAddMission && (
            <button
              onClick={() => setIsAddMissionOpen(true)}
              className="px-3.5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publier une Mission Client</span>
            </button>
          )}
        </div>
      </div>

      {/* Main HR KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Réduction Jours Intercontrat</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{reductionIntercontratRate}%</p>
          <p className="text-[10px] text-slate-500 font-medium">Objectif annuel dépassé</p>
        </div>

        <div className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Taux de Certification</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{certifiedRatio}%</p>
          <p className="text-[10px] text-slate-500 font-medium">Consultants certifiés Microsoft</p>
        </div>

        <div className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Mise à jour CV IA</span>
            <FileCheck2 className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{avgCvUpdateRate}%</p>
          <p className="text-[10px] text-slate-500 font-medium">Taux d'actualisation mensuel</p>
        </div>

        <div className={`p-5 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Employabilité Globale</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">87%</p>
          <p className="text-[10px] text-slate-500 font-medium">Moyenne entreprise</p>
        </div>
      </div>

      {/* Cartographie des compétences & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Skills Mapping */}
        <div className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-500" />
            Cartographie des Compétences par Pôle d'Expertise
          </h3>

          <div className="space-y-4">
            {categoryCounts.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{cat.name}</span>
                  <span className="text-indigo-600 dark:text-indigo-400">{cat.count} consultants ({cat.percent}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: HR Development Plans */}
        <div className={`p-6 rounded-3xl border ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-500" />
            Plans de Développement & Objectifs Stratégiques RH
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/20">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-1">
                Objectif Q3-Q4 : 100% de consultants certifiés PL-600 ou AI-102
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Priorité accordée aux modules Copilot Studio et Azure OpenAI pour répondre aux appels d'offres banque/assurance.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
              <p className="font-bold text-blue-900 dark:text-blue-300 mb-1">
                Réduction de l'intercontrat sous la barre des 15 jours
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Utilisation quotidienne du matching IA pour le repositionnement anticipé à 30 jours de la fin de mission.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                Valorisation des TJD (+10% en moyenne)
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Refonte automatique des CV en version "Client" et "Technique" pour maximiser la valeur perçue.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog & Missions Management Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Formations Catalog */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              Catalogue des Formations ({formations.length})
            </h3>
            {onAddFormation && (
              <button
                onClick={() => setIsAddFormationOpen(true)}
                className="text-xs font-bold text-purple-500 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Nouveau Module
              </button>
            )}
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {formations.map((f) => (
              <div key={f.id} className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{f.nom}</p>
                  <p className="text-[10px] text-slate-500">{f.provider} • {f.dureeHours}h • {f.categorie}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg shrink-0 ${
                  f.priorite === 'Critique' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  +{f.impactEmployabilite}% Imp.
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Missions Catalog */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-500" />
              Missions Clients Ouvertes ({missions.length})
            </h3>
            {onAddMission && (
              <button
                onClick={() => setIsAddMissionOpen(true)}
                className="text-xs font-bold text-indigo-500 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Nouvelle Mission
              </button>
            )}
          </div>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {missions.map((m) => (
              <div key={m.id} className={`p-3 rounded-2xl border text-xs flex items-center justify-between ${
                isDarkMode ? 'bg-slate-800/60 border-slate-700/60' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="min-w-0 pr-2">
                  <p className="font-bold text-slate-900 dark:text-white truncate">{m.title}</p>
                  <p className="text-[10px] text-slate-500">{m.client} • {m.sector} • {m.lieu}</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  {m.tjd} €/j
                </span>
              </div>
            ))}
          </div>
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
