// Logo.jsx
import React from 'react';
import './Logo.css';

export const Logo = () => {
  return (
    <div className="goo-container">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="fancy-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div className="container top-con">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="blob-container">
            <div className="blob" />
          </div>
        ))}
      </div>
      <div className="container bottom-con" />
    </div>
  );
};
