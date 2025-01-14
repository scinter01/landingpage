'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Cylinder, Environment, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import * as THREE from 'three'

const WaterMolecule = ({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const groupRef = useRef()

  // Oxygen atom (red)
  const oxygenProps = {
    args: [0.3 * scale, 32, 32],
    position: [0, 0, 0],
  }

  // Hydrogen atoms (white)
  const hydrogen1Props = {
    args: [0.2 * scale, 32, 32],
    position: [-0.5 * scale, 0.5 * scale, 0],
  }

  const hydrogen2Props = {
    args: [0.2 * scale, 32, 32],
    position: [0.5 * scale, 0.5 * scale, 0],
  }

  // Bonds
  const bond1Props = {
    args: [0.08 * scale, 0.08 * scale, 0.6 * scale, 8],
    position: [-0.25 * scale, 0.25 * scale, 0],
    rotation: [0, 0, Math.PI / 4],
  }

  const bond2Props = {
    args: [0.08 * scale, 0.08 * scale, 0.6 * scale, 8],
    position: [0.25 * scale, 0.25 * scale, 0],
    rotation: [0, 0, -Math.PI / 4],
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Oxygen */}
      <Sphere {...oxygenProps}>
        <meshPhysicalMaterial 
          color="#ff4444"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </Sphere>

      {/* Hydrogens */}
      <Sphere {...hydrogen1Props}>
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </Sphere>
      <Sphere {...hydrogen2Props}>
        <meshPhysicalMaterial 
          color="#ffffff"
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.2}
        />
      </Sphere>

      {/* Bonds */}
      <Cylinder {...bond1Props}>
        <meshPhysicalMaterial 
          color="#cccccc"
          roughness={0.3}
          metalness={0.7}
        />
      </Cylinder>
      <Cylinder {...bond2Props}>
        <meshPhysicalMaterial 
          color="#cccccc"
          roughness={0.3}
          metalness={0.7}
        />
      </Cylinder>
    </group>
  )
}

const WaterCluster = () => {
  const molecules = useMemo(() => {
    const positions = []
    const count = 200 // Number of surrounding water molecules
    const radius = 10 // Radius of the sphere

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi

      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      positions.push([x, y, z])
    }

    return positions
  }, [])

  return (
    <>
      {/* Central molecule */}
      <WaterMolecule scale={1.5} />

      {/* Surrounding molecules */}
      {molecules.map((pos, idx) => (
        <WaterMolecule
          key={idx}
          position={pos}
          scale={0.3}
          rotation={[
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          ]}
        />
      ))}
    </>
  )
}

const MoleculeViewer = () => {
  return (
    <div className="w-full h-[400px] bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        dpr={[1, 2]}
        shadows
      >
        <color attach="background" args={['#111111']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* Environment and shadows */}
        <Environment preset="city" />
        <AccumulativeShadows
          temporal
          frames={60}
          alphaTest={0.85}
          scale={10}
          position={[0, -1, 0]}
        >
          <RandomizedLight
            amount={8}
            radius={5}
            intensity={1}
            ambient={0.5}
            position={[5, 5, -10]}
          />
        </AccumulativeShadows>

        {/* Water cluster */}
        <WaterCluster />

        {/* Controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={true}
          enablePan={false}
          minDistance={10}
          maxDistance={30}
        />
      </Canvas>
    </div>
  )
}

export default MoleculeViewer

