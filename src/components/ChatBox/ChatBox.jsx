
// src/components/ChatBox/ChatBox.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../../store/chat.store';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { ArtifactService } from '../../services/artifact.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faWandMagicSparkles, faComments } from '@fortawesome/free-solid-svg-icons';
import './ChatBox.css';

// Create audio context for notification sound
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const createNotificationSound = () => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
};

const artifactTypes = [
  'stakeholders', 'empathy_maps', 'user_stories',
  'usecases', 'process_models', 'data_models',
  'code', 'system'
];

export const ChatBox = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentArtifactIndex, setCurrentArtifactIndex] = useState(0);
  const chatContentRef = useRef(null);
  
  const { 
    messages, 
    currentQuestion,
    isQuestionnaireDone,
    artifactMode,
    lastGeneratedArtifact,
    addMessage,
    setCurrentQuestion,
    setQuestionnaireDone,
    setArtifactMode,
    setLastGeneratedArtifact
  } = useChatStore();

  // Initialize with first question
  useEffect(() => {
    if (!currentQuestion && messages.length === 0) {
      const loadFirstQuestion = async () => {
        setIsLoading(true);
        const firstQuestion = QuestionnaireService.getNextQuestion(null, null);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCurrentQuestion(firstQuestion);
        addMessage({ text: firstQuestion, type: 'ai', loading: false });
        setIsLoading(false);
        createNotificationSound();
      };
      loadFirstQuestion();
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContentRef.current) {
      const smoothScroll = () => {
        chatContentRef.current.scrollTo({
          top: chatContentRef.current.scrollHeight,
          behavior: 'smooth'
        });
      };
      smoothScroll();
      setTimeout(smoothScroll, 100);
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (isLoading) return;

    let messageText = input;
    
    // If in artifact mode and no input (means using suggested artifact)
    if (artifactMode === 'generate' && !input) {
      messageText = `generate ${artifactTypes[currentArtifactIndex]}`;
    }
    
    if (!messageText.trim()) return;

    // Add user message
    addMessage({ text: messageText, type: 'user' });
    setInput('');
    
    setIsLoading(true);
    
    if (artifactMode === 'generate') {
      // Handle artifact generation
      await new Promise(resolve => setTimeout(resolve, 1500));
      addMessage({
        text: `Here's the generated ${artifactTypes[currentArtifactIndex]} artifact...`,
        type: 'ai'
      });
      setLastGeneratedArtifact(artifactTypes[currentArtifactIndex]);
      
      // Move to next artifact type
      if (currentArtifactIndex < artifactTypes.length - 1) {
        setCurrentArtifactIndex(currentArtifactIndex + 1);
      }
    } else if (artifactMode === 'improve') {
      // Handle improvement feedback
      await new Promise(resolve => setTimeout(resolve, 1500));
      addMessage({
        text: `Thank you for your feedback. I'll improve the ${lastGeneratedArtifact} artifact...`,
        type: 'ai'
      });
    } else {
      // Normal questionnaire flow
      await QuestionnaireService.saveAnswer(currentQuestion, messageText);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const nextQuestion = QuestionnaireService.getNextQuestion(null, currentQuestion);

      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        addMessage({ text: nextQuestion, type: 'ai', loading: false });
      } else {
        setQuestionnaireDone(true);
        addMessage({ 
          text: "Great! You've completed all questions. You can now generate artifacts using the magic wand button.",
          type: 'ai',
          loading: false
        });
      }
    }
    
    setIsLoading(false);
    createNotificationSound();
  };

  const getInputPlaceholder = () => {
    if (isLoading) return "Thinking...";
    if (artifactMode === 'generate') {
      return `Generate ${artifactTypes[currentArtifactIndex]} (press Enter)`;
    }
    if (artifactMode === 'improve') {
      return `How should I improve the ${lastGeneratedArtifact}?`;
    }
    return "Type your answer...";
  };

  return (
    <div className="chat-container">
      <div className="chat-content" ref={chatContentRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`${msg.type}-message glass`}>
            {msg.loading ? (
              <span className="loading-dot">•••</span>
            ) : (
              msg.text
            )}
          </div>
        ))}
        {isLoading && (
          <div className="ai-message glass">
            <span className="loading-dot">•••</span>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={artifactMode === 'generate' ? '' : input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={getInputPlaceholder()}
          disabled={isLoading || (artifactMode === 'generate')}
          className={artifactMode === 'generate' ? 'readonly' : ''}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
        {isQuestionnaireDone && (
          <>
            <button 
              className={`mode-button ${artifactMode === 'generate' ? 'active' : ''}`}
              onClick={() => {
                setArtifactMode(artifactMode === 'generate' ? null : 'generate');
                setCurrentArtifactIndex(0);
              }}
            >
              <FontAwesomeIcon icon={faWandMagicSparkles} />
            </button>
            <button 
              className={`mode-button ${artifactMode === 'improve' ? 'active' : ''}`}
              onClick={() => setArtifactMode(artifactMode === 'improve' ? null : 'improve')}
            >
              <FontAwesomeIcon icon={faComments} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};