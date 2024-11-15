import React from 'react';
import './PdfViewer.css';

const PDFCard = ({ fileName, filePath }) => {
  return (
    <div className="pdf-card">
      <i className="fa-regular fa-file-pdf pdf-icon"></i>
      <span className="file-name">{fileName}</span>
      <a href={filePath} download={fileName} className="download-btn">
        <i className="fa-solid fa-download"></i> {/* Font Awesome download icon */}
      </a>
    </div>
  );
};

const PDFCardContainer = () => {
  const documents = [
    { fileName: 'Document1.pdf', filePath: 'path/to/Document1.pdf' },
    { fileName: 'Document2.pdf', filePath: 'path/to/Document2.pdf' },
    // Add more documents as needed
  ];

  return (
    <div className="card-container">
      {documents.map((doc, index) => (
        <PDFCard key={index} fileName={doc.fileName} filePath={doc.filePath} />
      ))}
    </div>
  );
};

export default PDFCardContainer;
