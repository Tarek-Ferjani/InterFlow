import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Brain, 
  Award, 
  Zap, 
  RefreshCw, 
  Check, 
  ArrowRight,
  ShieldCheck,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { Consultant, CVAnalysisResult } from '../types';

interface GestionCVProps {
  consultant: Consultant;
  isDarkMode: boolean;
  onUpdateConsultantCV: (score: number, updatedKeywords: string[]) => void;
}

export const GestionCV: React.FC<GestionCVProps> = ({
  consultant,
  isDarkMode,
  onUpdateConsultantCV,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cvTextInput, setCvTextInput] = useState<string>(
    `Jean Dupont - Architecte Solution Microsoft Power Platform & Azure Cloud
Expérience de 7 ans dans le développement et le déploiement d'applications métier canvas & model-driven sous Dataverse.
Projets majeurs :
- Conception d'un système de gestion de prêts chez BNP Paribas avec Power Apps Canvas et 15 flux Power Automate.
- Intégration de Copilot Studio pour la recherche documentaire RH.
- Modélisation de données complexes sous Dataverse avec sécurité basée sur les rôles (RBAC).
Certifications : PL-200 Functional Consultant, PL-600 Solution Architect.
Compétences : Power Apps, Power Automate, Dataverse, C#, Azure Web APIs, SQL, Power BI.`
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<CVAnalysisResult | null>({
    score: consultant.cvScore || 82,
    summary: "Profil technique très solide orienté Power Platform & Cloud Azure avec 7 ans d'expérience. Excellent alignement sur les opportunités ESN actuelles.",
    extractedSkills: [
      { name: "Power Apps (Canvas & Model-Driven)", category: "Power Platform", level: "Expert" },
      { name: "Power Automate & Cloud Flows", category: "Power Platform", level: "Expert" },
      { name: "Dataverse & RBAC", category: "Power Platform", level: "Avancé" },
      { name: "Copilot Studio", category: "IA Générative", level: "Intermédiaire" },
      { name: "Azure Web APIs", category: "Cloud Azure", level: "Intermédiaire" },
      { name: "Power BI & DAX", category: "Data & Power BI", level: "Avancé" }
    ],
    extractedCertifications: [
      "PL-200: Power Platform Functional Consultant",
      "PL-600: Power Platform Solution Architect",
      "AI-102: Azure AI Engineer"
    ],
    missingKeywords: [
      "AI Builder",
      "Process Mining",
      "Azure OpenAI RAG",
      "Gouvernance COE (Center of Excellence)"
    ],
    contentSuggestions: [
      {
        originalText: "Conception d'un système de gestion de prêts chez BNP Paribas avec Power Apps Canvas",
        suggestedText: "Pilotage de la conception et du déploiement d'une plateforme de gestion de crédit pour 1 200 utilisateurs, réduisant les délais de validation de 45%",
        reason: "Ajout d'indicateurs chiffrés d'impact ROI indispensable pour les appels d'offres ESN"
      },
      {
        originalText: "Intégration de Copilot Studio pour la recherche documentaire RH.",
        suggestedText: "Mise en œuvre d'un agent conversationnel IA autonome (Copilot Studio + Azure AI Search) réduisant le temps de réponse RH de 60%",
        reason: "Valorisation de la brique IA Générative et du gain de productivité"
      }
    ],
    skillSuggestions: [
      "PL-500: Power Automate RPA Developer",
      "DP-600: Microsoft Fabric Analytics Engineer",
      "SC-100: Cybersecurity Architect"
    ]
  });

  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([]);

  const handleAnalyzeCV = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cvText: cvTextInput,
          consultantName: `${consultant.prenom} ${consultant.nom}`
        })
      });
      const data = await response.json();
      setAnalysisResult(data);
      if (data.score) {
        onUpdateConsultantCV(data.score, data.missingKeywords || []);
      }
    } catch (error) {
      console.error("Analyse CV error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplySuggestion = (index: number) => {
    if (appliedSuggestions.includes(index)) return;
    setAppliedSuggestions([...appliedSuggestions, index]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
              <FileText className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Module 2 · Intelligence Artificielle CV
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Analyse Automatique & Diagnostic ATS du CV
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Extraction par IA des compétences, détection des mots-clés manquants et suggestions de reformulation
          </p>
        </div>

        {/* Score Badge */}
        {analysisResult && (
          <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 shrink-0 ${
            analysisResult.score >= 80 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
          }`}>
            <Brain className="w-8 h-8" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider">Score Global CV</p>
              <p className="text-2xl font-black">{analysisResult.score} / 100</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Upload & Text Input (Left) / AI Analysis Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* File Upload Box */}
          <div className={`p-6 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-500" />
              Importer un CV (PDF ou Word)
            </h3>

            <div className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              selectedFile 
                ? 'border-emerald-500 bg-emerald-500/5'
                : isDarkMode ? 'border-slate-700 hover:border-blue-500 bg-slate-800/40' : 'border-slate-300 hover:border-blue-500 bg-slate-50'
            }`}>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx,.txt"
                className="hidden" 
                id="cv-upload-input"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="cv-upload-input" className="cursor-pointer block">
                <FileSearch className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedFile ? selectedFile.name : 'Glissez-déposez votre CV ici ou cliquez pour parcourir'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  Formats acceptés : PDF, Word (.docx), TXT (Max 10 Mo)
                </p>
              </label>
            </div>

            {/* Textarea for manual / parsed content */}
            <div className="mt-4 space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Contenu ou texte du CV pour analyse :</span>
                <span className="text-[10px] text-slate-400 font-normal">Modifiable</span>
              </label>
              <textarea
                rows={8}
                value={cvTextInput}
                onChange={(e) => setCvTextInput(e.target.value)}
                className={`w-full p-3 text-xs rounded-2xl border font-mono focus:outline-none transition-colors ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-600'
                }`}
              />
            </div>

            <button
              onClick={handleAnalyzeCV}
              disabled={isAnalyzing}
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyse IA Builder en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Lancer l'analyse automatique par IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (7 cols) - Analysis Results */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult && (
            <>
              {/* Summary & Key extracted competencies */}
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  Diagnostic Global IA & Résumé Synthétique
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 p-3 rounded-2xl bg-blue-500/5 border border-blue-500/20">
                  {analysisResult.summary}
                </p>

                {/* Extracted Skills Badges */}
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Compétences extraites automatiquement ({analysisResult.extractedSkills.length})
                </h4>

                <div className="flex flex-wrap gap-2 mb-4">
                  {analysisResult.extractedSkills.map((sk, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                      {sk.name} <span className="text-[10px] opacity-75">({sk.level})</span>
                    </span>
                  ))}
                </div>

                {/* Extracted Certifications */}
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-500" />
                  Certifications détectées
                </h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.extractedCertifications.map((cert, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mots-clés manquants & Suggestions d'acquisition */}
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Mots-clés Manquants & Suggestions d'Acquisition (Optimisation ATS)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-2">
                      Mots-clés manquants indispensables :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.missingKeywords.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200">
                          + {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                    <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-2">
                      Compétences recommandées à acquérir :
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.skillSuggestions.map((sk, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200">
                          👉 {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Suggestions de reformulation de contenu */}
              <div className={`p-6 rounded-3xl border ${
                isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
              }`}>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  Reformulations de contenu proposées par l'IA
                </h3>

                <div className="space-y-3">
                  {analysisResult.contentSuggestions.map((item, idx) => {
                    const isApplied = appliedSuggestions.includes(idx);
                    return (
                      <div 
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          isApplied
                            ? 'bg-emerald-500/10 border-emerald-500/30'
                            : isDarkMode ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Raison : {item.reason}
                          </span>

                          <button
                            onClick={() => handleApplySuggestion(idx)}
                            disabled={isApplied}
                            className={`px-3 py-1 rounded-xl font-bold text-xs transition-all flex items-center gap-1 ${
                              isApplied
                                ? 'bg-emerald-600 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                          >
                            {isApplied ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Appliqué</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Appliquer la reformulation</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="p-2.5 rounded-xl bg-red-500/5 border border-red-500/20">
                            <span className="text-[10px] font-bold text-red-500 uppercase block mb-1">Texte Actuel :</span>
                            <p className="text-slate-700 dark:text-slate-300 line-through opacity-80">{item.originalText}</p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase block mb-1">Proposition IA :</span>
                            <p className="text-slate-900 dark:text-white font-semibold">{item.suggestedText}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
