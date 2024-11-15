// src/services/questionnaire.service.js
export const QuestionnaireService = {
    // Simulated questions flow based on the questionnaire structure
    getNextQuestion: (currentSection, currentQuestion) => {
      // For demo, returning hardcoded questions
      const questions = [
        "What specific problem are you trying to solve?",
        "Who are your target users?",
        "What are the core features needed?"
        // Add more questions based on questionnaire structure
      ];
      
      const currentIndex = questions.indexOf(currentQuestion);
      return currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;
    },
  
    // Store answers (would normally integrate with backend)
    saveAnswer: (question, answer) => {
      console.log('Saving answer:', { question, answer });
      return Promise.resolve({ success: true });
    }
  };
  