import React, { useEffect, useRef, useState } from 'react';
import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';
import BpmnJS from 'bpmn-js';
import './Grid.css';

const EMPTY_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                  xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" 
                  xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                  id="Definitions_1" 
                  targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="Process_1" isExecutable="false">
    <bpmn:startEvent id="StartEvent_1"/>
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_1" bpmnElement="StartEvent_1">
        <dc:Bounds x="152" y="102" width="36" height="36"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export const Grid = () => {
  const canvasRef = useRef(null);
  const bpmnRef = useRef(null);
  const [error, setError] = useState(null);
  const [modeler, setModeler] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('initializing');

  // Initialize BPMN modeler
  useEffect(() => {
    if (!bpmnRef.current) return;

    try {
      const bpmnModeler = new BpmnJS({
        container: bpmnRef.current,
        height: '100%',
        width: '100%',
        // Add modules configuration
        additionalModules: [],
        // Enable keyboard bindings
        keyboard: { bindTo: document }
      });

      // Set up event listeners before setting the modeler
      bpmnModeler.on('import.done', ({ error: importError, warnings }) => {
        if (importError) {
          console.error('BPMN import error:', importError);
          setError(`Import error: ${importError.message}`);
          setLoadingStatus('error');
        } else {
          console.log('BPMN import completed with warnings:', warnings);
          setError(null);
          setLoadingStatus('complete');
          
          // Auto-adjust viewport after successful import
          const canvas = bpmnModeler.get('canvas');
          if (canvas) {
            canvas.zoom('fit-viewport', 'auto');
          }
        }
      });

      setModeler(bpmnModeler);
      setLoadingStatus('modeler-created');

      return () => {
        bpmnModeler.destroy();
      };
    } catch (err) {
      console.error('Error initializing BPMN modeler:', err);
      setError(`Failed to initialize BPMN modeler: ${err.message}`);
    }
  }, []);

  // Load BPMN diagram
  useEffect(() => {
    if (!modeler) return;

    const loadDiagram = async () => {
      try {
        setLoadingStatus('loading-file');
        const response = await fetch('/data/diagram.bpmn');
        
        if (!response.ok) {
          throw new Error(`Failed to load file (${response.status} ${response.statusText})`);
        }

        const bpmnXML = await response.text();
        console.log('Loaded BPMN XML length:', bpmnXML.length);

        // Import the diagram
        await new Promise((resolve, reject) => {
          modeler.importXML(bpmnXML, (err) => {
            if (err) {
              console.error('Error details:', err);
              reject(err);
            } else {
              resolve();
            }
          });
        });

      } catch (error) {
        console.error('Error loading or importing diagram:', error);
        setError(`Failed to load or import diagram: ${error.message}`);
        
        // Try loading empty diagram as fallback
        try {
          await new Promise((resolve, reject) => {
            modeler.importXML(EMPTY_DIAGRAM, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        } catch (fallbackError) {
          setError(`Failed to load empty diagram: ${fallbackError.message}`);
        }
      }
    };

    loadDiagram();
  }, [modeler]);

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
    <div className="design-pad" style={{ width: '100%', height: '800px', position: 'relative' }}>
      <svg ref={canvasRef} className="design-pad__grid" style={{ position: 'absolute', width: '100%', height: '100%' }} />
      {error ? (
        <div className="error-alert" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          <div className="error-alert__title" style={{ fontWeight: 'bold', marginBottom: '10px' }}>Error</div>
          <div className="error-alert__description">
            {error}
            <div className="error-alert__status" style={{ marginTop: '10px', color: '#666' }}>Status: {loadingStatus}</div>
          </div>
        </div>
      ) : (
        <div 
          ref={bpmnRef} 
          className="bpmn-container" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            backgroundColor: 'transparent'
          }} 
        />
      )}
    </div>
  );
};