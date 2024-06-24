import './App.css';

import { useEffect, useState, type ComponentType, lazy } from 'react';

function App() {
  const [Component, setComponent] = useState<null | ComponentType>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const examplePath = urlParams.get('path');

    const loadComponent = async () => {
      let extension = 'jsx';

      try {
        await import(
          `../../../sites/reactflow.dev/src/components/example-viewer/example-flows/${examplePath}/index.jsx`
        );
      } catch (err) {
        extension = 'tsx';
      }

      const jsx = lazy(
        () =>
          import(
            `../../../sites/reactflow.dev/src/components/example-viewer/example-flows/${examplePath}/index.${extension}`
          ),
      );

      setComponent(jsx);
    };

    loadComponent();
  }, []);

  if (!Component) {
    return null;
  }

  return <Component />;
}

export default App;
