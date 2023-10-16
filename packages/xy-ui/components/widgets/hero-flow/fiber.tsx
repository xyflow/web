import { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

const randomVector = (r: number) => [
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
  r / 2 - Math.random() * r,
];

const randomEuler = () => [
  Math.random() * Math.PI,
  Math.random() * Math.PI,
  Math.random() * Math.PI,
];

const canvasResize = { scroll: false };

function Shape({ type, random, color, ...props }: any) {
  const ref = useRef<any>();
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
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <tetrahedronGeometry args={[1, 0]} />
      )}
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

function Cam({ zoom }: { zoom: number }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, +zoom);
  }, [zoom]);

  return null;
}

export default function App({ color, zoom, shape, count = 150 }: any) {
  const randomData = useMemo(
    () =>
      Array.from({ length: count }, (r: number = 10) => ({
        random: Math.random(),
        position: randomVector(r),
        rotation: randomEuler(),
      })),
    [count],
  );

  return (
    <Canvas resize={canvasResize} dpr={2}>
      <Cam zoom={zoom} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={3} position={[0, 0, 100]} />

      <Suspense fallback={null}>
        {randomData.map((props, i) => (
          <Shape key={i} {...props} color={color} type={shape} />
        ))}
      </Suspense>
    </Canvas>
  );
}
