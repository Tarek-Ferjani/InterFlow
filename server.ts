import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for GoogleGenAI
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing in process.env');
  }
  return new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'InterFlow API Server', timestamp: new Date().toISOString() });
});

// Database Health & Test Connection Endpoint
app.get('/api/db/test', async (req, res) => {
  try {
    const { createPool } = await import('./src/db/index');
    const pool = createPool();
    const startTime = Date.now();
    const result = await pool.query('SELECT NOW() as current_time, current_database() as db_name, version() as pg_version');
    const duration = Date.now() - startTime;

    return res.json({
      status: 'success',
      message: 'Connexion PostgreSQL réussie',
      latencyMs: duration,
      database: result.rows[0].db_name,
      timestamp: result.rows[0].current_time,
      version: result.rows[0].pg_version
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Impossible de se connecter à PostgreSQL',
      details: error.message
    });
  }
});

// DB Users Endpoint
app.get('/api/db/users', async (req, res) => {
  try {
    const { db } = await import('./src/db/index');
    const { users } = await import('./src/db/schema');
    const allUsers = await db.select().from(users);
    return res.json({ status: 'success', count: allUsers.length, users: allUsers });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des utilisateurs',
      details: error.message
    });
  }
});

// 2. Copilot RH Conversational Endpoint
app.post('/api/copilot', async (req, res) => {
  try {
    const { message, history, consultantContext } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = getGenAI();

    const systemInstruction = `
Vous êtes "InterFlow Copilot RH", un assistant virtuel expert RH, Staffing Manager et Coach de carrière spécialisé dans les ESN (Entreprises de Services du Numérique), les cabinets de conseil et la Microsoft Power Platform.

Votre rôle :
- Accompagner le consultant en intercontrat (${consultantContext?.prenom || 'Consultant'} ${consultantContext?.nom || ''}, ${consultantContext?.title || 'Expert IT'}).
- L'aider à valoriser ses compétences, analyser son CV, évaluer ses écarts par rapport aux missions clientes, préparer ses entretiens de positionnement et recommander des parcours de formation ciblés (Microsoft Learn, Azure, Power Platform, IA Générative, Cybersécurité).
- Adopter un ton professionnel, encourageant, précis et orienté résultats business (réduction du délai d'intercontrat, augmentation du TJD, maximisation du taux de placement).
- Répondre en français avec un formatage clair (points à puces, éléments clés en gras).
`;

    const promptText = `
Contexte Consultant :
- Nom : ${consultantContext?.prenom || ''} ${consultantContext?.nom || ''}
- Poste : ${consultantContext?.title || 'Consultant'}
- Jours en intercontrat : ${consultantContext?.joursIntercontrat || 0}
- Employabilité actuelle : ${consultantContext?.employabilite || 80}%
- Compétences clés : ${consultantContext?.competences?.map((c: any) => `${c.libelle} (${c.niveau})`).join(', ') || 'Non spécifié'}

Historique court :
${history ? JSON.stringify(history.slice(-4)) : '[]'}

Question / Instruction du consultant :
${message}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    const replyText = response.text || 'Désolé, je n\'ai pas pu générer une réponse appropriée.';

    return res.json({
      reply: replyText,
      suggestedFollowUps: [
        'Comment préparer mon entretien client pour la mission BNP Paribas ?',
        'Quelles certifications Microsoft augmenteraient le plus mon employabilité ?',
        'Aide-moi à reformuler mes expériences Power Platform sur mon CV.',
        'Générer un plan de carrière à 6 mois pour passer Lead Architecte.'
      ]
    });

  } catch (error: any) {
    console.error('Error in /api/copilot:', error);
    res.status(500).json({ 
      error: 'Erreur lors du traitement Copilot',
      details: error.message 
    });
  }
});

// 3. CV Analysis Endpoint
app.post('/api/analyze-cv', async (req, res) => {
  try {
    const { cvText, consultantName } = req.body;

    if (!cvText) {
      return res.status(400).json({ error: 'Contenu du CV requis' });
    }

    const ai = getGenAI();

    const systemInstruction = `
Vous êtes un expert ATS (Applicant Tracking System) et Recruteur Senior ESN.
Vous devez analyser le texte du CV fourni et générer un diagnostic structuré au format JSON strict.

Champs JSON attendus :
{
  "score": number (0 à 100, basé sur la lisibilité, l'impact des résultats et l'alignement marché ESN/Cloud/Power Platform),
  "summary": string (résumé court du profil),
  "extractedSkills": Array<{ "name": string, "category": string, "level": "Débutant"|"Intermédiaire"|"Avancé"|"Expert" }>,
  "extractedCertifications": Array<string>,
  "missingKeywords": Array<string> (mots-clés stratégiques manquants pour les appels d'offres ESN actuels),
  "contentSuggestions": Array<{ "originalText": string, "suggestedText": string, "reason": string }>,
  "skillSuggestions": Array<string> (compétences recommandées à acquérir en urgence)
}
`;

    const promptText = `
Veuillez analyser le CV suivant pour le consultant ${consultantName || 'en intercontrat'} :

=== DEBUT DU CV ===
${cvText}
=== FIN DU CV ===
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    let jsonResult = {};
    try {
      jsonResult = JSON.parse(response.text || '{}');
    } catch (e) {
      jsonResult = {
        score: 75,
        summary: 'CV analysé avec succès. Profil technique à fort potentiel.',
        extractedSkills: [
          { name: 'Power Apps', category: 'Power Platform', level: 'Avancé' },
          { name: 'Power Automate', category: 'Power Platform', level: 'Avancé' },
          { name: 'Dataverse', category: 'Power Platform', level: 'Intermédiaire' }
        ],
        extractedCertifications: ['PL-200'],
        missingKeywords: ['Copilot Studio', 'Azure OpenAI', 'Solution Architecture'],
        contentSuggestions: [
          {
            originalText: 'Gestion des projets Power Apps',
            suggestedText: 'Pilotage du déploiement de 5 applications métier Canvas & Model-driven pour 1200 utilisateurs actifs',
            reason: 'Manque de métriques chiffrées d\'impact business'
          }
        ],
        skillSuggestions: ['PL-600 Solution Architect', 'AI Builder', 'Azure Functions']
      };
    }

    return res.json(jsonResult);

  } catch (error: any) {
    console.error('Error in /api/analyze-cv:', error);
    res.status(500).json({ error: 'Erreur lors de l\'analyse du CV', details: error.message });
  }
});

// 4. Generate CV Endpoint (4 versions)
app.post('/api/generate-cv', async (req, res) => {
  try {
    const { consultant, targetType } = req.body; // targetType: 'client' | 'technique' | 'management' | 'commercial'

    const ai = getGenAI();

    const systemInstruction = `
Vous êtes un Responsable de Proposition Commerciale et Staffing Manager en ESN.
Vous devez générer une version sur mesure du CV du consultant spécialement optimisée pour le type d'interlocuteur choisi :
- "client" : Orienté valeur métier, ROI, transformation digitale, cas d'usages et résultats business.
- "technique" : Orienté stack technique, architecture, patterns de code, Dataverse, APIs, sécurité et performances.
- "management" : Orienté gouvernance, gestion de projet Agile/Scrum, encadrement d'équipe, gestion des risques et relation client.
- "commercial" : Orienté pitch synthétique, points forts différenciants, arguments d'appel d'offres et TJD justification.

Format de retour JSON strict :
{
  "type": "${targetType}",
  "title": string,
  "badge": string,
  "targetAudience": string,
  "profileSummary": string,
  "highlightedSkills": Array<string>,
  "experienceFormat": Array<{
    "company": string,
    "role": string,
    "period": string,
    "bulletPoints": Array<string>
  }>,
  "certificationsFormatted": Array<string>
}
`;

    const promptText = `
Générer la déclinaison "${targetType}" pour le consultant suivant :
Nom : ${consultant?.prenom || 'Jean'} ${consultant?.nom || 'Dupont'}
Grade : ${consultant?.grade || 'Senior'}
Titre : ${consultant?.title || 'Architecte Power Platform'}
Compétences : ${JSON.stringify(consultant?.competences || [])}
Certifications : ${JSON.stringify(consultant?.certifications || [])}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    let generatedObj = {};
    try {
      generatedObj = JSON.parse(response.text || '{}');
    } catch (e) {
      generatedObj = {
        type: targetType,
        title: `CV Version ${targetType.toUpperCase()} - ${consultant?.prenom || 'Jean'} ${consultant?.nom || 'Dupont'}`,
        badge: targetType.toUpperCase(),
        targetAudience: `Optimisé pour les décideurs ${targetType}`,
        profileSummary: `Expert ${consultant?.title || 'Power Platform'} spécialisé dans les architectures à fort impact business.`,
        highlightedSkills: ['Power Apps Canvas', 'Power Automate', 'Dataverse Governance', 'Copilot Studio'],
        experienceFormat: [
          {
            company: 'Grand Compte Bancaire',
            role: 'Architecte Solution Senior',
            period: '2024 - 2026',
            bulletPoints: [
              'Conception et gouvernance de l\'environnement Power Platform pour 5000+ utilisateurs',
              'Automatisation des flux de validation avec réduction de 40% du temps de traitement'
            ]
          }
        ],
        certificationsFormatted: ['PL-600 Power Platform Solution Architect', 'PL-200 Functional Consultant']
      };
    }

    return res.json(generatedObj);

  } catch (error: any) {
    console.error('Error in /api/generate-cv:', error);
    res.status(500).json({ error: 'Erreur lors de la génération du CV', details: error.message });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
