import React, { useCallback } from 'react';
import { ReactFlow, Background } from '@xyflow/react';

import { useState } from 'react';
import { useEffect } from 'react';

const initialNodes = [
  { id: 'a', position: { x: -100, y: 0 }, data: { label: 'A' } },
  { id: 'b', position: { x: 100, y: 0 }, data: { label: 'B' } },
  { id: 'c', position: { x: 0, y: 100 }, data: { label: 'C' } },
];

const initialEdges = [{ id: 'b->c', source: 'b', target: 'c' }];

const Flow = () => {
  const [events, setEvents] = useState({
    onReconnectStart: false,
    onConnectStart: false,
    onConnect: false,
    onReconnect: false,
    onConnectEnd: false,
    onReconnectEnd: false,
  });

  const onReconnectStart = useCallback(() => {
    console.log('onReconnectStart');
    setEvents({
      onReconnectStart: true,
      onConnectStart: false,
      onConnect: false,
      onReconnect: false,
      onConnectEnd: false,
      onReconnectEnd: false,
    });
  }, []);

  const onConnectStart = useCallback(() => {
    console.log('onConnectStart');
    setEvents((events) => ({
      ...events,
      onConnectStart: true,
      onConnect: false,
      onReconnect: false,
      onConnectEnd: false,
      onReconnectEnd: false,
    }));
  }, []);

  const onConnect = useCallback(() => {
    console.log('onConnect');
    setEvents({
      onReconnectStart: false,
      onConnectStart: false,
      onConnect: true,
      onReconnect: false,
      onConnectEnd: false,
      onReconnectEnd: false,
    });
  }, []);

  const onReconnect = useCallback(() => {
    console.log('onReconnect');
    setEvents({
      onReconnectStart: false,
      onConnectStart: false,
      onConnect: false,
      onReconnect: true,
      onConnectEnd: false,
      onReconnectEnd: false,
    });
  }, []);

  const onConnectEnd = useCallback(() => {
    setEvents((events) => ({
      ...events,
      onReconnectStart: false,
      onConnectStart: false,
      onConnectEnd: true,
    }));
  }, []);

  const onReconnectEnd = useCallback(() => {
    console.log('onReconnectEnd');
    setEvents((events) => ({
      ...events,
      onReconnectStart: false,
      onConnectStart: false,
      onReconnectEnd: true,
    }));
  }, []);

  useEffect(() => {
    if (!events.onReconnectEnd && !events.onConnectEnd) return;

    let timer = window.setTimeout(() => {
      setEvents({
        onReconnectStart: false,
        onConnectStart: false,
        onConnect: false,
        onReconnect: false,
        onConnectEnd: false,
        onReconnectEnd: false,
      });
    }, 500);

    return () => window.clearTimeout(timer);
  });

  return (
    <>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        edgesReconnectable={true}
        onConnectStart={onConnectStart}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
        >
          <Background />
        </ReactFlow>
      <div id="event-list">
        {Object.entries(events).map(([name, active]) => (
          <p key={name} style={{ opacity: active ? 1 : 0.2 }}>
            {name}
          </p>
        ))}
      </div>
    </>
  );
};

export default Flow;
