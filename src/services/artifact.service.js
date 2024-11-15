
  // src/services/artifact.service.js
  export const ArtifactService = {
    generateArtifact: (type) => {
      // Simulated artifact generation
      const artifacts = {
        stakeholders: [
          { id: "stakeholder_1", name: "Hospital Administrator", role: "Primary Decision Maker" }
        ],
        empathy_map: {
          what_they_see: "Overwhelmed staff, long patient queues"
        }
        // Add other artifact types
      };
      
      return Promise.resolve(artifacts[type] || {});
    },
  
    improveArtifact: (type, currentArtifact) => {
      // Simulated improvement suggestions
      return Promise.resolve({
        suggestions: [`Improvement suggestion for ${type}`]
      });
    },
  
    explainArtifact: (type, currentArtifact) => {
      // Simulated explanation
      return Promise.resolve({
        explanation: `Explanation for ${type}`
      });
    }
  };
  