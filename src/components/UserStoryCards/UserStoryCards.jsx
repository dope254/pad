
// src/components/DesignPad/UserStoryCards.jsx
import React from 'react';
import './UserStoryCards.css';

export const UserStoryCards = () => {
  const stories = [
    {
      stakeholder: 'Product Owner',
      story: 'As a product owner, I want to track project progress',
      info: 'Key stakeholder for project success',
      value: 'Better project visibility'
    }
    // Add more stories as needed
  ];

  return (
    <div className="user-stories">
      {stories.map((story, index) => (
        <div key={index} className="user-story-card">
          <div className="card-header">
            <i className="fas fa-user-circle stakeholder-icon" />
            <span className="stakeholder-name">{story.stakeholder}</span>
            <span className="info-icon" title={story.info}>❗</span>
            <span className="value-icon" title={story.value}>💡</span>
          </div>
          <div className="card-content">
            <p className="user-story">{story.story}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
