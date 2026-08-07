import React from 'react';
import { ShieldAlert, Lock, UserCheck, Shield, KeyRound, Info } from 'lucide-react';
import { UserRole } from '../types';

interface AccessRestrictedProps {
  requiredRole: 'Manager' | 'RH' | 'Admin';
  currentRole: UserRole;
  onOpenRoleModal: () => void;
  isDarkMode: boolean;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({
  requiredRole,
  currentRole,
  onOpenRoleModal,
  isDarkMode,
}) => {
  return (
    <div className={`p-8 md:p-12 rounded-3xl border text-center max-w-2xl mx-auto my-8 space-y-6 shadow-xl ${
      isDarkMode ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto border border-amber-500/20 shadow-inner">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300/30">
          Isolation des Profils & Sécurité RBAC Dataverse
        </span>
        <h2 className="text-xl md:text-2xl font-black">Accès Restreint — Profil non Habilité</h2>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          Votre compte est actuellement identifié sous le rôle unique <strong className="text-blue-500">{currentRole}</strong>. Conformément aux règles de sécurité, chaque utilisateur accède exclusivement à son propre périmètre de données.
        </p>
      </div>

      {/* Permissions Box */}
      <div className={`p-4 rounded-2xl border text-left text-xs space-y-2 ${
        isDarkMode ? 'bg-slate-800/50 border-slate-700/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
      }`}>
        <p className="font-bold flex items-center gap-2 text-slate-900 dark:text-white">
          <Lock className="w-4 h-4 text-amber-500" />
          Comment modifier vos droits d'accès ?
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
          Seul un <strong>Administrateur SI & Dataverse</strong> habilité peut ajouter des utilisateurs, modifier les rôles Entra ID ou vous attribuer la licence <strong>{requiredRole}</strong> depuis la console d'administration centralisée.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onOpenRoleModal}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          <span>Consulter les Droits & la Matrice RBAC</span>
        </button>
      </div>
    </div>
  );
};
