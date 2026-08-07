import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  Brain, 
  FileSearch, 
  Target, 
  BookOpen, 
  Briefcase, 
  Award,
  ChevronRight,
  MessageSquareText
} from 'lucide-react';
import { Consultant } from '../types';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface CopilotRHProps {
  consultant: Consultant;
  isDarkMode: boolean;
}

export const CopilotRH: React.FC<CopilotRHProps> = ({
  consultant,
  isDarkMode,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: `Bonjour ${consultant.prenom} ! Je suis votre **Copilot RH & Staffing InterFlow**.\n\nJe suis connecté à votre profil Dataverse (${consultant.grade} · ${consultant.joursIntercontrat} jours en intercontrat · Employabilité ${consultant.employabilite}%).\n\nComment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const promptSuggestions = [
    {
      icon: Target,
      title: "Préparer un entretien client",
      prompt: `Aide-moi à préparer mon entretien de positionnement client pour la mission BNP Paribas (Lead Architecte Power Platform). Donnes-moi 5 questions techniques et comportementales clés avec des réponses structurées.`
    },
    {
      icon: FileSearch,
      title: "Analyser mes écarts de compétences",
      prompt: `Analyse mes compétences actuelles et dis-moi quels sont mes plus grands écarts pour viser des missions TJD 700€+ en IA Générative et Cloud Azure.`
    },
    {
      icon: Briefcase,
      title: "Générer un plan de carrière à 6 mois",
      prompt: `Rédige un plan de développement de carrière sur 6 mois pour passer du grade Senior à Lead Architecte Power Platform & AI.`
    },
    {
      icon: BookOpen,
      title: "Recommander les certifications prioritaires",
      prompt: `Quelles sont les 2 prochaines certifications Microsoft (PL-600, AI-102, SC-100) à passer en priorité pendant mes prochains jours d'intercontrat ?`
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map(m => ({ role: m.sender, content: m.text })),
          consultantContext: consultant
        })
      });

      const data = await response.json();
      const replyText = data.reply || 'Je suis désolé, une erreur est survenue lors du traitement de votre demande.';

      const assistantMsg: Message = {
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Error calling Copilot API:', error);
      const errorMsg: Message = {
        sender: 'assistant',
        text: 'Une erreur technique s\'est produite. Veuillez réessayer.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
              <Bot className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Module 6 · Copilot RH & Career Coach IA
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Assistant Conversationnel RH InterFlow
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Conseil en carrière, préparation aux entretiens clients, plans de développement et recommandations de formation.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
          <span>Propulsé par Google Gemini & Dataverse</span>
        </div>
      </div>

      {/* Main Chat Layout: Left Prompts / Right Chat Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Quick Prompts & Context (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Prompts Prédéfinis Copilot
            </h3>

            <div className="space-y-2">
              {promptSuggestions.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all group ${
                      isDarkMode ? 'bg-slate-800/40 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {item.prompt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context Card */}
          <div className={`p-5 rounded-3xl border ${
            isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Contexte Consultant Injecté
            </h3>
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>Nom :</strong> {consultant.prenom} {consultant.nom}</p>
              <p><strong>Poste :</strong> {consultant.title}</p>
              <p><strong>Jours intercontrat :</strong> {consultant.joursIntercontrat} jours</p>
              <p><strong>Employabilité :</strong> {consultant.employabilite}%</p>
              <p><strong>Certifications :</strong> {consultant.certifications.length} actives</p>
            </div>
          </div>
        </div>

        {/* Right Column: Chat Window (8 cols) */}
        <div className={`lg:col-span-8 rounded-3xl border flex flex-col h-[620px] shadow-lg ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Chat Messages List */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg, index) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex gap-3 max-w-2xl ${isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAssistant 
                      ? 'bg-gradient-to-tr from-amber-500 to-indigo-600 text-white shadow-md'
                      : 'bg-blue-600 text-white'
                  }`}>
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div className={`p-4 rounded-2xl text-xs leading-relaxed space-y-2 ${
                    isAssistant
                      ? isDarkMode ? 'bg-slate-800/80 text-slate-200 border border-slate-700/60' : 'bg-slate-100 text-slate-800'
                      : 'bg-blue-600 text-white font-medium'
                  }`}>
                    <div className="whitespace-pre-wrap">
                      {msg.text}
                    </div>
                    <span className={`text-[9px] block text-right font-mono opacity-70 ${isAssistant ? 'text-slate-400' : 'text-blue-200'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 mr-auto max-w-md">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 text-white flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                  <span className="text-slate-500">Copilot RH analyse votre profil...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-3xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Posez une question à Copilot RH (ex: Prépa entretien client, conseils formations...)"
                className={`flex-1 p-3 text-xs rounded-2xl border focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-200 focus:border-amber-500' 
                    : 'bg-white border-slate-200 text-slate-800 focus:border-amber-600'
                }`}
              />

              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Envoyer</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
