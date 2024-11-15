// src/components/DesignPad/index.jsx
import React from 'react';
import { Grid } from '../../components/Grid/Grid';
import { UserStoryCards } from '../../components/UserStoryCards/UserStoryCards';
import { ChatBox } from '../../components/ChatBox/ChatBox';
import PDFCardContainer from '../../components/PdfViewer/PdfViewer';
import { Logo } from '../../components/Logo/Logo';
import { Navigation } from '../../components/Navigation/Navigation';
import { ZoomControls } from '../../components/ZoomControls/ZoomControls';
import './DesignPad.css';

export const DesignPad = () => {
  return (
    <div className="design-pad">
      <div className="design-pad__logo-section">
        <Logo />
      </div>
      <div className="design-pad__stories-section">
        <UserStoryCards />
      </div>
      <div className="design-pad__documents">
        <PDFCardContainer />
      </div>
      <div className="design-pad__canvas-container">
        <div id="canvas">
          <Grid />
        </div>
        <ZoomControls />
      </div>
      <ChatBox />
      <Navigation />
    </div>
  );
};
