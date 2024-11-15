// src/store/chat.store.js
import { create } from 'zustand';

export const useChatStore = create((set) => ({
  messages: [],
  currentQuestion: null,
  isQuestionnaireDone: false,
  artifactMode: null, // null | 'generate' | 'improve'
  lastGeneratedArtifact: null,
  
  addMessage: (message) => 
    set((state) => ({ 
      messages: [...state.messages, message] 
    })),
    
  setCurrentQuestion: (question) =>
    set({ currentQuestion: question }),
    
  setQuestionnaireDone: () =>
    set({ isQuestionnaireDone: true }),
    
  setArtifactMode: (mode) =>
    set({ artifactMode: mode }),
    
  setLastGeneratedArtifact: (artifact) =>
    set({ lastGeneratedArtifact: artifact })
}));
