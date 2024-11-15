

// src/components/DesignPad/Navigation.jsx
import React from 'react';
import './Navigation.css';

export const Navigation = () => {
  return (
    <div className="io-about">
        <ul className="io-control-list io-horizontal">
            <li>
                <a href="/" target="_blank" title="privacy policy">
                    Privacy
                </a>
            </li>
            <li>
                <a href="/" target="_blank" title="terms of use">
                    Terms
                </a>
            </li>
            <li>
                <a href="/" target="_blank" title="imprint">
                    Imprint
                </a>
            </li>
            <li>
                <a href="/">
                    Cookie Preferences
                </a>
            </li>
            <li>
                <a href="/" title="More information about this demo" data-track="help:open-about">
                    About
                </a>
            </li>
            <li>
                <a href="/" title="Report an issue or suggest improvements" target="_blank" data-track="help:open-report">
                    Give Feedback
                </a>
            </li>
        </ul>
    </div>
);
};
