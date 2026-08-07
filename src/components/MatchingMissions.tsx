import React, { useState } from 'react';
import { 
  Target, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  DollarSign, 
  Send, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Check,
  Plus
} from 'lucide-react';
import { Consultant, Mission, MatchingResult } from '../types';
import { AddMissionModal } from './AddMissionModal';

interface MatchingMissionsProps {
  consultant: Consultant;
  missions: Mission[];
  isDarkMode: boolean;
  onAddMission?: (mission: Mission) => void;
}

export const MatchingMissions: React.FC<MatchingMissionsProps> = ({
  consultant,
  missions,
  isDarkMode,
  onAddMission,
}) => {
  const [positionedMissionId, setPositionedMissionId] = useState<string | null>(null);
  const [isAddMissionOpen, setIsAddMissionOpen] = useState(false);

  // Compute matching results for each mission based on consultant competences
  const matches: MatchingResult[] = missions.map((m) => {
    let matchedWeightSum = 0;
    let totalWeightSum = 0;
    const matchingSkills: string[] = [];
    const missingSkills: any[] = [];

    m.competencesRequises.forEach((req) => {
      totalWeightSum += req.weight;
      const found = consultant.competences.find(
        (c) => c.libelle.toLowerCase().includes(req.skillName.toLowerCase()) || req.skillName.toLowerCase().includes(c.libelle.toLowerCase())
      );

      if (found) {
        matchedWeightSum += req.weight;
        matchingSkills.push(req.skillName);
      } else {
        missingSkills.push({
          skillName: req.skillName,
          requiredLevel: req.requiredLevel,
          estimatedDaysToAcquire: req.weight * 3, // e.g. 15 days
        });
      }
    });

    const scoreMatch = Math.round((matchedWeightSum / totalWeightSum) * 100);
    const readinessDelayDays = missingSkills.reduce((acc, curr) => acc + curr.estimatedDaysToAcquire, 0);

    return {
      mission: m,
      consultantId: consultant.id,
      scoreMatch,
      matchingSkills,
      missingSkills,
      readinessDelayDays,
    };
  });

  const handlePositionConsultant = (missionId: string) => {
    setPositionedMissionId(missionId);
    setTimeout(() => {
      setPositionedMissionId(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
              <Target className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Module 5 · Scoring IA Positionnement Mission
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Matching Automatique Consultant vs Exigences Missions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Algorithme de comparaison d'écarts de compétences, taux de compatibilité et plan d'upskilling accéléré.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onAddMission && (
            <button
              onClick={() => setIsAddMissionOpen(true)}
              className="px-3.5 py-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publier une Mission</span>
            </button>
          )}

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>{matches.length} Opportunités Qualifiées</span>
          </div>
        </div>
      </div>

      {positionedMissionId && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Positionnement transmis au Staffing Manager et au Client avec succès ! Fiche de présentation IA jointe.</span>
          </div>
          <span className="text-[10px] bg-emerald-200 dark:bg-emerald-950 px-2 py-0.5 rounded">Statut : Transmis</span>
        </div>
      )}

      {/* Matching List */}
      <div className="space-y-6">
        {matches.map(({ mission, scoreMatch, matchingSkills, missingSkills, readinessDelayDays }) => {
          const isPositioned = positionedMissionId === mission.id;
          return (
            <div
              key={mission.id}
              className={`p-6 rounded-3xl border transition-all ${
                scoreMatch >= 85
                  ? isDarkMode ? 'bg-slate-900/90 border-cyan-900/60 shadow-lg' : 'bg-white border-cyan-200 shadow-xs'
                  : isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                {/* Mission Header */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {mission.client}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300">
                      {mission.sector}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Démarrage : {mission.dateDemarrage} ({mission.dureeMois} mois)
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {mission.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {mission.description}
                  </p>
                </div>

                {/* Score & Action Column */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 w-full lg:w-auto shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Compatibilité Profil</p>
                      <p className={`text-3xl font-black ${
                        scoreMatch >= 80 ? 'text-emerald-500' : scoreMatch >= 60 ? 'text-amber-500' : 'text-red-500'
                      }`}>
                        {scoreMatch}%
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 p-2 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-sm">
                        {scoreMatch}%
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePositionConsultant(mission.id)}
                    disabled={isPositioned}
                    className={`w-full lg:w-auto px-5 py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                      isPositioned
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                    }`}
                  >
                    {isPositioned ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Candidature transmise</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Positionner {consultant.prenom} sur la mission</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Skills Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
                {/* Matching skills */}
                <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Compétences Maîtrisées Conformes ({matchingSkills.length})
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {matchingSkills.map((sk, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing skills & Readiness delay */}
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      Écarts de Compétences Détectés ({missingSkills.length})
                    </h4>
                    {readinessDelayDays > 0 && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Montée en niveau : ~{readinessDelayDays} jours
                      </span>
                    )}
                  </div>

                  {missingSkills.length === 0 ? (
                    <p className="text-xs text-slate-500 font-medium">Aucun écart majeur, le consultant est immédiatement opérationnel.</p>
                  ) : (
                    <div className="space-y-2">
                      {missingSkills.map((ms, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-amber-100/50 dark:bg-amber-950/50 p-2 rounded-xl">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{ms.skillName}</span>
                          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                            Requis : {ms.requiredLevel} · Durée : {ms.estimatedDaysToAcquire}j
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {onAddMission && (
        <AddMissionModal
          isOpen={isAddMissionOpen}
          onClose={() => setIsAddMissionOpen(false)}
          onAddMission={onAddMission}
          isDarkMode={isDarkMode}
        />
      )}
    </div>
  );
};
