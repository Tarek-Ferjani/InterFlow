import { Consultant, Mission, Formation, Certification, UserStory, DataverseEntity, SprintPlan } from './types';

export const INITIAL_CONSULTANTS: Consultant[] = [
  {
    id: 'cons-1',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'j.dupont@interflow-esn.com',
    manager: 'Sophie Martin',
    grade: 'Senior',
    title: 'Architecte Microsoft Power Platform & Cloud Azure',
    dateDebutIntercontrat: '2026-07-10',
    joursIntercontrat: 27,
    employabilite: 88,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    bio: 'Consultant avec 7 ans d\'expérience dans le déploiement d\'applications métier Power Apps, l\'automatisation de processus Power Automate et la gouvernance Dataverse. Spécialisé Azure OpenAI & Copilot.',
    tjdSouhaite: 650,
    cvScore: 82,
    cvLastUpdate: '2026-07-28',
    competences: [
      { id: 'c1', libelle: 'Power Apps (Canvas & Model-Driven)', niveau: 'Expert', categorie: 'Power Platform', demandLevel: 'Critique', trendScore: 95 },
      { id: 'c2', libelle: 'Power Automate & Cloud Flows', niveau: 'Expert', categorie: 'Power Platform', demandLevel: 'Forte', trendScore: 90 },
      { id: 'c3', libelle: 'Dataverse & Solution Architecture', niveau: 'Avancé', categorie: 'Power Platform', demandLevel: 'Critique', trendScore: 88 },
      { id: 'c4', libelle: 'Copilot Studio & Azure OpenAI', niveau: 'Intermédiaire', categorie: 'IA Générative', demandLevel: 'Critique', trendScore: 98 },
      { id: 'c5', libelle: 'Power BI & DAX Data Modeling', niveau: 'Avancé', categorie: 'Data & Power BI', demandLevel: 'Forte', trendScore: 85 },
      { id: 'c6', libelle: 'Azure Functions & Web APIs', niveau: 'Intermédiaire', categorie: 'Cloud Azure', demandLevel: 'Forte', trendScore: 78 }
    ],
    certifications: [
      { id: 'cert-1', nom: 'Microsoft Certified: Power Platform Functional Consultant Associate', code: 'PL-200', dateObtention: '2024-03-15', status: 'Valide', publisher: 'Microsoft' },
      { id: 'cert-2', nom: 'Microsoft Certified: Power Platform Solution Architect Expert', code: 'PL-600', dateObtention: '2025-01-20', status: 'Valide', publisher: 'Microsoft' },
      { id: 'cert-3', nom: 'Microsoft Certified: Azure AI Engineer Associate', code: 'AI-102', dateObtention: '2025-09-10', status: 'Valide', publisher: 'Azure' }
    ],
    currentFormations: [
      {
        id: 'f-1',
        nom: 'Deep Dive Copilot Studio & Custom Plug-ins AI Builder',
        categorie: 'IA Générative',
        dureeHours: 14,
        provider: 'Microsoft Learn',
        certificationAssociee: 'PL-500',
        priorite: 'Critique',
        impactEmployabilite: 15,
        linkUrl: 'https://learn.microsoft.com/copilot-studio',
        status: 'En_cours',
        progressPercentage: 65
      },
      {
        id: 'f-2',
        nom: 'Azure Security & Data Encryption Fundamentals',
        categorie: 'Cybersécurité',
        dureeHours: 8,
        provider: 'Azure Certification',
        certificationAssociee: 'AZ-500',
        priorite: 'Haute',
        impactEmployabilite: 8,
        linkUrl: 'https://learn.microsoft.com/azure/security',
        status: 'A_faire',
        progressPercentage: 0
      }
    ]
  },
  {
    id: 'cons-2',
    nom: 'Moreau',
    prenom: 'Claire',
    email: 'c.moreau@interflow-esn.com',
    manager: 'Thomas Benali',
    grade: 'Confirmé',
    title: 'Consultante Data & Power BI Analyst',
    dateDebutIntercontrat: '2026-07-22',
    joursIntercontrat: 15,
    employabilite: 79,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    bio: 'Experte en modélisation de données complexes, création de tableaux de bord financiers et RH avec Power BI & Fabric.',
    tjdSouhaite: 520,
    cvScore: 74,
    cvLastUpdate: '2026-07-23',
    competences: [
      { id: 'c5', libelle: 'Power BI & DAX Data Modeling', niveau: 'Expert', categorie: 'Data & Power BI', demandLevel: 'Forte', trendScore: 92 },
      { id: 'c7', libelle: 'Microsoft Fabric & Synapse Analytics', niveau: 'Intermédiaire', categorie: 'Data & Power BI', demandLevel: 'Critique', trendScore: 96 },
      { id: 'c8', libelle: 'SQL Server & T-SQL Optimization', niveau: 'Avancé', categorie: 'Data & Power BI', demandLevel: 'Moyenne', trendScore: 70 }
    ],
    certifications: [
      { id: 'cert-4', nom: 'Microsoft Certified: Power BI Data Analyst Associate', code: 'PL-300', dateObtention: '2024-11-05', status: 'Valide', publisher: 'Microsoft' }
    ],
    currentFormations: [
      {
        id: 'f-3',
        nom: 'Implementing Real-Time Analytics with Microsoft Fabric',
        categorie: 'Data & Power BI',
        dureeHours: 20,
        provider: 'Microsoft Learn',
        certificationAssociee: 'DP-600',
        priorite: 'Critique',
        impactEmployabilite: 18,
        linkUrl: 'https://learn.microsoft.com/fabric',
        status: 'En_cours',
        progressPercentage: 40
      }
    ]
  },
  {
    id: 'cons-3',
    nom: 'Benali',
    prenom: 'Karim',
    email: 'k.benali@interflow-esn.com',
    manager: 'Sophie Martin',
    grade: 'Lead',
    title: 'Lead Architecte Cloud Azure & Cybersécurité',
    dateDebutIntercontrat: '2026-08-01',
    joursIntercontrat: 5,
    employabilite: 94,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    bio: '10+ ans dans l\'infrastructure hybride, la migration Cloud Azure et la sécurisation Zero Trust d\'environnements CAC40.',
    tjdSouhaite: 780,
    cvScore: 91,
    cvLastUpdate: '2026-08-02',
    competences: [
      { id: 'c9', libelle: 'Azure Cloud Infrastructure & Landing Zones', niveau: 'Expert', categorie: 'Cloud Azure', demandLevel: 'Critique', trendScore: 94 },
      { id: 'c10', libelle: 'Cybersécurité Azure Sentinel & Zero Trust', niveau: 'Expert', categorie: 'Cybersécurité', demandLevel: 'Critique', trendScore: 99 },
      { id: 'c11', libelle: 'Terraform & Infrastructure as Code', niveau: 'Avancé', categorie: 'Cloud Azure', demandLevel: 'Forte', trendScore: 89 }
    ],
    certifications: [
      { id: 'cert-5', nom: 'Microsoft Certified: Azure Solutions Architect Expert', code: 'AZ-305', dateObtention: '2023-06-12', status: 'Valide', publisher: 'Azure' },
      { id: 'cert-6', nom: 'Microsoft Certified: Cybersecurity Architect Expert', code: 'SC-100', dateObtention: '2025-02-18', status: 'Valide', publisher: 'Azure' }
    ],
    currentFormations: []
  }
];

export const INITIAL_FORMATIONS: Formation[] = [
  {
    id: 'f-1',
    nom: 'Deep Dive Copilot Studio & Custom Plug-ins AI Builder',
    categorie: 'IA Générative',
    dureeHours: 14,
    provider: 'Microsoft Learn',
    certificationAssociee: 'PL-500',
    priorite: 'Critique',
    impactEmployabilite: 15,
    linkUrl: 'https://learn.microsoft.com/training/paths/copilot-studio-get-started/',
    status: 'En_cours',
    progressPercentage: 65
  },
  {
    id: 'f-2',
    nom: 'Azure Security & Data Encryption Fundamentals',
    categorie: 'Cybersécurité',
    dureeHours: 8,
    provider: 'Azure Certification',
    certificationAssociee: 'AZ-500',
    priorite: 'Haute',
    impactEmployabilite: 8,
    linkUrl: 'https://learn.microsoft.com/training/paths/azure-security-fundamentals/',
    status: 'A_faire',
    progressPercentage: 0
  },
  {
    id: 'f-3',
    nom: 'Implementing Real-Time Analytics with Microsoft Fabric',
    categorie: 'Data & Power BI',
    dureeHours: 20,
    provider: 'Microsoft Learn',
    certificationAssociee: 'DP-600',
    priorite: 'Critique',
    impactEmployabilite: 18,
    linkUrl: 'https://learn.microsoft.com/training/paths/fabric-analytics-engineer/',
    status: 'En_cours',
    progressPercentage: 40
  },
  {
    id: 'f-4',
    nom: 'Power Automate Process Mining & Robotic Process Automation (RPA)',
    categorie: 'Power Platform',
    dureeHours: 16,
    provider: 'Power Platform Academy',
    certificationAssociee: 'PL-500',
    priorite: 'Haute',
    impactEmployabilite: 12,
    linkUrl: 'https://learn.microsoft.com/training/paths/rpa-power-automate-desktop/',
    status: 'A_faire',
    progressPercentage: 0
  },
  {
    id: 'f-5',
    nom: 'Architecture Réseaux Hybrides, SD-WAN & Azure Virtual WAN',
    categorie: 'Télécoms & Réseaux',
    dureeHours: 25,
    provider: 'Coursera',
    certificationAssociee: 'AZ-700',
    priorite: 'Moyenne',
    impactEmployabilite: 10,
    linkUrl: 'https://learn.microsoft.com/training/paths/azure-network-engineer/',
    status: 'A_faire',
    progressPercentage: 0
  },
  {
    id: 'f-6',
    nom: 'Développement d\'Agents IA avec Semantic Kernel & LangChain',
    categorie: 'IA Générative',
    dureeHours: 18,
    provider: 'Microsoft Learn',
    certificationAssociee: 'AI-102',
    priorite: 'Critique',
    impactEmployabilite: 22,
    linkUrl: 'https://learn.microsoft.com/semantic-kernel',
    status: 'A_faire',
    progressPercentage: 0
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'm-101',
    client: 'BNP Paribas - Banque de Détail',
    clientLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=150',
    title: 'Lead Architecte Power Platform & Automatisation Processus Risques',
    description: 'Conception et déploiement d\'une suite d\'applications métier canvas & model-driven sous Dataverse pour le traitement automatisé des dossiers de crédit et la validation réglementaire.',
    dateDemarrage: '2026-09-01',
    dureeMois: 12,
    lieu: 'Paris Opera / Hybride 2j télétravail',
    tjd: 680,
    status: 'Ouverte',
    sector: 'Finance / Banque',
    competencesRequises: [
      { skillName: 'Power Apps (Canvas & Model-Driven)', requiredLevel: 'Expert', weight: 5 },
      { skillName: 'Dataverse & Solution Architecture', requiredLevel: 'Expert', weight: 5 },
      { skillName: 'Power Automate & Cloud Flows', requiredLevel: 'Avancé', weight: 4 },
      { skillName: 'Copilot Studio & Azure OpenAI', requiredLevel: 'Intermédiaire', weight: 3 }
    ]
  },
  {
    id: 'm-102',
    client: 'TotalEnergies Digital Lab',
    clientLogo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&q=80&w=150',
    title: 'Expert Azure OpenAI & Copilot Custom Integration',
    description: 'Création d\'assistants conversationnels internes sécurisés pour la recherche documentaire technique (RAG) sur Azure AI Search & GPT-4o.',
    dateDemarrage: '2026-08-25',
    dureeMois: 6,
    lieu: 'La Défense / Hybride',
    tjd: 720,
    status: 'Ouverte',
    sector: 'Énergie & Industrie',
    competencesRequises: [
      { skillName: 'Copilot Studio & Azure OpenAI', requiredLevel: 'Expert', weight: 5 },
      { skillName: 'Azure Functions & Web APIs', requiredLevel: 'Avancé', weight: 4 },
      { skillName: 'Cybersécurité Azure Sentinel & Zero Trust', requiredLevel: 'Intermédiaire', weight: 3 }
    ]
  },
  {
    id: 'm-103',
    client: 'Sanofi Healthcare France',
    clientLogo: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=150',
    title: 'Consultant Lead Microsoft Fabric & Power BI Enterprise',
    description: 'Mise en place de la plateforme de reporting analytique globale sur Microsoft Fabric, ingestion de données multi-sources et tableaux de bord exécutifs.',
    dateDemarrage: '2026-09-15',
    dureeMois: 9,
    lieu: 'Gentilly / Hybride',
    tjd: 650,
    status: 'Ouverte',
    sector: 'Sante & Pharma',
    competencesRequises: [
      { skillName: 'Microsoft Fabric & Synapse Analytics', requiredLevel: 'Expert', weight: 5 },
      { skillName: 'Power BI & DAX Data Modeling', requiredLevel: 'Expert', weight: 5 },
      { skillName: 'SQL Server & T-SQL Optimization', requiredLevel: 'Avancé', weight: 3 }
    ]
  }
];

export const DATAVERSE_ENTITIES: DataverseEntity[] = [
  {
    name: 'Consultant',
    logicalName: 'itf_consultant',
    description: 'Table principale Dataverse stockant le profil, le statut d\'intercontrat et l\'employabilité des consultants.',
    fields: [
      { displayName: 'Consultant ID', logicalName: 'itf_consultantid', type: 'Uniqueidentifier (PK)', required: true, description: 'Clé primaire unique' },
      { displayName: 'Nom', logicalName: 'itf_lastname', type: 'Single Line Text', required: true, description: 'Nom de famille' },
      { displayName: 'Prénom', logicalName: 'itf_firstname', type: 'Single Line Text', required: true, description: 'Prénom du consultant' },
      { displayName: 'Email', logicalName: 'itf_email', type: 'Single Line Text', required: true, description: 'Email professionnel' },
      { displayName: 'Grade', logicalName: 'itf_grade', type: 'OptionSet / Choice', required: true, description: 'Junior, Confirmé, Senior, Lead, Expert' },
      { displayName: 'Date Début Intercontrat', logicalName: 'itf_intercontratstartdate', type: 'Date and Time', required: true, description: 'Date de passage en intercontrat' },
      { displayName: 'Score Employabilité', logicalName: 'itf_employabilityscore', type: 'Whole Number (0-100)', required: false, description: 'Calculé automatiquement via Azure OpenAI' }
    ],
    relationships: [
      { type: '1:N', targetEntity: 'Competence', lookupField: 'itf_consultantid' },
      { type: '1:N', targetEntity: 'CV', lookupField: 'itf_consultantid' },
      { type: '1:N', targetEntity: 'Certification', lookupField: 'itf_consultantid' }
    ]
  },
  {
    name: 'Compétence',
    logicalName: 'itf_competence',
    description: 'Cartographie des compétences techniques et fonctionnelles associées aux consultants.',
    fields: [
      { displayName: 'Compétence ID', logicalName: 'itf_competenceid', type: 'Uniqueidentifier (PK)', required: true, description: 'Clé primaire' },
      { displayName: 'Libellé', logicalName: 'itf_name', type: 'Single Line Text', required: true, description: 'Nom de la compétence' },
      { displayName: 'Niveau', logicalName: 'itf_level', type: 'Choice', required: true, description: 'Débutant, Intermédiaire, Avancé, Expert' },
      { displayName: 'Catégorie', logicalName: 'itf_category', type: 'Choice', required: true, description: 'Power Platform, Cloud Azure, IA Générative, etc.' }
    ],
    relationships: [
      { type: 'N:1', targetEntity: 'Consultant', lookupField: 'itf_consultantid' }
    ]
  },
  {
    name: 'Mission',
    logicalName: 'itf_mission',
    description: 'Opportunités de staffing et exigences des clients ESN.',
    fields: [
      { displayName: 'Mission ID', logicalName: 'itf_missionid', type: 'Uniqueidentifier (PK)', required: true, description: 'Clé primaire' },
      { displayName: 'Client', logicalName: 'itf_clientname', type: 'Single Line Text', required: true, description: 'Nom du compte client' },
      { displayName: 'Intitulé', logicalName: 'itf_title', type: 'Single Line Text', required: true, description: 'Titre du poste recherché' },
      { displayName: 'TJD Indicatif', logicalName: 'itf_tjd', type: 'Currency', required: false, description: 'Taux journalier cible' }
    ],
    relationships: [
      { type: '1:N', targetEntity: 'MatchingResult', lookupField: 'itf_missionid' }
    ]
  }
];

export const USER_STORIES: UserStory[] = [
  {
    id: 'US-001',
    role: 'Consultant',
    title: 'Analyse automatique de CV par IA',
    userNeed: 'Je veux uploader mon CV (PDF/Word) afin que l\'IA extrait automatiquement mes compétences, mes certifs et évalue le score ATS.',
    businessGoal: 'Réduire le temps de qualification RH et éliminer la saisie manuelle.',
    acceptanceCriteria: [
      'Support des fichiers PDF et DOCX jusqu\'à 10 Mo',
      'Extraction des compétences classées par niveau et catégorie',
      'Calcul d\'un score sur 100 avec feedback détaillé'
    ],
    priority: 'Must',
    estimationPoints: 8,
    module: 'Gestion des CV'
  },
  {
    id: 'US-002',
    role: 'Consultant',
    title: 'Génération de CV personnalisés 4-en-1',
    userNeed: 'Je veux générer automatiquement une déclinaison de mon CV adaptée à mon interlocuteur (Client, Technique, Management, Commercial).',
    businessGoal: 'Augmenter le taux de transformation lors des présentations d\'appels d\'offres.',
    acceptanceCriteria: [
      'Génération instantanée des 4 modèles enrichis par IA',
      'Option d\'export immédiat au format PDF ou Word',
      'Adaptation automatique du vocabulaire au contexte visé'
    ],
    priority: 'Must',
    estimationPoints: 13,
    module: 'Génération de CV'
  },
  {
    id: 'US-003',
    role: 'Staffing Manager',
    title: 'Matching IA Consultant VS Mission',
    userNeed: 'Je veux comparer en un clic le profil d\'un consultant en intercontrat avec les besoins des missions pour connaître le % de compatibilité.',
    businessGoal: 'Réduire la durée moyenne d\'intercontrat de 30%.',
    acceptanceCriteria: [
      'Calcul automatique du pourcentage de compatibilité',
      'Identification visuelle des compétences manquantes',
      'Estimation du délai d\'upskilling nécessaire'
    ],
    priority: 'Must',
    estimationPoints: 8,
    module: 'Matching Missions'
  },
  {
    id: 'US-004',
    role: 'RH',
    title: 'Copilot RH conversationnel',
    userNeed: 'Je veux interagir avec un assistant virtuel IA pour préparer les entretiens clients, rédiger des fiches de compétences et recommander des parcours.',
    businessGoal: 'Accompagner proactivement chaque consultant pendant son intercontrat.',
    acceptanceCriteria: [
      'Interface de chat fluide Copilot Studio / Gemini',
      'Questions-réponses contextualisées sur les missions et CV',
      'Boutons de prompts rapides'
    ],
    priority: 'Must',
    estimationPoints: 13,
    module: 'Copilot RH'
  }
];

export const SPRINTS_PLAN: SprintPlan[] = [
  {
    sprintNumber: 1,
    sprintGoal: 'Fondations Dataverse, Authentification M365 & Dashboard Consultant Base',
    durationWeeks: 2,
    userStories: ['US-001 (Setup Dataverse)', 'US-005 (Auth Azure AD/Entra ID)'],
    deliverables: ['Schéma de données Dataverse déployé', 'Vue d\'accueil Consultant fonctionnelle']
  },
  {
    sprintNumber: 2,
    sprintGoal: 'Analyse de CV IA & AI Builder Service',
    durationWeeks: 2,
    userStories: ['US-001 (Parsing PDF/Docx & AI Extractor)'],
    deliverables: ['Module de gestion des CV opérationnel', 'Parsing IA & Score ATS sur 100']
  },
  {
    sprintNumber: 3,
    sprintGoal: 'Génération automatique de 4 versions de CV & Exporter Power Automate',
    durationWeeks: 2,
    userStories: ['US-002 (Génération 4-in-1 CV & Word/PDF Export)'],
    deliverables: ['Moteur de restructuration de CV', 'Modèles Client, Tech, Mgmt, Commercial']
  },
  {
    sprintNumber: 4,
    sprintGoal: 'Recommandation Formations & Intégration Microsoft Learn API',
    durationWeeks: 2,
    userStories: ['US-006 (Formations & Certifications Upskilling)'],
    deliverables: ['Catalogue interactif MS Learn / Azure', 'Suivi de progression & impact employabilité']
  },
  {
    sprintNumber: 5,
    sprintGoal: 'Matching Avancé Consultant vs Mission & Algorithme d\'Ecart',
    durationWeeks: 2,
    userStories: ['US-003 (Matching IA & Positionnement Staffing)'],
    deliverables: ['Tableau de matching avec % compatibilité', 'Plans d\'upskilling ciblés']
  },
  {
    sprintNumber: 6,
    sprintGoal: 'Copilot RH, Dashboards Manager/RH Power BI & Recette Finale',
    durationWeeks: 2,
    userStories: ['US-004 (Copilot RH Conversationnel)', 'US-007 (Dashboards Manager/RH)'],
    deliverables: ['Assistant Copilot RH actif', 'Dashboards exécutifs RH & Staffing', 'Application InterFlow MVP Production']
  }
];

export const DEFAULT_USERS: import('./types').UserSession[] = [
  {
    id: 'user-admin',
    nom: 'Kershaw',
    prenom: 'Alexandre',
    email: 'a.kershaw@interflow-esn.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250',
    title: 'Administrateur SI & Power Platform Tenant',
    department: 'Direction des Systèmes d\'Information',
    status: 'Actif',
    lastLogin: 'En ce moment'
  },
  {
    id: 'user-1',
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'j.dupont@interflow-esn.com',
    role: 'Consultant',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Architecte Microsoft Power Platform & Cloud Azure',
    department: 'Practice Cloud & Business Apps',
    consultantId: 'cons-1',
    status: 'Actif',
    lastLogin: 'Aujourd\'hui 09:15'
  },
  {
    id: 'user-2',
    nom: 'Valette',
    prenom: 'Marc',
    email: 'm.valette@interflow-esn.com',
    role: 'Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Responsable Staffing & Pilotage Bench Intercontrats',
    department: 'Direction des Opérations & Resource Management',
    status: 'Actif',
    lastLogin: 'Hier 17:40'
  },
  {
    id: 'user-3',
    nom: 'Bernard',
    prenom: 'Sophie',
    email: 's.bernard@interflow-esn.com',
    role: 'RH',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    title: 'Directrice RH, GPEC & Capital Humain',
    department: 'Direction Ressources Humaines',
    status: 'Actif',
    lastLogin: 'Aujourd\'hui 08:30'
  },
  {
    id: 'user-4',
    nom: 'Moreau',
    prenom: 'Camille',
    email: 'c.moreau@interflow-esn.com',
    role: 'Consultant',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    title: 'Consultante Lead Développeuse Fullstack Azure & React',
    department: 'Practice Dev & Modern Apps',
    consultantId: 'cons-2',
    status: 'Actif',
    lastLogin: 'Hier 11:20'
  }
];

export const ROLE_PERMISSIONS: import('./types').RolePermission[] = [
  {
    module: 'Tableau de Bord Consultant',
    consultant: true,
    manager: false,
    rh: false,
    admin: true,
    description: 'Accès au suivi individuel d\'intercontrat, employabilité et plan d\'action personalisé'
  },
  {
    module: 'Analyse & Optimisation CV IA',
    consultant: true,
    manager: true,
    rh: true,
    admin: true,
    description: 'Score ATS, extraction de compétences et recommandations de réécriture'
  },
  {
    module: 'Génération 4 Modèles CV',
    consultant: true,
    manager: true,
    rh: true,
    admin: true,
    description: 'Moteur de restructuration automatique (Client, Tech, Mgmt, Commercial)'
  },
  {
    module: 'Catalogue Formations MS Learn',
    consultant: true,
    manager: false,
    rh: true,
    admin: true,
    description: 'Inscriptions, badges et suivi du plan de montée en compétences'
  },
  {
    module: 'Matching IA Missions vs Profils',
    consultant: true,
    manager: true,
    rh: true,
    admin: true,
    description: 'Visualisation des opportunités et calcul des écarts de compétences'
  },
  {
    module: 'Copilot RH Conversationnel',
    consultant: true,
    manager: true,
    rh: true,
    admin: true,
    description: 'Assistant intelligent pour questions RH, formations et opportunités'
  },
  {
    module: 'Bench Intercontrat & Staffing Manager',
    consultant: false,
    manager: true,
    rh: false,
    admin: true,
    description: 'Pilotage global du bench, affectation des missions et suivi du TJM'
  },
  {
    module: 'Dashboard Exécutif RH & Analytics GPEC',
    consultant: false,
    manager: false,
    rh: true,
    admin: true,
    description: 'Cartographie des compétences, prévision des besoins et investissement formation'
  },
  {
    module: 'Gestion Utilisateurs & Droits Entra ID / Dataverse',
    consultant: false,
    manager: false,
    rh: false,
    admin: true,
    description: 'Console Administrateur : ajout d\'utilisateurs, attribution des rôles et contrôle RBAC'
  },
  {
    module: 'Spécifications Techniques PO & Dataverse',
    consultant: true,
    manager: true,
    rh: true,
    admin: true,
    description: 'Consultation du dossier d\'architecture, User Stories & entités Dataverse'
  }
];
