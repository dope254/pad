import React, { useEffect, useRef } from 'react';

const BpmnViewer = ({ url }) => {
  const viewerRef = useRef();

  useEffect(() => {
    const loadDiagram = async () => {
      const { ReactBpmn } = window; // Access the library from the global scope

      if (!ReactBpmn) {
        console.error('ReactBpmn is not available. Check your script inclusion.');
        return;
      }

      try {
        const response = await fetch(url);
        const diagramXML = await response.text();

        const bpmnViewer = new ReactBpmn({
          container: viewerRef.current,
        });

        bpmnViewer.importXML(diagramXML, (err) => {
          if (err) {
            console.error('Failed to render diagram', err);
          } else {
            console.log('Diagram rendered successfully');
          }
        });
      } catch (error) {
        console.error('Error loading BPMN diagram:', error);
      }
    };

    loadDiagram();
  }, [url]);

  return <div ref={viewerRef} style={{ height: '100vh', width: '100%' }} />;
};

export default BpmnViewer;
