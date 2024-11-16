import React from 'react';

export const ActiveStoryContent = ({ activeStory }) => {
  if (!activeStory) {
    return <div>No story selected.</div>;
  }

  return (
    <div className="active-story-content">
      <h2>{activeStory.stakeholder}</h2>
      <div>
        <h3>Needs</h3>
        <ul>
          {activeStory.needs.map((need, index) => (
            <li key={index}>
              <strong>{need.role}</strong>: {need.goal} ({need.benefit})
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>BDD Scenarios</h3>
        <ul>
          {activeStory.bdd.map((scenario, index) => (
            <li key={index}>{scenario}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
