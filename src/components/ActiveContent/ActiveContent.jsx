import React, { useState, useEffect } from 'react';

export const ActiveStoryContent = () => {
  const [activeStory, setActiveStory] = useState(() => {
    const storedStory = localStorage.getItem('activeStory');
    return storedStory ? JSON.parse(storedStory) : null;
  });

  const maxLength = 80;  // Set your desired maximum length here

  const breakLongText = (text) => {
    if (text.length <= maxLength) return [text];  // No need to break if it's short enough
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    });
    
    if (currentLine) lines.push(currentLine);  // Push the last line
    return lines;
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedStory = localStorage.getItem('activeStory');
      setActiveStory(storedStory ? JSON.parse(storedStory) : null);
    };

    // Listen for both native storage changes and custom updates
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdate', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleStorageChange);
    };
  }, []);

  if (!activeStory) {
    return <div className="active-content">No story selected.</div>;
  }

  return (
    <div className="active-story-content">
      <h2>{activeStory.stakeholder}</h2>
      <div>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {activeStory.bdd.map((scenario, index) => {
            // Split the scenario into parts based on the keywords 'Given', 'When', and 'Then'
            const parts = scenario.match(/(Given .*?,)|(When .*?,)|(Then .*\.)/g);

            return (
              <li
                key={index}
                style={{
                  marginBottom: '0.5rem',
                  padding: '1rem',
                }}
              >
                {parts?.map((part, partIndex) => {
                  // Break the text into lines if it exceeds the max length
                  const lines = breakLongText(part);
                  return lines.map((line, lineIndex) => (
                    <div
                      key={lineIndex}
                      style={{
                        fontFamily: 'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
                        color: '#383a42',
                        textAlign: 'left',
                        wordWrap: 'break-word',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        fontSize: 'small',
                        hyphens: 'none',
                        lineHeight: 1,
                        tabSize: 4,
                        paddingBottom: '0.5rem',
                      }}
                    >
                      {line}
                    </div>
                  ));
                })}
              </li>
            );
          })}
        </ul>
        <br />
      </div>
    </div>
  );
};
