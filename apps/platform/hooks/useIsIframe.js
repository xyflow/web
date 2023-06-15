import { useMemo } from 'react';

function useIsIframe() {
  const isIframe = useMemo(() => {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }, []);

  return isIframe;
}

export default useIsIframe;
