// src/components/DesignPad/ZoomControls.jsx
import React from 'react';
import './ZoomControls.css';

export const ZoomControls = () => {
  return (
    <div className="io-zoom-controls">
      <ul className="io-control-list">
        <li>
          <button title="reset zoom" onClick={() => window.zoomReset?.()}>
            <span className="icon-size-reset">↺</span>
          </button>
        </li>
        <li><hr /></li>
        <li>
          <button title="zoom in" onClick={() => window.zoomIn?.()}>
            <span className="icon-plus">+</span>
          </button>
        </li>
        <li><hr /></li>
        <li>
          <button title="zoom out" onClick={() => window.zoomOut?.()}>
            <span className="icon-minus">-</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
