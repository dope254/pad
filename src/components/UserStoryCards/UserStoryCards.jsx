import React, { useState, useEffect } from 'react';
import './UserStoryCards.css';
import { userStoryData } from '../../data/userStoryData';

export const setLocalStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  
  // Dispatch a custom event to notify other parts of the app
  const event = new Event('localStorageUpdate');
  window.dispatchEvent(event);
};

export const UserStoryCards = () => {
  const [stories, setStories] = useState([]);

  const handleSelect = (story) => {
    setLocalStorageItem('activeStory', story); // Use the custom function
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
          {/* <div className="card-header">
            <span className="stakeholder-name">{story.stakeholder}</span>
          </div> */}
          <div className="card-content">
            <p className="user-story">{story.needs[0].role} {story.needs[0].goal}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
