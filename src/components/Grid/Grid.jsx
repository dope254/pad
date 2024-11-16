import React, { useEffect, useRef, useState } from 'react';
import { append as svgAppend, attr as svgAttr, create as svgCreate } from 'tiny-svg';
import { UserStoryCards } from '../UserStoryCards/UserStoryCards';
import { ActiveStoryContent } from '../ActiveContent/ActiveContent';
import './Grid.css';

export const Grid = () => {
  const canvasRef = useRef(null);
  // Load the active story from localStorage or use a default value
  const [activeStory, setActiveStory] = useState(() => {
    const storedStory = localStorage.getItem('activeStory');
    return storedStory ? JSON.parse(storedStory) : null;
  });

  // Define the handleSelect function to update the active story and store it in localStorage
  const handleSelect = (story) => {
    setActiveStory(story);
    localStorage.setItem('activeStory', JSON.stringify(story));
  };

  // Initialize grid
  useEffect(() => {
    if (!canvasRef.current) return;

    try {
      const svg = canvasRef.current;
      const defs = svgCreate('defs');
      svgAppend(svg, defs);

      const pattern = svgCreate('pattern');
      const patternId = `grid-pattern-${Math.random().toString(36).substr(2, 9)}`;

      svgAttr(pattern, {
        id: patternId,
        width: 20,
        height: 20,
        patternUnits: 'userSpaceOnUse'
      });

      const circle = svgCreate('circle');
      svgAttr(circle, {
        cx: 0.5,
        cy: 0.5,
        r: 0.5,
        fill: '#c3c3c3'
      });

      svgAppend(pattern, circle);
      svgAppend(defs, pattern);

      const grid = svgCreate('rect');
      svgAttr(grid, {
        width: '100%',
        height: '100%',
        fill: `url(#${patternId})`
      });

      svgAppend(svg, grid);
    } catch (err) {
      console.error('Error initializing grid:', err);
    }
  }, []);

  return (
    <div className="grid-container">
      <svg
        ref={canvasRef}
        className="design-pad__grid"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1, // Ensure it's in the background
        }}
      />

      <div className="content-layout">
        {/* Active Content Area */}
        <div className="main-content">

          {/* Pass activeStory to ActiveStoryContent */}
          <ActiveStoryContent activeStory={activeStory} />
        </div>
      </div>

      <footer className="io-about">
        <ul className="io-control-list io-horizontal">
          <li><a href="/" target="_blank" rel="noopener noreferrer">Privacy</a></li>
          <li><a href="/" target="_blank" rel="noopener noreferrer">Terms</a></li>
          <li><a href="/" target="_blank" rel="noopener noreferrer">Imprint</a></li>
          <li><a href="/">Cookie Preferences</a></li>
          <li><a href="/" data-track="help:open-about">About</a></li>
          <li><a href="/" target="_blank" rel="noopener noreferrer" data-track="help:open-report">Give Feedback</a></li>
        </ul>
      </footer>
    </div>
  );
};
