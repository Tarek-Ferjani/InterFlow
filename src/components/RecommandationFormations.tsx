import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  ShieldCheck,
  Zap,
  Cpu,
  Wifi,
  Plus
} from 'lucide-react';
import { Consultant, Formation, SkillCategory } from '../types';
import { AddFormationModal } from './AddFormationModal';

interface RecommandationFormationsProps {
  consultant: Consultant;
  formations: Formation[];
  isDarkMode: boolean;
  onStartCourse: (courseId: string) => void;
  onAddFormation?: (formation: Formation) => void;
}

export const RecommandationFormations: React.FC<RecommandationFormationsProps> = ({
  consultant,
  formations,
  isDarkMode,
  onStartCourse,
  onAddFormation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isAddFormationOpen, setIsAddFormationOpen] = useState(false);

  const categories = ['Tous', 'IA Générative', 'Power Platform', 'Cloud Azure', 'Data & Power BI', 'Cybersécurité', 'Télécoms & Réseaux'];

  const filteredFormations = selectedCategory === 'Tous'
    ? formations
    : formations.filter(f => f.categorie === selectedCategory);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
              <GraduationCap className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Module 4 · Moteur d'Upskilling IA
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Recommandation Intelligente de Formations & Certifications
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Parcours optimisés basés sur le profil de {consultant.prenom}, les besoins du marché ESN et les opportunités de mission cibles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onAddFormation && (
            <button
              onClick={() => setIsAddFormationOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Proposer une Formation</span>
            </button>
          )}

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300">
            <Sparkles className="w-5 h-5 shrink-0" />
            <div className="text-xs">
              <p className="font-bold">Potentiel d'Employabilité +35%</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">En complétant 2 modules prioritaires</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md'
                : isDarkMode ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Formations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormations.map((f) => {
          const isEnCours = f.status === 'En_cours';
          return (
            <div
              key={f.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between hover:scale-[1.01] ${
                f.priorite === 'Critique'
                  ? isDarkMode ? 'bg-slate-900/90 border-purple-900/60 shadow-lg' : 'bg-white border-purple-200 shadow-sm'
                  : isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div>
                {/* Badges Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    f.priorite === 'Critique'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-900'
                      : f.priorite === 'Haute'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    Priorité {f.priorite}
                  </span>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{f.impactEmployabilite}% Employabilité
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                  {f.nom}
                </h3>

                <div className="space-y-1.5 mb-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Plateforme :</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold">{f.provider}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Catégorie :</span>
                    <strong className="text-purple-600 dark:text-purple-400 font-semibold">{f.categorie}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Durée estimée :</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {f.dureeHours} heures
                    </strong>
                  </div>
                  {f.certificationAssociee && (
                    <div className="flex items-center justify-between">
                      <span>Examen associé :</span>
                      <strong className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        {f.certificationAssociee}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress & Action button */}
              <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                {isEnCours && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                      <span>Progression actuelle</span>
                      <span className="text-purple-600 font-bold">{f.progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${f.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onStartCourse(f.id)}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      isEnCours
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isEnCours ? 'Reprendre' : 'Démarrer'}</span>
                  </button>

                  <a
                    href={f.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Ouvrir sur Microsoft Learn"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

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
