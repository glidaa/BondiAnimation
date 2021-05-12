import ReactDOM from 'react-dom'
import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useLoader, useFrame ,useThree} from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useMouse from '@react-hook/mouse-position'
import { PerspectiveCamera } from 'three'

const CameraController = () => {
  const { camera, gl } = useThree();
  //Add Obital Camera(Development Only)
  useEffect(
    () => {
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = 3;          
      controls.maxDistance = 20;
      return () => {
        controls.dispose();
      };
    },
    [camera, gl]
  );
  return null;
};
//Tour (ie 1 to 2)(Load glb file and play animation)
function Tour1(){
  const gltf=useGLTF("assets/Bondi.glb");
  const { camera, gl } = useThree();
  let mixer;
  let dummy=new THREE.Object3D();
useEffect(()=>{
  dummy.setposition=[0,0,100]
  camera.updateMatrix(dummy.matrix)
  if (gltf.animations.length) {
      mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach(clip => {
          const action = mixer.clipAction(clip)
          console.log(action)
          action.play();
      });}
})
  useFrame((state, delta) => {
      mixer?.update(delta)
  })
 
  return(
    <primitive object={gltf.scene}/>
  )
}
function Container() {
  const ref =useRef(null);
 
  // const mouse = useMouse(ref, {
  //   enterDelay: 100,
  //   leaveDelay: 100,
  // })
  return(
    <div ref={ref}>
    <Canvas 
    onCreated={({ gl }) => {
                  
      gl.setSize(window.innerWidth,window.innerHeight)
  }}>
  <CameraController/>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
    <Tour1/>
      </Suspense>
     
    </Canvas>
    </div>
  )

}
export default Container
