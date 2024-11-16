
// src/components/DesignPad/UserStoryCards.jsx
import React, { useState, useEffect } from 'react';
import './UserStoryCards.css';
import { userStoryData } from '../../data/userStoryData';

export const UserStoryCards = ({ onStorySelect }) => {
  const [stories, setStories] = useState([]);
  // Load the active story from localStorage or use a default value
  const [activeStory, setActiveStory] = useState(() => {
    const storedStory = localStorage.getItem('activeStory');
    return storedStory ? JSON.parse(storedStory) : null;
  });

  const handleSelect = (story) => {
    setActiveStory(story);
    localStorage.setItem('activeStory', JSON.stringify(story));
  };


  useEffect(() => {
    // Transform the data for display
    const parsedStories = Object.entries(userStoryData.user_story).map(([stakeholder, value]) => ({
      stakeholder,
      needs: value.needs,
      bdd: value.bdd_gherkin.map(
        (scenario) => `Given ${scenario.given}, When ${scenario.when}, Then ${scenario.then}.`
      ),
    }));
    setStories(parsedStories);
  }, []);

  return (
    <div className="user-stories">
      {stories.map((story, index) => (
        <div
          key={index}
          className="user-story-card"
          onClick={() => handleSelect(story)}
        >
          <div className="card-header">
            {/* <i className="fas fa-user-circle stakeholder-icon" />
            <span className="stakeholder-name">{story.stakeholder}</span>
            <span className="info-icon" title={story.info}>❗</span>
            <span className="value-icon" title={story.value}>💡</span> */}
          </div>
          <div className="card-content">
            <p className="user-story">{story.needs[0].role} {story.needs[0].goal}</p>
          </div>
        </div>
      ))}
    </div>
  );
};


