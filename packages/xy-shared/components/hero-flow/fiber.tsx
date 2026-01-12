import { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useErrorBoundary } from 'use-error-boundary';
import type { Mesh } from 'three';

const randomVector = (r: number): [number, number, number] => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

const randomEuler = (): [number, number, number] => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const canvasResize = { scroll: false };

function WebGLFallback() {
  return (
    <div className="text-light text-sm">Your browser doesn&apos;t support WebGL 😢</div>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface ShapeProps {
  type?: 'cube' | 'tetrahedron';
  random: number;
  color: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function Shape({ type, random, color, ...props }: ShapeProps) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    if (ref.current) {
      ref.current.rotation.set(
        Math.cos(t / 1.5) / 2,
        Math.sin(t) / 2,
        Math.cos(t / 1.5) / 2,
      );
    }
  });

  return (
    <mesh {...props} ref={ref}>
      {type === 'cube' ? (
        // eslint-disable-next-line react/no-unknown-property
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        // eslint-disable-next-line react/no-unknown-property
        <tetrahedronGeometry args={[1, 0]} />
      )}
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

function Cam({ zoom }: { zoom?: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, +(zoom ?? 5));
  }, [zoom, camera]);

  return null;
}

interface AppProps {
  color?: string;
  zoom?: number;
  shape?: 'cube' | 'tetrahedron';
  count?: number;
}

function generateRandomData(count: number) {
  return Array.from({ length: count }, (r: number = 10) => ({
    random: Math.random(),
    position: randomVector(r),
    rotation: randomEuler(),
  }));
}

export default function App({ color, zoom, shape, count = 150 }: AppProps) {
  const { ErrorBoundary, didCatch } = useErrorBoundary();

  const randomData = useMemo(() => generateRandomData(count), [count]);

  // Memoize the availability of WebGL
  const availableWebGL = useMemo(() => isWebGLAvailable(), []);

  if (didCatch || !availableWebGL) {
    return <WebGLFallback />;
  }

  return (
    <ErrorBoundary>
      <Canvas resize={canvasResize} dpr={2} fallback={<WebGLFallback />}>
        <Cam zoom={zoom} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.5} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <directionalLight intensity={3} position={[0, 0, 100]} />

        <Suspense fallback={null}>
          {randomData.map((props, i) => (
            <Shape key={i} {...props} color={color ?? '#ff6b6b'} type={shape} />
          ))}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
}
