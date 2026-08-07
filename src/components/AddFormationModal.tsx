import React, { useState } from 'react';
import { X, GraduationCap, Award, BookOpen, Clock, Sparkles, Plus, ExternalLink } from 'lucide-react';
import { Formation, SkillCategory } from '../types';

interface AddFormationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFormation: (formation: Formation) => void;
  isDarkMode: boolean;
}

export const AddFormationModal: React.FC<AddFormationModalProps> = ({
  isOpen,
  onClose,
  onAddFormation,
  isDarkMode,
}) => {
  const [nom, setNom] = useState('');
  const [categorie, setCategorie] = useState<SkillCategory>('Power Platform');
  const [provider, setProvider] = useState<'Microsoft Learn' | 'Azure Certification' | 'Power Platform Academy' | 'Coursera' | 'Internal ESN'>('Microsoft Learn');
  const [dureeHours, setDureeHours] = useState('20');
  const [priorite, setPriorite] = useState<'Critique' | 'Haute' | 'Moyenne'>('Haute');
  const [impactEmployabilite, setImpactEmployabilite] = useState('20');
  const [certificationAssociee, setCertificationAssociee] = useState('');
  const [linkUrl, setLinkUrl] = useState('https://learn.microsoft.com');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom) return;

    const newFormation: Formation = {
      id: `f-custom-${Date.now()}`,
      nom,
      categorie,
      provider,
      dureeHours: parseInt(dureeHours) || 16,
      priorite,
      impactEmployabilite: parseInt(impactEmployabilite) || 20,
      certificationAssociee: certificationAssociee || undefined,
      linkUrl: linkUrl || 'https://learn.microsoft.com',
      status: 'A_faire',
      progressPercentage: 0,
    };

    onAddFormation(newFormation);
    onClose();
    setNom('');
    setCertificationAssociee('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className={`w-full max-w-xl p-6 md:p-8 rounded-3xl border shadow-2xl overflow-y-auto max-h-[90vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">Ajouter au Catalogue de Formation</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enrichissez le catalogue d'upskilling et de certifications MS Learn / ESN.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
              Nom de la Formation / Parcours MS Learn *
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="ex: PL-500: Power Automate RPA Developer Masterclass"
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Catégorie de Compétences
              </label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value as SkillCategory)}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Power Platform">Power Platform</option>
                <option value="IA Générative">IA Générative</option>
                <option value="Cloud Azure">Cloud Azure</option>
                <option value="Data & Power BI">Data & Power BI</option>
                <option value="Cybersécurité">Cybersécurité</option>
                <option value="Dev Fullstack">Dev Fullstack</option>
                <option value="Télécoms & Réseaux">Télécoms & Réseaux</option>
                <option value="Agile & Soft Skills">Agile & Soft Skills</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Fournisseur / Plateforme
              </label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Microsoft Learn">Microsoft Learn</option>
                <option value="Azure Certification">Azure Certification</option>
                <option value="Power Platform Academy">Power Platform Academy</option>
                <option value="Coursera">Coursera</option>
                <option value="Internal ESN">Internal ESN Academy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Durée (Heures)
              </label>
              <input
                type="number"
                value={dureeHours}
                onChange={(e) => setDureeHours(e.target.value)}
                placeholder="20"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Niveau de Priorité
              </label>
              <select
                value={priorite}
                onChange={(e) => setPriorite(e.target.value as any)}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Critique">Critique (Stratégique)</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Impact Employabilité (%)
              </label>
              <input
                type="number"
                value={impactEmployabilite}
                onChange={(e) => setImpactEmployabilite(e.target.value)}
                placeholder="25"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Code Certif Associée (Optionnel)
              </label>
              <input
                type="text"
                value={certificationAssociee}
                onChange={(e) => setCertificationAssociee(e.target.value)}
                placeholder="ex: PL-500, AI-102, AZ-305"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Lien Web / Documentation
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://learn.microsoft.com/..."
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter au Catalogue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
