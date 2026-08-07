export type Grade = 'Junior' | 'Confirmé' | 'Senior' | 'Lead' | 'Expert';
export type SkillCategory = 
  | 'Power Platform' 
  | 'Cloud Azure' 
  | 'IA Générative' 
  | 'Data & Power BI' 
  | 'Cybersécurité' 
  | 'Dev Fullstack' 
  | 'Télécoms & Réseaux'
  | 'Agile & Soft Skills';

export type SkillLevel = 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert';

export interface Competence {
  id: string;
  libelle: string;
  niveau: SkillLevel;
  categorie: SkillCategory;
  demandLevel: 'Critique' | 'Forte' | 'Moyenne';
  trendScore?: number; // percentage trend
}

export interface Certification {
  id: string;
  nom: string;
  code: string;
  dateObtention: string;
  expiration?: string;
  status: 'Valide' | 'Expirant' | 'A_Renouveler';
  badgeUrl?: string;
  publisher: 'Microsoft' | 'Azure' | 'AWS' | 'Scrum.org' | 'Cisco' | 'Autre';
}

export interface Formation {
  id: string;
  nom: string;
  categorie: SkillCategory;
  dureeHours: number;
  provider: 'Microsoft Learn' | 'Azure Certification' | 'Power Platform Academy' | 'Coursera' | 'Internal ESN';
  certificationAssociee?: string;
  priorite: 'Critique' | 'Haute' | 'Moyenne';
  impactEmployabilite: number; // percentage boost e.g. +18%
  linkUrl: string;
  status: 'A_faire' | 'En_cours' | 'Termine';
  progressPercentage?: number;
}

export interface Consultant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  manager: string;
  grade: Grade;
  dateDebutIntercontrat: string; // ISO format
  joursIntercontrat: number;
  employabilite: number; // 0 - 100%
  avatar: string;
  title: string;
  bio: string;
  tjdSouhaite: number;
  competences: Competence[];
  certifications: Certification[];
  currentFormations: Formation[];
  cvScore: number;
  cvLastUpdate: string;
}

export interface MissionSkillReq {
  skillName: string;
  requiredLevel: SkillLevel;
  weight: number; // 1 to 5
}

export interface Mission {
  id: string;
  client: string;
  clientLogo?: string;
  title: string;
  description: string;
  competencesRequises: MissionSkillReq[];
  dateDemarrage: string;
  dureeMois: number;
  lieu: string;
  tjd: number;
  status: 'Ouverte' | 'En_pourparlers' | 'Pourvue';
  sector: string;
}

export interface MatchingResult {
  mission: Mission;
  consultantId: string;
  scoreMatch: number; // 0 - 100%
  matchingSkills: string[];
  missingSkills: {
    skillName: string;
    currentLevel?: SkillLevel;
    requiredLevel: SkillLevel;
    estimatedDaysToAcquire: number;
    recommendedFormationId?: string;
  }[];
  readinessDelayDays: number;
}

export interface CVAnalysisResult {
  score: number; // /100
  summary: string;
  extractedSkills: { name: string; category: SkillCategory; level: SkillLevel }[];
  extractedCertifications: string[];
  missingKeywords: string[];
  contentSuggestions: {
    originalText: string;
    suggestedText: string;
    reason: string;
  }[];
  skillSuggestions: string[];
}

export type CVVersionType = 'client' | 'technique' | 'management' | 'commercial';

export interface GeneratedCVVersion {
  type: CVVersionType;
  title: string;
  badge: string;
  targetAudience: string;
  profileSummary: string;
  highlightedSkills: string[];
  experienceFormat: {
    company: string;
    role: string;
    period: string;
    bulletPoints: string[];
  }[];
  certificationsFormatted: string[];
}

export interface UserStory {
  id: string;
  role: 'Consultant' | 'Manager' | 'Staffing Manager' | 'RH' | 'Système';
  title: string;
  userNeed: string;
  businessGoal: string;
  acceptanceCriteria: string[];
  priority: 'Must' | 'Should' | 'Could';
  estimationPoints: number;
  module: string;
}

export interface DataverseEntity {
  name: string;
  logicalName: string;
  description: string;
  fields: {
    displayName: string;
    logicalName: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  relationships: {
    type: '1:N' | 'N:1' | 'N:N';
    targetEntity: string;
    lookupField: string;
  }[];
}

export type UserRole = 'Consultant' | 'Manager' | 'RH' | 'Admin';

export interface UserSession {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  title: string;
  department: string;
  consultantId?: string;
  status?: 'Actif' | 'Inactif' | 'Suspendu';
  lastLogin?: string;
}

export interface RolePermission {
  module: string;
  consultant: boolean;
  manager: boolean;
  rh: boolean;
  admin: boolean;
  description: string;
}

export interface SprintPlan {
  sprintNumber: number;
  sprintGoal: string;
  durationWeeks: number;
  userStories: string[];
  deliverables: string[];
}
