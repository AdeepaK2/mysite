'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Text, Box } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function Logo3D() {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Backdrop/Shield shape */}
        <Box args={[6, 3, 0.2]} position={[0, -0.5, -0.5]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#0078D4"
            transparent
            opacity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </Box>

        {/* Main name text - with split styling */}
        {/* "adeep" - white */}
        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.8}
          position={[-2.4, 0, 0]}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          castShadow
        >
          adeep
          <meshStandardMaterial
            color="#ffffff"
            emissive="#0078D4"
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.3}
          />
        </Text>

        {/* "a.k" - red (characters 6-8) */}
        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.8}
          position={[-0.4, 0, 0.1]}
          color="#ED1D24"
          anchorX="left"
          anchorY="middle"
          castShadow
        >
          a.k
          <meshStandardMaterial
            color="#ED1D24"
            emissive="#ED1D24"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </Text>

        {/* "ularathna" - white */}
        <Text
          font="/fonts/inter-bold.woff"
          fontSize={0.8}
          position={[0.6, 0, 0]}
          color="#ffffff"
          anchorX="left"
          anchorY="middle"
          castShadow
        >
          ularathna
          <meshStandardMaterial
            color="#ffffff"
            emissive="#0078D4"
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.3}
          />
        </Text>

        {/* Decorative elements around the logo */}
        <Box args={[0.4, 0.4, 0.4]} position={[-4, 1.2, 0.5]}>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
        </Box>
        
        <Box args={[0.4, 0.4, 0.4]} position={[4, 1.2, 0.5]}>
          <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.4} />
        </Box>

        {/* Red accent elements for "a.k" */}
        <Box args={[0.3, 0.3, 0.3]} position={[-2, -1.5, 0.8]}>
          <meshStandardMaterial color="#ED1D24" emissive="#ED1D24" emissiveIntensity={0.5} />
        </Box>
        
        <Box args={[0.3, 0.3, 0.3]} position={[2, -1.5, 0.8]}>
          <meshStandardMaterial color="#ED1D24" emissive="#ED1D24" emissiveIntensity={0.5} />
        </Box>
      </group>
    </Float>
  )
}

export default function FloatingLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-64 relative"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} color="#ED1D24" intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#FFD700" intensity={0.3} />
        
        <Logo3D />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Comic-style background effects */}
      <div className="absolute inset-0 -z-10 comic-dots" />
      <div className="absolute inset-0 -z-10 halftone-bg" />
    </motion.div>
  )
}
