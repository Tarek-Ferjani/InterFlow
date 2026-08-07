import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  Briefcase, 
  Code2, 
  UserCheck, 
  DollarSign, 
  RefreshCw,
  Award,
  Layers,
  Printer
} from 'lucide-react';
import { Consultant, CVVersionType, GeneratedCVVersion } from '../types';

interface GenerationCVProps {
  consultant: Consultant;
  isDarkMode: boolean;
}

export const GenerationCV: React.FC<GenerationCVProps> = ({
  consultant,
  isDarkMode,
}) => {
  const [activeVersion, setActiveVersion] = useState<CVVersionType>('client');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState<string | null>(null);

  const [versionsData, setVersionsData] = useState<Record<CVVersionType, GeneratedCVVersion>>({
    client: {
      type: 'client',
      title: `CV Version Client - ${consultant.prenom} ${consultant.nom}`,
      badge: 'Orienté Valeur Métier & ROI',
      targetAudience: 'Directeurs Métiers, Product Owners, Sponsoring Exécutif',
      profileSummary: `Consultant ${consultant.grade} spécialisé dans l'accélération de la transformation digitale par la Power Platform. Maîtrise avérée de la digitalisation des processus métier complexes pour grands comptes bancaires et industriels, garantissant un retour sur investissement rapide.`,
      highlightedSkills: [
        'Digitalisation de Processus Métier',
        'Gouvernance Power Platform & Center of Excellence (CoE)',
        'Accompagnement au Changement & Adoption Utilisateur',
        'Optimisation du TCO & Intégration M365'
      ],
      experienceFormat: [
        {
          company: 'BNP Paribas - Banque de Détail',
          role: 'Architecte Solution & Lead Processus',
          period: '2024 - 2026',
          bulletPoints: [
            'Digitalisation intégrale du traitement des dossiers de crédit sous Power Apps Canvas et Dataverse.',
            'Réduction du temps moyen d\'instruction de 5 jours à 4 heures pour 1 200 utilisateurs.',
            'Mise en place de tableaux de bord d\'efficacité opérationnelle sous Power BI.'
          ]
        },
        {
          company: 'TotalEnergies - Direction SI',
          role: 'Consultant Senior Power Apps & Automation',
          period: '2022 - 2024',
          bulletPoints: [
            'Déploiement de 8 applications métier mobiles pour les techniciens terrain.',
            'Automatisation de 25 flux d\'approbation réduisant les erreurs de saisie de 90%.'
          ]
        }
      ],
      certificationsFormatted: [
        'PL-600: Power Platform Solution Architect Expert',
        'PL-200: Power Platform Functional Consultant'
      ]
    },
    technique: {
      type: 'technique',
      title: `CV Version Technique - ${consultant.prenom} ${consultant.nom}`,
      badge: 'Orienté Stack, Dataverse & Cloud',
      targetAudience: 'Architectes SI, Tech Leads, Directions Informatiques',
      profileSummary: `Architecte Technique Power Platform & Cloud Azure certifié PL-600 & AI-102. Expert en modélisation de schémas Dataverse complexes, sécurité RBAC, développement de custom connectors, Azure Functions C# et intégrations AI Builder / Copilot Studio.`,
      highlightedSkills: [
        'Dataverse Data Modeling & Security Matrix',
        'Power Apps Component Framework (PCF) & C# / TypeScript',
        'Azure Functions, REST Web APIs & Custom Connectors',
        'Copilot Studio, Semantic Kernel & Azure OpenAI Integration'
      ],
      experienceFormat: [
        {
          company: 'BNP Paribas - Infrastructure & Data',
          role: 'Architecte Technique Dataverse & Cloud',
          period: '2024 - 2026',
          bulletPoints: [
            'Conception du modèle de données Dataverse multi-tables avec partitionnement et clés alternatives.',
            'Développement de Connecteurs Personnalisés OpenAPI sécurisés via Azure Active Directory / Entra ID.',
            'Intégration d\'Azure OpenAI RAG avec Azure AI Search pour le query documentaire.'
          ]
        }
      ],
      certificationsFormatted: [
        'PL-600: Power Platform Solution Architect',
        'AI-102: Azure AI Engineer Associate',
        'PL-200: Functional Consultant'
      ]
    },
    management: {
      type: 'management',
      title: `CV Version Management - ${consultant.prenom} ${consultant.nom}`,
      badge: 'Orienté Pilotage, Agile & Staffing',
      targetAudience: 'Chef de Projet Senior, Directeur de Programme, PMO',
      profileSummary: `Lead Consultant & Facilitateur Agile combinant expertise technique Power Platform et pilotage de projets multi-disciplinaires. Expérience confirmée dans la gestion d'équipes de 5 à 12 développeurs, le suivi budgétaire et la gestion des risques client.`,
      highlightedSkills: [
        'Pilotage Projets Agile Scrum / SAFe',
        'Management d\'Équipes Techniques & Mentoring',
        'Gouvernance de Portefeuille Applicatif',
        'Gestion des Risques & Relation Partenaires'
      ],
      experienceFormat: [
        {
          company: 'Grand Compte Énergie',
          role: 'Scrum Master & Lead Architecte',
          period: '2023 - 2025',
          bulletPoints: [
            'Animation des cérémonies Agile (Sprint Planning, Demos, Retros) pour une squad de 8 consultants.',
            'Garant du respect du budget et de la vélocité de delivery (100% des Sprints livrés à temps).'
          ]
        }
      ],
      certificationsFormatted: [
        'Scrum Master Certified (PSM I)',
        'PL-600: Power Platform Solution Architect'
      ]
    },
    commercial: {
      type: 'commercial',
      title: `CV Version Commerciale - ${consultant.prenom} ${consultant.nom}`,
      badge: 'Orienté Pitch & Proposition ESN',
      targetAudience: 'Ingénieurs d\'Affaires, Directions Commerciales ESN',
      profileSummary: `Profil à fort impact commercial prêt à intervenir immédiatement en mission d'Architecture Power Platform. Démarrage rapide, autonomie complète et capacité éprouvée à créer du foisonnement de missions chez les grands comptes.`,
      highlightedSkills: [
        'Pitch d\'Expertise Client & Avant-Vente',
        'Capacité de Démarrage Immédiat (Intercontrat)',
        'Foisonnement de Comptes & Identification de Besoins',
        'Excellente Communication Exécutive'
      ],
      experienceFormat: [
        {
          company: 'ESN Top 10 France',
          role: 'Consultant Senior & Ambassadeur Offre Power',
          period: '2021 - 2026',
          bulletPoints: [
            'Participation à 12 soutenances d\'appels d\'offres avec taux de transformation de 85%.',
            'Publication de retours d\'expérience et animation de webinars techniques.'
          ]
        }
      ],
      certificationsFormatted: [
        'PL-600 Expert Certified',
        'PL-200 Certified'
      ]
    }
  });

  const generateVersionWithAI = async (type: CVVersionType) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consultant, targetType: type })
      });
      const data = await response.json();
      if (data && data.title) {
        setVersionsData(prev => ({ ...prev, [type]: data }));
      }
    } catch (e) {
      console.error('Error generating CV version:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentVersionData = versionsData[activeVersion];

  const handleCopy = () => {
    const textToCopy = `${currentVersionData.title}\n\nRésumé :\n${currentVersionData.profileSummary}\n\nCompétences clés :\n${currentVersionData.highlightedSkills.join(', ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = (format: 'PDF' | 'Word') => {
    setExported(format);
    setTimeout(() => setExported(null), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Sparkles className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Module 3 · Générateur Multi-Cibles IA
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Génération Automatique de CV 4-en-1
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Déclinez instantanément le CV en version Client, Technique, Management et Commerciale avec export Word/PDF.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Exporter PDF</span>
          </button>

          <button
            onClick={() => handleExport('Word')}
            className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Exporter Word (.docx)</span>
          </button>
        </div>
      </div>

      {exported && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>Fichier {currentVersionData.title} exporté au format {exported} avec succès !</span>
        </div>
      )}

      {/* Tabs Selector for 4 Versions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveVersion('client')}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            activeVersion === 'client'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
              : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <UserCheck className={`w-5 h-5 ${activeVersion === 'client' ? 'text-white' : 'text-blue-500'}`} />
            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
              activeVersion === 'client' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
            }`}>
              Valeur Métier
            </span>
          </div>
          <div>
            <p className="font-bold text-xs">1. Version Client</p>
            <p className={`text-[10px] mt-0.5 ${activeVersion === 'client' ? 'text-blue-100' : 'text-slate-500'}`}>
              Pour PO, Business & Décideurs
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveVersion('technique')}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            activeVersion === 'technique'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
              : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Code2 className={`w-5 h-5 ${activeVersion === 'technique' ? 'text-white' : 'text-indigo-500'}`} />
            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
              activeVersion === 'technique' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-800'
            }`}>
              Stack & Code
            </span>
          </div>
          <div>
            <p className="font-bold text-xs">2. Version Technique</p>
            <p className={`text-[10px] mt-0.5 ${activeVersion === 'technique' ? 'text-indigo-100' : 'text-slate-500'}`}>
              Pour Architectes & Tech Leads
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveVersion('management')}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            activeVersion === 'management'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
              : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <Briefcase className={`w-5 h-5 ${activeVersion === 'management' ? 'text-white' : 'text-purple-500'}`} />
            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
              activeVersion === 'management' ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-800'
            }`}>
              Agile & Delivery
            </span>
          </div>
          <div>
            <p className="font-bold text-xs">3. Version Management</p>
            <p className={`text-[10px] mt-0.5 ${activeVersion === 'management' ? 'text-purple-100' : 'text-slate-500'}`}>
              Pour Chefs de Projet & PMO
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveVersion('commercial')}
          className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
            activeVersion === 'commercial'
              ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-[1.02]'
              : isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className={`w-5 h-5 ${activeVersion === 'commercial' ? 'text-white' : 'text-amber-500'}`} />
            <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
              activeVersion === 'commercial' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
            }`}>
              Pitch AO
            </span>
          </div>
          <div>
            <p className="font-bold text-xs">4. Version Commerciale</p>
            <p className={`text-[10px] mt-0.5 ${activeVersion === 'commercial' ? 'text-amber-100' : 'text-slate-500'}`}>
              Pour Ingénieurs d'Affaires ESN
            </p>
          </div>
        </button>
      </div>

      {/* CV Document View (Word/M365 Style Sheet) */}
      <div className={`p-8 rounded-3xl border shadow-xl relative transition-all max-w-4xl mx-auto ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Document Header Bar */}
        <div className="flex items-center justify-between border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              {currentVersionData.badge}
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Public cible : {currentVersionData.targetAudience}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => generateVersionWithAI(activeVersion)}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Régénérer cette version par IA"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Régénérer</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copie effectuée' : 'Copier'}</span>
            </button>
          </div>
        </div>

        {/* CV Paper Content Layout */}
        <div className="space-y-6 font-sans">
          {/* Header Name & Title */}
          <div className="border-b pb-4 border-slate-100 dark:border-slate-800/80">
            <h2 className="text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
              {consultant.prenom} {consultant.nom}
            </h2>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {currentVersionData.title}
            </p>
            <p className="text-xs text-slate-400">
              Grade : {consultant.grade} · Mail : {consultant.email} · Mobilité : Île-de-France & Remote
            </p>
          </div>

          {/* Profile Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              Résumé Profil Strategique
            </h3>
            <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-normal">
              {currentVersionData.profileSummary}
            </p>
          </div>

          {/* Key Highlighted Skills */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              Compétences Majeures Mises en Avant
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentVersionData.highlightedSkills.map((sk, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Experiences Formatted */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b pb-1 border-slate-200 dark:border-slate-800">
              Expériences Récentes Reformulées
            </h3>

            <div className="space-y-4">
              {currentVersionData.experienceFormat.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {exp.role} — <span className="text-blue-600 dark:text-blue-400">{exp.company}</span>
                    </h4>
                    <span className="text-[10px] font-bold text-slate-400">{exp.period}</span>
                  </div>

                  <ul className="space-y-1.5 mt-2">
                    {exp.bulletPoints.map((bp, bidx) => (
                      <li key={bidx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Formatted */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b pb-1 border-slate-200 dark:border-slate-800">
              Certifications Officielles & Accréditations
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentVersionData.certificationsFormatted.map((cert, cidx) => (
                <span key={cidx} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
