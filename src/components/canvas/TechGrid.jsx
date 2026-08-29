import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";

import CanvasLoader from "../Loader";

const BallMesh = ({ imgUrl, position }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2} position={position}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={1.4}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// Renders ALL technology icons inside a single shared <Canvas> (one WebGL
// context) instead of the previous approach of one <Canvas> per icon.
// Mounting 10+ separate WebGL contexts at once was hitting the browser's
// context limit ("Too many active WebGL contexts"), which was silently
// evicting/breaking the Hero section's 3D scene.
const TechGridCanvas = ({ technologies }) => {
  const columns = technologies.length > 8 ? 7 : 5;
  const spacingX = 3.2;
  const spacingY = -3.4;
  const rows = Math.ceil(technologies.length / columns);
  const offsetX = ((columns - 1) * spacingX) / 2;
  const offsetY = ((rows - 1) * Math.abs(spacingY)) / 2;

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{ position: [0, 0, 16], fov: 35 }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {technologies.map((tech, i) => {
          const col = i % columns;
          const row = Math.floor(i / columns);
          const x = col * spacingX - offsetX;
          const y = row * spacingY + offsetY;
          return (
            <BallMesh key={tech.name} imgUrl={tech.icon} position={[x, y, 0]} />
          );
        })}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default TechGridCanvas;
