
import React, { Suspense, useRef} from 'react'
import { Canvas} from '@react-three/fiber'
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

      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <Suspense fallback={null}>
        <Bondi/>
      </Suspense>
     
    </Canvas>
    </div>
  )

}
export default Container
