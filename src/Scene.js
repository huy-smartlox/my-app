import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/gltfjsx';
import { Physics, useBox } from '@react-three/cannon';

const Scene = () => {
  const hatRef = useRef(null);
  const characterRef = useRef(null);

  const [hat] = useLoader('/models/CharacterBlock.FBX');
  const [character] = useLoader('/models/CharacterCutAttack.FBX');

  // (Optional) Physics setup (uncomment for basic physics)
  const [world] = useState(null);

  useEffect(() => {
    world?.addBody(useBox(() => ({ mass: 1 }))); // Add a simple physics object (uncomment)
  }, [world]);

  useFrame(() => {
    world?.step(0.01); // Update physics (uncomment)
  });

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow />
      <Suspense fallback={null}>
        <group>
          {/* Position your hat model (adjust position and rotation as needed) */}
          <mesh ref={hatRef} {...hat} scale={0.3} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]} />

          {/* Position your character model (adjust position and rotation as needed) */}
          <mesh ref={characterRef} {...character} scale={0.5} position={[0, 0, 0]} rotation={[0, 0, 0]} />
        </group>
      </Suspense>
      {world && <Physics>{world.bodies.map((body) => <body key={body.id} />)}</Physics>}
    </Canvas>
  );
};

export default Scene;