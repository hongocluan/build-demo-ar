/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/models/chair.gltf
*/

// import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export const Chair = (props) => {
  const { nodes, materials } = useGLTF('./models/chair.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Chair.geometry} material={materials.Chair} />
      <mesh geometry={nodes.Cushion.geometry} material={materials.Cushion} position={[0, 0.06, 0.04]} />
      <mesh geometry={nodes.Legs1.geometry} material={materials.Legs} />
      <mesh geometry={nodes.Legs2.geometry} material={materials.Legs} />
    </group>
  )
}

useGLTF.preload('./models/chair.gltf');
