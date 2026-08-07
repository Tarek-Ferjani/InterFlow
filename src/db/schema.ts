import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users / Accounts
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').unique(),
  email: text('email').notNull().unique(),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  role: text('role').notNull().default('Consultant'), // Consultant, Manager, RH, Admin
  title: text('title'),
  department: text('department'),
  avatar: text('avatar'),
  status: text('status').default('Actif'),
  lastLogin: text('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Consultants Profiles & Competences
export const consultants = pgTable('consultants', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  role: text('role').notNull(),
  seniority: text('seniority').notNull(),
  tjm: integer('tjm').notNull(),
  tjmMin: integer('tjm_min'),
  disponibilite: text('disponibilite').notNull(),
  mobilité: text('mobilite').default('National'),
  statut: text('statut').notNull().default('Intercontrat'), // Intercontrat, En Mission, Formations Focus
  atsScore: integer('ats_score').notNull().default(85),
  location: text('location').default('Paris & Île-de-France'),
  experienceYears: integer('experience_years').default(5),
  description: text('description'),
  avatar: text('avatar'),
  competences: text('competences').notNull(), // JSON string or array of skills
  certifications: text('certifications'), // JSON string
  langues: text('langues'), // JSON string
  recommandationsIA: text('recommandations_ia'), // JSON string
  historyIntercontrat: text('history_intercontrat'), // JSON string
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Missions / Client Opportunities
export const missions = pgTable('missions', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  client: text('client').notNull(),
  secteur: text('secteur').notNull(),
  location: text('location').notNull(),
  tjm: integer('tjm').notNull(),
  duree: text('duree').notNull(),
  startDate: text('start_date').notNull(),
  tjmCible: text('tjm_cible'),
  statut: text('statut').notNull().default('Ouverte'),
  competencesRequises: text('competences_requises').notNull(), // JSON string
  description: text('description').notNull(),
  remote: text('remote').default('Hybride'),
  urgent: boolean('urgent').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Formations & Learning Courses
export const formations = pgTable('formations', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  provider: text('provider').notNull(),
  duration: text('duration').notNull(),
  level: text('level').notNull(),
  badge: text('badge').notNull(),
  category: text('category').notNull(),
  skillsTargeted: text('skills_targeted').notNull(), // JSON string
  url: text('url').notNull(),
  popularity: integer('popularity').default(95),
  impactEmployabilite: text('impact_employabilite').default('+25%'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  consultantProfile: one(consultants, {
    fields: [users.id],
    references: [consultants.userId],
  }),
}));

export const consultantsRelations = relations(consultants, ({ one }) => ({
  user: one(users, {
    fields: [consultants.userId],
    references: [users.id],
  }),
}));
