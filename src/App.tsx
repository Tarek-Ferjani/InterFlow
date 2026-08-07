import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ActiveTab } from './components/Sidebar';
import { DashboardConsultant } from './components/DashboardConsultant';
import { GestionCV } from './components/GestionCV';
import { GenerationCV } from './components/GenerationCV';
import { RecommandationFormations } from './components/RecommandationFormations';
import { MatchingMissions } from './components/MatchingMissions';
import { CopilotRH } from './components/CopilotRH';
import { DashboardManager } from './components/DashboardManager';
import { DashboardRH } from './components/DashboardRH';
import { GestionUsersAdmin } from './components/GestionUsersAdmin';
import { Login } from './components/Login';
import { RoleManagementModal } from './components/RoleManagementModal';
import { AccessRestricted } from './components/AccessRestricted';

import { INITIAL_CONSULTANTS, INITIAL_MISSIONS, INITIAL_FORMATIONS, DEFAULT_USERS } from './mockData';
import { Consultant, Mission, Formation, UserSession, UserRole } from './types';

export default function App() {
  const [users, setUsers] = useState<UserSession[]>(() => {
    try {
      const saved = localStorage.getItem('interflow_users_db');
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem('interflow_session');
      return saved ? JSON.parse(saved) : DEFAULT_USERS[0];
    } catch {
      return DEFAULT_USERS[0];
    }
  });

  const [currentRole, setCurrentRole] = useState<UserRole>(
    currentUser?.role || 'Consultant'
  );

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (currentUser?.role === 'Admin') return 'admin-console';
    if (currentUser?.role === 'Manager') return 'dashboard-manager';
    if (currentUser?.role === 'RH') return 'dashboard-rh';
    return 'dashboard-consultant';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);

  const [consultants, setConsultants] = useState<Consultant[]>(INITIAL_CONSULTANTS);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant>(INITIAL_CONSULTANTS[0]);
  const [missions, setMissions] = useState<Mission[]>(INITIAL_MISSIONS);
  const [formations, setFormations] = useState<Formation[]>(INITIAL_FORMATIONS);

  useEffect(() => {
    // Fetch users list from backend API on load
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && Array.isArray(data.users) && data.users.length > 0) {
          setUsers(data.users);
        }
      })
      .catch(() => {
        // Fallback to localStorage or DEFAULT_USERS if API is temporarily unavailable
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('interflow_session', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('interflow_session');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('interflow_users_db', JSON.stringify(users));
  }, [users]);

  const handleLogin = (user: UserSession) => {
    setCurrentUser(user);
    setCurrentRole(user.role);

    // If consultant user, map to consultant profile if exists
    if (user.consultantId) {
      const found = consultants.find(c => c.id === user.consultantId);
      if (found) setSelectedConsultant(found);
    }

    if (user.role === 'Admin') {
      setActiveTab('admin-console');
    } else if (user.role === 'Manager') {
      setActiveTab('dashboard-manager');
    } else if (user.role === 'RH') {
      setActiveTab('dashboard-rh');
    } else {
      setActiveTab('dashboard-consultant');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddUser = async (newUser: UserSession) => {
    setUsers(prev => [newUser, ...prev]);
    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
    } catch (err) {
      console.warn('Backend create user endpoint warning:', err);
    }
  };

  const handleUpdateUser = async (updatedUser: UserSession) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
      setCurrentRole(updatedUser.role);
    }
    try {
      await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
    } catch (err) {
      console.warn('Backend update user endpoint warning:', err);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    try {
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Backend delete user endpoint warning:', err);
    }
  };

  const handleUpdateConsultantCV = (score: number, _updatedKeywords: string[]) => {
    const updated = { ...selectedConsultant, cvScore: score };
    setSelectedConsultant(updated);
    setConsultants(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  const handleStartCourse = (courseId: string) => {
    setFormations(prev => prev.map(f => {
      if (f.id === courseId) {
        return { ...f, status: 'En_cours', progressPercentage: f.progressPercentage || 10 };
      }
      return f;
    }));
  };

  const handleAddMission = (newMission: Mission) => {
    setMissions(prev => [newMission, ...prev]);
  };

  const handleAddFormation = (newFormation: Formation) => {
    setFormations(prev => [newFormation, ...prev]);
  };

  // If user is not logged in, render Login component
  if (!currentUser) {
    return <Login onLogin={handleLogin} isDarkMode={isDarkMode} usersList={users} />;
  }

  // Check RBAC view permissions strictly according to single-view scope rules
  const isAdminViewAllowed = currentRole === 'Admin';
  const isManagerViewAllowed = currentRole === 'Manager' || currentRole === 'Admin';
  const isRHViewAllowed = currentRole === 'RH' || currentRole === 'Admin';
  const isConsultantViewAllowed = currentRole === 'Consultant' || currentRole === 'Admin';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-[#18181b] text-slate-100' : 'bg-[#F3F2F1] text-[#323130]'
    }`}>
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        selectedConsultant={selectedConsultant}
        consultants={consultants}
        onConsultantChange={setSelectedConsultant}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onNavigateTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isDarkMode={isDarkMode}
          currentRole={currentRole}
        />

        {/* Dynamic Content View Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'admin-console' && (
              isAdminViewAllowed ? (
                <GestionUsersAdmin
                  users={users}
                  onAddUser={handleAddUser}
                  onUpdateUser={handleUpdateUser}
                  onDeleteUser={handleDeleteUser}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <AccessRestricted
                  requiredRole="Admin"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}

            {activeTab === 'dashboard-consultant' && (
              isConsultantViewAllowed ? (
                <DashboardConsultant
                  consultant={selectedConsultant}
                  missions={missions}
                  formations={formations}
                  isDarkMode={isDarkMode}
                  onNavigateTab={setActiveTab}
                />
              ) : (
                <AccessRestricted
                  requiredRole="Manager"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}

            {activeTab === 'gestion-cv' && (
              isConsultantViewAllowed ? (
                <GestionCV
                  consultant={selectedConsultant}
                  isDarkMode={isDarkMode}
                  onUpdateConsultantCV={handleUpdateConsultantCV}
                />
              ) : (
                <AccessRestricted
                  requiredRole="Manager"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}

            {activeTab === 'generation-cv' && (
              isConsultantViewAllowed ? (
                <GenerationCV
                  consultant={selectedConsultant}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <AccessRestricted
                  requiredRole="Manager"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}

            {activeTab === 'formations' && (
              <RecommandationFormations
                consultant={selectedConsultant}
                formations={formations}
                isDarkMode={isDarkMode}
                onStartCourse={handleStartCourse}
                onAddFormation={handleAddFormation}
              />
            )}

            {activeTab === 'matching-missions' && (
              <MatchingMissions
                consultant={selectedConsultant}
                missions={missions}
                isDarkMode={isDarkMode}
                onAddMission={handleAddMission}
              />
            )}

            {activeTab === 'copilot-rh' && (
              <CopilotRH
                consultant={selectedConsultant}
                isDarkMode={isDarkMode}
              />
            )}

            {activeTab === 'dashboard-manager' && (
              isManagerViewAllowed ? (
                <DashboardManager
                  consultants={consultants}
                  missions={missions}
                  formations={formations}
                  isDarkMode={isDarkMode}
                  onSelectConsultant={setSelectedConsultant}
                  onNavigateTab={setActiveTab}
                  onAddMission={handleAddMission}
                  onAddFormation={handleAddFormation}
                />
              ) : (
                <AccessRestricted
                  requiredRole="Manager"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}

            {activeTab === 'dashboard-rh' && (
              isRHViewAllowed ? (
                <DashboardRH
                  consultants={consultants}
                  formations={formations}
                  missions={missions}
                  onAddMission={handleAddMission}
                  onAddFormation={handleAddFormation}
                  isDarkMode={isDarkMode}
                />
              ) : (
                <AccessRestricted
                  requiredRole="RH"
                  currentRole={currentRole}
                  onOpenRoleModal={() => setIsRoleModalOpen(true)}
                  isDarkMode={isDarkMode}
                />
              )
            )}
          </div>
        </main>
      </div>

      {/* Role Management Modal */}
      <RoleManagementModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        currentUser={currentUser}
        onSwitchUser={handleLogin}
        onUpdateUserRole={(userId, newRole) => {
          const u = users.find(x => x.id === userId);
          if (u) {
            handleUpdateUser({ ...u, role: newRole });
          }
        }}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
