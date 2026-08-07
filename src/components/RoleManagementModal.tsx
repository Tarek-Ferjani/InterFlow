import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  XCircle, 
  UserCheck, 
  Briefcase, 
  Building2, 
  Lock, 
  Key, 
  RefreshCw,
  Sliders,
  Sparkles,
  Info,
  Shield
} from 'lucide-react';
import { UserSession, UserRole, RolePermission } from '../types';
import { DEFAULT_USERS, ROLE_PERMISSIONS } from '../mockData';

interface RoleManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onSwitchUser: (user: UserSession) => void;
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  isDarkMode: boolean;
}

export const RoleManagementModal: React.FC<RoleManagementModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onUpdateUserRole,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'users' | 'audit'>('matrix');
  const [users, setUsers] = useState<UserSession[]>(DEFAULT_USERS);
  const [auditLogs, setAuditLogs] = useState<{ id: string; timestamp: string; user: string; action: string }[]>([
    { id: 'log-1', timestamp: '06/08/2026 10:14', user: 'Alexandre Kershaw', action: 'Accès Console Admin - Attribution Rôles SI' },
    { id: 'log-2', timestamp: '06/08/2026 09:30', user: 'Marc Valette', action: 'Validation positionnement mission Banque Populaire' },
    { id: 'log-3', timestamp: '06/08/2026 08:45', user: 'Sophie Bernard', action: 'Mise à jour matrice GPEC compétences Azure' },
  ]);

  if (!isOpen) return null;

  const handleRoleSelect = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    onUpdateUserRole(userId, newRole);

    const userObj = users.find(u => u.id === userId);
    if (userObj) {
      setAuditLogs(prev => [
        {
          id: `log-${Date.now()}`,
          timestamp: new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          user: currentUser.prenom + ' ' + currentUser.nom,
          action: `Changement de rôle pour ${userObj.prenom} ${userObj.nom} ➔ Nouveau rôle: ${newRole}`
        },
        ...prev
      ]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className={`w-full max-w-4xl max-h-[90vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Modal Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">Matrice de Sécurité & Droits d'Accès RBAC</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Dataverse & Entra ID
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Isolation par profil unique, contrôle d'accès aux modules et gouvernance des rôles SI
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-200 text-slate-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className={`px-6 pt-3 border-b flex items-center gap-4 text-xs font-semibold ${
          isDarkMode ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white'
        }`}>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'matrix'
                ? 'border-[#0078D4] text-[#0078D4]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Matrice des Habilitations RBAC</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'users'
                ? 'border-[#0078D4] text-[#0078D4]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Changer de Profil de Session ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'audit'
                ? 'border-[#0078D4] text-[#0078D4]'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Journal d'Audit Sécurité</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-3 ${
                isDarkMode ? 'bg-purple-950/30 border-purple-900/60 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
              }`}>
                <Info className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Contrôle d'Accès Stricte par Rôle Unique (Isolation de Profil)</p>
                  <p className="text-[11px] opacity-90 mt-0.5">
                    Un consultant ne peut accéder qu'à ses propres données. Seul le profil <strong>Administrateur SI</strong> dispose de la console de gestion globale pour ajouter des utilisateurs et attribuer les droits.
                  </p>
                </div>
              </div>

              {/* Matrix Table */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-xs text-left">
                  <thead className={`text-[11px] font-bold uppercase ${
                    isDarkMode ? 'bg-slate-800/80 text-slate-300' : 'bg-slate-100 text-slate-700'
                  }`}>
                    <tr>
                      <th className="p-3.5 min-w-[180px]">Module / Habilitation</th>
                      <th className="p-3.5 text-center min-w-[100px]">
                        <span className="flex items-center justify-center gap-1">
                          <UserCheck className="w-3.5 h-3.5 text-blue-500" /> Consultant
                        </span>
                      </th>
                      <th className="p-3.5 text-center min-w-[110px]">
                        <span className="flex items-center justify-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-amber-500" /> Manager
                        </span>
                      </th>
                      <th className="p-3.5 text-center min-w-[100px]">
                        <span className="flex items-center justify-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-emerald-500" /> Direction RH
                        </span>
                      </th>
                      <th className="p-3.5 text-center min-w-[100px]">
                        <span className="flex items-center justify-center gap-1 text-purple-500">
                          <Shield className="w-3.5 h-3.5" /> Admin SI
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {ROLE_PERMISSIONS.map((perm, idx) => (
                      <tr 
                        key={idx}
                        className={`transition-colors ${
                          isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-3.5">
                          <p className="font-bold text-slate-800 dark:text-slate-100">{perm.module}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{perm.description}</p>
                        </td>
                        <td className="p-3.5 text-center">
                          {perm.consultant ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                              <CheckCircle2 className="w-4 h-4" /> Autorisé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                              <Lock className="w-3.5 h-3.5" /> Restreint
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          {perm.manager ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                              <CheckCircle2 className="w-4 h-4" /> Autorisé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                              <Lock className="w-3.5 h-3.5" /> Restreint
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          {perm.rh ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                              <CheckCircle2 className="w-4 h-4" /> Autorisé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                              <Lock className="w-3.5 h-3.5" /> Restreint
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-center">
                          {perm.admin ? (
                            <span className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-semibold text-[11px]">
                              <CheckCircle2 className="w-4 h-4" /> Total (Admin)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-slate-400 text-[11px]">
                              <Lock className="w-3.5 h-3.5" /> N/A
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Basculer de session utilisateur (Démo Multi-Comptes)
                </p>
                <span className="text-xs text-slate-500">
                  Session active : <strong className="text-purple-500">{currentUser.prenom} {currentUser.nom} ({currentUser.role})</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((u) => {
                  const isCurrent = u.id === currentUser.id;
                  return (
                    <div
                      key={u.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                        isCurrent
                          ? isDarkMode
                            ? 'bg-purple-950/40 border-purple-500'
                            : 'bg-purple-50/80 border-purple-500 shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-800/60 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={u.avatar} alt={u.prenom} className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/50" />
                          <div>
                            <p className="font-bold text-xs flex items-center gap-2">
                              {u.prenom} {u.nom}
                              {isCurrent && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-600 text-white">
                                  Session Active
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400">{u.email}</p>
                            <p className="text-[10px] text-purple-400 font-semibold">{u.department}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold text-slate-500 block mb-0.5">Rôle Effectif :</span>
                          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 inline-block">
                            {u.role}
                          </span>
                        </div>

                        {!isCurrent ? (
                          <button
                            onClick={() => {
                              onSwitchUser(u);
                              onClose();
                            }}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Connexion Session</span>
                          </button>
                        ) : (
                          <span className="text-[11px] font-semibold text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Connecté
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Traçabilité des connexions et modifications de droits Dataverse
              </p>

              <div className="space-y-2">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                        <Key className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-semibold">{log.action}</p>
                        <p className="text-[10px] text-slate-400">Utilisateur : {log.user}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex items-center justify-end ${
          isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-50'
        }`}>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
