import React from 'react';
import { 
  Calendar, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Target, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ChevronRight,
  FileCheck2,
  Brain,
  ShieldCheck,
  Building
} from 'lucide-react';
import { Consultant, Mission, Formation } from '../types';

interface DashboardConsultantProps {
  consultant: Consultant;
  missions: Mission[];
  formations: Formation[];
  isDarkMode: boolean;
  onNavigateTab: (tab: any) => void;
}

export const DashboardConsultant: React.FC<DashboardConsultantProps> = ({
  consultant,
  missions,
  formations,
  isDarkMode,
  onNavigateTab,
}) => {
  // Calculate average matching score across missions
  const topMissions = missions.slice(0, 2);
  const currentCourses = consultant.currentFormations;
  const certifiedCount = consultant.certifications.length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Header */}
      <div className={`p-6 rounded-3xl border relative overflow-hidden transition-all shadow-sm ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-indigo-900/40 text-slate-100' 
          : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-700 text-white border-blue-500/30'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={consultant.avatar} 
              alt={consultant.prenom}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {consultant.grade} · Intercontrat
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Profil Actif sur Dataverse
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                {consultant.prenom} {consultant.nom}
              </h1>
              <p className="text-sm text-blue-100 dark:text-slate-300 font-medium">
                {consultant.title} · Manager : <span className="font-semibold underline decoration-blue-300/50">{consultant.manager}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigateTab('copilot-rh')}
              className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-slate-900 group-hover:rotate-12 transition-transform" />
              <span>Ouvrir Copilot RH IA</span>
            </button>

            <button
              onClick={() => onNavigateTab('gestion-cv')}
              className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Optimiser mon CV</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (Module 1 requirements) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {/* 1. Jours Intercontrat */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Jours Intercontrat</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{consultant.joursIntercontrat}</span>
            <span className="text-xs text-slate-500 font-semibold">jours</span>
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            Début : {consultant.dateDebutIntercontrat}
          </p>
        </div>

        {/* 2. Taux Employabilité */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Employabilité</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{consultant.employabilite}%</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">+12%</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-1">
            Score IA basé marché ESN
          </p>
        </div>

        {/* 3. Certifications */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Certifications</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{certifiedCount}</span>
            <span className="text-xs text-slate-500 font-semibold">obtenues</span>
          </div>
          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium mt-1">
            PL-200, PL-600, AI-102
          </p>
        </div>

        {/* 4. Formations en cours */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Formations En Cours</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900 dark:text-white">{currentCourses.length}</span>
            <span className="text-xs text-slate-500 font-semibold">modules</span>
          </div>
          <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            Microsoft Learn MS-500
          </p>
        </div>

        {/* 5. Score Matching Moyen */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Score Matching</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">92%</span>
            <span className="text-[10px] text-slate-500 font-semibold">max</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium mt-1">
            3 missions ouvertes
          </p>
        </div>

        {/* 6. Score CV */}
        <div className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Score CV IA</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Brain className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{consultant.cvScore}</span>
            <span className="text-xs text-slate-500 font-semibold">/100</span>
          </div>
          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-1">
            Mis à jour {consultant.cvLastUpdate}
          </p>
        </div>
      </div>

      {/* Main Grid Section: Left Column (Skills & Formations) / Right Column (Missions & Copilot Recommendations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Compétences les plus recherchées & Niveau actuel */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Cartographie des Compétences & Demande Marché ESN
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Évaluation continue basée sur les exigences des appels d'offres en cours
                </p>
              </div>
              <button 
                onClick={() => onNavigateTab('gestion-cv')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Gérer mes compétences
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {consultant.competences.map((comp) => (
                <div 
                  key={comp.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800' : 'bg-slate-50 border-slate-200/60 hover:bg-white hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{comp.libelle}</p>
                      <span className="text-[10px] text-slate-500 font-medium">{comp.categorie}</span>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      comp.demandLevel === 'Critique'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        : comp.demandLevel === 'Forte'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      Demande {comp.demandLevel}
                    </span>
                  </div>

                  {/* Level gauge */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold">
                      <span className="text-slate-600 dark:text-slate-400">Niveau : <strong className="text-blue-600 dark:text-blue-400">{comp.niveau}</strong></span>
                      {comp.trendScore && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tendance +{comp.trendScore}%</span>
                      )}
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: comp.niveau === 'Expert' ? '95%' : comp.niveau === 'Avancé' ? '78%' : comp.niveau === 'Intermédiaire' ? '55%' : '30%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations en cours & Objectifs d'upskilling */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-500" />
                  Formations Recommandées & Parcours d'Upskilling
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Modules certifiants Microsoft Learn & Azure prioritaires pour votre repositionnement
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('formations')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Catalogue complet
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {currentCourses.map((f) => (
                <div 
                  key={f.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50 border-slate-200/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                          {f.provider}
                        </span>
                        {f.certificationAssociee && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                            Certif : {f.certificationAssociee}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          Employabilité +{f.impactEmployabilite}%
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{f.nom}</h4>
                    </div>

                    <a 
                      href={f.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shrink-0 flex items-center justify-center gap-1"
                    >
                      <span>Continuer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                      <span>Progression : {f.progressPercentage}%</span>
                      <span>Durée : {f.dureeHours}h</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${f.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1 col wide) */}
        <div className="space-y-6">
          {/* Top Matching Missions Preview */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                Missions Cibles Idéales
              </h3>
              <button 
                onClick={() => onNavigateTab('matching-missions')}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Voir tout
              </button>
            </div>

            <div className="space-y-3">
              {topMissions.map((m) => (
                <div 
                  key={m.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isDarkMode ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{m.sector}</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      92% Match
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 mb-1">{m.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                    <Building className="w-3 h-3 text-slate-400" />
                    {m.client} · TJD {m.tjd}€
                  </p>

                  <button
                    onClick={() => onNavigateTab('matching-missions')}
                    className="w-full py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-600 dark:text-blue-300 font-bold text-xs transition-colors text-center"
                  >
                    Examiner le matching
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Actions Rapides InterFlow
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('gestion-cv')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Uploader un nouveau CV</p>
                    <p className="text-[10px] text-slate-500">Extraction IA & Mots-clés ATS</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('generation-cv')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Générer mes CV 4-en-1</p>
                    <p className="text-[10px] text-slate-500">Versions Client, Tech, Mgmt, Commercial</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('copilot-rh')}
                className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">Préparer un entretien client</p>
                    <p className="text-[10px] text-slate-500">Simulations de questions par Copilot</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
