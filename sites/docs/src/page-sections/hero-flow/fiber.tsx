import { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Tetrahedron, Box, MeshWobbleMaterial } from '@react-three/drei';

const randomVector = (r) => [
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

function Shape({ type, random, color, ...props }) {
  const ref = useRef<any>();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    if (ref.current) {
      ref.current.rotation.set(
        Math.cos(t / 4) / 2,
        Math.sin(t / 4) / 2,
        Math.cos(t / 1.5) / 2
      );
    }
  });

  const ShapeComponent = type === 'cube' ? Box : Tetrahedron;

  return (
    <ShapeComponent ref={ref} args={[1]} {...props}>
      <MeshWobbleMaterial color={color} />
    </ShapeComponent>
  );
}

function Cam({ zoom }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, +zoom);
  }, [zoom]);

  return null;
}

export default function App({ color, zoom, shape, count = 150 }) {
  const randomData = useMemo(
    () =>
      Array.from({ length: count }, (r = 10) => ({
        random: Math.random(),
        position: randomVector(r),
        rotation: randomEuler(),
      })),
    [count]
  );

  return (
    <div>
      <Canvas resize={canvasResize} dpr={2}>
        <Cam zoom={zoom} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[0, 25, 20]} />
        <Suspense fallback={null}>
          {randomData.map((props, i) => (
            <Shape key={i} {...props} color={color} type={shape} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
