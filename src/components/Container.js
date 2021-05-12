
import React, { Suspense, useRef} from 'react'
import { Canvas} from '@react-three/fiber'
import {OrbitControls} from "@react-three/drei"
import Bondi from "./Bondi"


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

        <OrbitControls />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={0.5} />
      <Suspense fallback={null}>
        <Bondi/>
      </Suspense>
     
    </Canvas>
    </div>
  )

}
export default Container
