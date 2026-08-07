import React, { useState } from 'react';
import { X, Briefcase, Building2, MapPin, Calendar, DollarSign, Plus, Sparkles, Check } from 'lucide-react';
import { Mission, SkillLevel } from '../types';

interface AddMissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMission: (mission: Mission) => void;
  isDarkMode: boolean;
}

export const AddMissionModal: React.FC<AddMissionModalProps> = ({
  isOpen,
  onClose,
  onAddMission,
  isDarkMode,
}) => {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [sector, setSector] = useState('Banque & Finance');
  const [lieu, setLieu] = useState('Paris (Hybrid 2j TT)');
  const [tjd, setTjd] = useState('750');
  const [dureeMois, setDureeMois] = useState('6');
  const [dateDemarrage, setDateDemarrage] = useState('2026-09-01');
  const [description, setDescription] = useState('');
  
  // Custom skills input
  const [skill1, setSkill1] = useState('Power Platform');
  const [level1, setLevel1] = useState<SkillLevel>('Avancé');
  const [skill2, setSkill2] = useState('Cloud Azure');
  const [level2, setLevel2] = useState<SkillLevel>('Intermédiaire');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client) return;

    const newMission: Mission = {
      id: `m-custom-${Date.now()}`,
      title,
      client,
      sector,
      lieu,
      tjd: parseInt(tjd) || 700,
      dureeMois: parseInt(dureeMois) || 6,
      dateDemarrage,
      description: description || `Mission stratégique chez ${client} pour l'accompagnement et la réalisation de projets d'envergure.`,
      status: 'Ouverte',
      competencesRequises: [
        { skillName: skill1, requiredLevel: level1, weight: 5 },
        { skillName: skill2, requiredLevel: level2, weight: 4 },
      ]
    };

    onAddMission(newMission);
    onClose();
    // Reset defaults
    setTitle('');
    setClient('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className={`w-full max-w-2xl p-6 md:p-8 rounded-3xl border shadow-2xl overflow-y-auto max-h-[90vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">Ajouter une Nouvelle Mission Client</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Publiez un nouveau besoin client dans la matrice de matching automatique InterFlow.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Intitulé de la Mission *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ex: Architecte Senior Power Platform & Copilot"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Nom du Client ESN *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="ex: TotalEnergies, BNP Paribas, Air France"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Secteur d'activité
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              >
                <option value="Banque & Finance">Banque & Finance</option>
                <option value="Énergie & Utilities">Énergie & Utilities</option>
                <option value="Aéronautique & Défense">Aéronautique & Défense</option>
                <option value="Retail & Luxe">Retail & Luxe</option>
                <option value="Santé & Pharma">Santé & Pharma</option>
                <option value="Télécoms & Médias">Télécoms & Médias</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Lieu / Modalité
              </label>
              <input
                type="text"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                placeholder="Paris (3j TT), Lyon, Full Remote"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                TJD Cible (€/jour)
              </label>
              <input
                type="number"
                value={tjd}
                onChange={(e) => setTjd(e.target.value)}
                placeholder="750"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Durée (Mois)
              </label>
              <input
                type="number"
                value={dureeMois}
                onChange={(e) => setDureeMois(e.target.value)}
                placeholder="6"
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                Date de Démarrage Prévue
              </label>
              <input
                type="date"
                value={dateDemarrage}
                onChange={(e) => setDateDemarrage(e.target.value)}
                className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
                }`}
              />
            </div>
          </div>

          {/* Key Competences Section */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <p className="text-xs font-bold text-blue-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Exigences Compétences Majeures (Scoring Matching)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold mb-1">Compétence Principale 1</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skill1}
                    onChange={(e) => setSkill1(e.target.value)}
                    placeholder="ex: Power Platform"
                    className={`flex-1 px-3 py-2 text-xs rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                    }`}
                  />
                  <select
                    value={level1}
                    onChange={(e) => setLevel1(e.target.value as SkillLevel)}
                    className={`px-2 py-2 text-xs rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold mb-1">Compétence Principale 2</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skill2}
                    onChange={(e) => setSkill2(e.target.value)}
                    placeholder="ex: Cloud Azure"
                    className={`flex-1 px-3 py-2 text-xs rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                    }`}
                  />
                  <select
                    value={level2}
                    onChange={(e) => setLevel2(e.target.value as SkillLevel)}
                    className={`px-2 py-2 text-xs rounded-xl border ${
                      isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5 text-slate-700 dark:text-slate-300">
              Description & Contexte Projet
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez les objectifs, la méthodologie et le cadrage technique de la mission..."
              className={`w-full px-3.5 py-2.5 text-xs rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
              }`}
            />
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
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Publier la Mission Client</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
