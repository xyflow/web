import '@xyflow/react/dist/style.css';

import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
  Controls,
  Panel,
} from '@xyflow/react';
import styled, { ThemeProvider } from 'styled-components';

import { nodes as initialNodes, edges as initialEdges } from './initialElements';
import { darkTheme, lightTheme } from './theme';
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const ReactFlowStyled = styled(ReactFlow)`
  background-color: ${(props) => props.theme.bg};
`;

const MiniMapStyled = styled(MiniMap)`
  background-color: ${(props) => props.theme.bg};

  .react-flow__minimap-mask {
    fill: ${(props) => props.theme.minimapMaskBg};
  }

  .react-flow__minimap-node {
    fill: ${(props) => props.theme.nodeBg};
    stroke: none;
  }
`;

const ControlsStyled = styled(Controls)`
  button {
    background-color: ${(props) => props.theme.controlsBg};
    color: ${(props) => props.theme.controlsColor};
    border-bottom: 1px solid ${(props) => props.theme.controlsBorder};

    &:hover {
      background-color: ${(props) => props.theme.controlsBgHover};
    }

    path {
      fill: currentColor;
    }
  }
`;

const Flow = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  return (
    <ReactFlowStyled
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMapStyled />
      <ControlsStyled />
      <Background />
      {children}
    </ReactFlowStyled>
  );
};

export default () => {
  const [mode, setMode] = useState('light');
  const theme = mode == 'light' ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m == 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Flow>
        <Panel position="top-left">
          <button className="xy-theme__button" onClick={toggleMode}>
            switch mode
          </button>
        </Panel>
      </Flow>
    </ThemeProvider>
  );
};
