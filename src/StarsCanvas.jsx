import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, RoundedBox, Sphere } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';

function RotatingStars() {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 35;
      ref.current.rotation.y -= delta / 45;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={120} depth={60} count={3500} factor={2.5} saturation={0} fade speed={0.5} />
    </group>
  );
}

function ShapeSpawner() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const interval = setTimeout(function spawn() {
      // Create new shape details
      const newShape = {
        id: Date.now() + Math.random(),
        type: Math.random() > 0.4 ? 'box' : 'sphere',
        color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8',
        x: Math.random() * 8 - 4, // Drop randomly horizontally within viewport limits
      };

      setShapes((prev) => {
        const next = [...prev, newShape];
        // keep max of 20 elements to avoid memory leaks while maintaining elegance
        if (next.length > 20) return next.slice(next.length - 20);
        return next;
      });

      // Vary the drop interval schedule between 0.8s and 2s
      setTimeout(spawn, 800 + Math.random() * 1200);
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  return (
    <>
      {shapes.map((shape) => (
        <RigidBody 
          key={shape.id} 
          position={[shape.x, 10, -5]} 
          restitution={0.8} // Elegant bounce factor
          colliders={shape.type === 'box' ? 'cuboid' : 'ball'}
        >
          {shape.type === 'box' ? (
            <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.2}>
              <meshStandardMaterial 
                color={shape.color} 
                metalness={0.7} 
                roughness={0.1} 
                transparent 
                opacity={0.3} 
              />
            </RoundedBox>
          ) : (
            <Sphere args={[0.8, 32, 32]}>
              <meshStandardMaterial 
                color={shape.color} 
                metalness={0.7} 
                roughness={0.1} 
                transparent 
                opacity={0.3} 
              />
            </Sphere>
          )}
        </RigidBody>
      ))}
    </>
  );
}

function ScenePhysics() {
  return (
    <Physics gravity={[0, -4, 0]}>
      <ShapeSpawner />
      
      {/* Invisible Floor Plane positioned at the bottom edge */}
      {/* Tilted slightly (-0.05) so the objects slowly roll out of the screen sideways after bouncing */}
      <RigidBody type="fixed" position={[0, -8, -5]} rotation={[0, 0, -0.05]} restitution={0.7}>
        <mesh>
          <boxGeometry args={[40, 1, 20]} />
          <meshBasicMaterial visible={false} />
        </mesh>
      </RigidBody>
    </Physics>
  );
}

export default function StarsCanvas() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} color="#38bdf8" intensity={0.8} />
        
        <RotatingStars />
        <ScenePhysics />
      </Canvas>
    </div>
  );
}
