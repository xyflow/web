import dynamic from 'next/dynamic';

// react-player doesn't work with SSR
// https://github.com/cookpete/react-player/issues/1474
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default ReactPlayer;
