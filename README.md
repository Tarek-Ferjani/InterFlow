# 🚀 InterFlow — Plateforme Intelligente de Gestion d'Intercontrat & Staffing IA

**InterFlow** est une solution SaaS full-stack conçue pour les **ESN (Entreprises de Services du Numérique)** et cabinets de conseil. Elle transforme chaque période d'intercontrat en une opportunité à forte valeur ajoutée en combinant la puissance de l'**Intelligence Artificielle (Gemini API)**, le **Matching Prédictif**, la **Gestion des Compétences**, et la **Gouvernance SI**.

---

## 💡 Valeur Ajoutée & Cas d'Usage

En ESN, la période d'intercontrat représente un enjeu financier et humain majeur. **InterFlow** permet de :
1. **Réduire le Taux d'Intercontrat** grâce à un moteur de **matching IA** instantané entre le profil du consultant et les besoins clients/missions ouvertes.
2. **Valoriser les Compétences** via un **générateur de CV certifié**, le suivi des badges **Microsoft Learn** et des parcours de formation sur-mesure.
3. **Assister la Direction RH & Sales** grâce au **Copilot RH IA** pour la rédaction d'appels d'offres, la préparation aux entretiens et l'optimisation des TJM.
4. **Simplifier l'Administration** grâce à un portail unique de gestion des accès (Admin, RH, Manager, Consultant), des intégrations SSO/Active Directory et PostgreSQL / Cloud SQL.

---

## ✨ Fonctionnalités Clés

### 👥 1. Authentification & Portails Métiers
- **Connexion Épurée & Sécurisée** : Portail d'authentification centralisé avec gestion fine des rôles (RBAC).
- **Administration Globale (GestionUsersAdmin)** :
  - Création et gestion complète des utilisateurs (Consultants, Managers, RH, Admin).
  - Attribution dynamique des rôles et autorisations.
  - Configuration de la base de données relationnelle **PostgreSQL / Cloud SQL** avec ORM Drizzle.
  - Intégration **Active Directory / Azure AD SSO**.

### 💼 2. Gestion des Consultants & Profils
- Fiches consultants enrichies : TJM, disponibilité, stack technique, score ATS.
- Suivi de la mobilité, habilitations et historique des missions.
- Éditeur et exportateur de CV professionnels.

### 🎯 3. Matching & Gestion des Missions
- Recommandation intelligente de missions basée sur la proximité des compétences (IA).
- Analyse de rentabilité (Marge ESN, TJM, Durée).
- Suivi des réponses aux appels d'offres et positionnements clients.

### 🤖 4. Copilot RH & Assistant IA Gemini
- Assistant conversationnel dédié aux RH et Business Managers.
- Génération automatique de pitches commerciaux, réponses aux AO et plans de formation personnalisés.

### 📚 5. Formations & Certification Microsoft Learn
- Catalogue de formations ciblées pour monter en compétences pendant l'intercontrat.
- Validation des certifications et badges techniques.

---

## 🛠️ Architecture Technique

- **Frontend** : React 18, TypeScript, Tailwind CSS, Lucide Icons, Motion.
- **Backend API** : Node.js, Express, Vite Middleware.
- **Intelligence Artificielle** : API Google Gemini 2.5/3.6 (moteur d'analyse & Copilot RH).
- **Base de Données Relationnelle** : PostgreSQL / Cloud SQL avec **Drizzle ORM** (schéma type-safe).
- **Conteneurisation** : Docker & Docker Compose pour un déploiement 1-click sur VM Linux.

---

## 🔄 Chaîne DevOps & Pipeline CI/CD

La chaîne DevOps d'InterFlow est structurée pour garantir un cycle de livraison continu, sécurisé et hautement disponible :

```
 [ Code Source ] ──> [ Git / GitHub ] ──> [ Pipeline CI (Lint, TypeCheck, Build) ]
                                                    │
                                                    ▼
 [ Prod VM / Cloud Run ] <── [ Docker Registry ] <── [ Image Multi-Stage Docker Build ]
```

### 1. Contrôle de Version & Stratégie Git
- **Branching Model** : Stratégie Feature-Branch avec branche principale `main` (Production) et `staging` (Recette).
- **Triggers CI** : Chaque Commit ou Pull Request déclenche automatiquement la validation du code.

### 2. Intégration Continue (CI)
- **Validation Statique & Linting** :
  - Vérification du typage strict TypeScript (`tsc --noEmit`).
  - Validation ES-Lint des règles de sécurité et de synthaxe.
- **Build Multi-Stage & Bundling** :
  - Compilation de l'application SPA Vite (`dist/`).
  - Bundling du serveur backend Express avec `esbuild` vers un conteneur CommonJS autonome (`dist/server.cjs`).
- **Build de Conteneur Docker** : Validation de l'image `node:20-alpine` avec test d'isolation des dépendances de production (`npm ci --only=production`).

### 3. Déploiement Continu (CD)
- **Environnement VM (Docker Compose)** :
  - Déploiement automatisé multi-conteneurs (`app` + `postgres`).
  - Stratégie de *Zero-Downtime* avec relance automatique des conteneurs (`restart: always`).
  - Healthcheck automatique de la BDD (`pg_isready`) avant le lancement du backend.
- **Environnement Serverless / Cloud Run** (Optionnel) :
  - Déploiement de l'image conteneurisée sur Cloud Run avec montée à l'échelle automatique (Scale-to-Zero).

### 4. SecOps & Gestion des Secrets
- **Injection des Secrets** : Clés API (`GEMINI_API_KEY`) et identifiants BDD transmis via variables d'environnement sécurisées (Secret Manager / `.env.example`).
- **Isolation des Réseaux** : Moteur de reverse proxy et conteneurs isolés sur le réseau Docker interne.

### 5. Observabilité & Healthcheck
- **Endpoints de Monitoring** :
  - `/api/health` : Vérification de la disponibilité du serveur Node.js.
  - `/api/db/test` : Test en temps réel de la latence, du pool de connexions et de la version PostgreSQL.
- **Journalisation** : Centralisation des logs applicatifs via `docker logs` et suivi de l'état du pool de connexion Drizzle.

---

## 🐳 Déploiement sur Machine Virtuelle (Docker & Docker Compose)

L'application est livrée prête à être déployée sur n'importe quelle VM (Ubuntu/Debian) avec Docker :

### 1. Structure Multi-Conteneur
Le fichier `docker-compose.yml` orchestre deux conteneurs :
- **`interflow_db`** : Base de données PostgreSQL 16 Alpine persistante.
- **`interflow_app`** : Application web full-stack Node.js/Express/React (port `3000`).

### 2. Commande de Lancement
```bash
docker-compose up -d --build
```

### 3. Accès
- **Application Web** : `http://<IP_DE_VOTRE_VM>:3000`
- **Port PostgreSQL** : `5432`

---

© 2026 **InterFlow** — Solution d'Optimisation du Staffing & de l'Intercontrat pour ESN.
