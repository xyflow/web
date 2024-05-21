import './App.css';

import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const paths = [
  {
    id: 'custom-edge',
    path: 'CustomEdge',
  },
  {
    id: 'elkjs-tree',
    path: 'ElkjsTree',
  },
];

const router = createBrowserRouter(
  paths.map((path) => ({
    path: `/${path.id}`,
    Component: lazy(
      () =>
        import(
          // @ts-expect-error this line will error because we don't know it's a react component
          `../../../sites/reactflow.dev/src/components/example-viewer/example-flows/ElkjsMultiHandle`
        ),
    ),
  })),
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
