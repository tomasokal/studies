import { OrbitControls, Stage } from '@react-three/drei'
import StudyOne from '../study-1/studyone'
import { PlaneGeometry } from 'three'
import * as THREE from 'three'

export default function Experience()
{
    
    return <>
    
        <StudyOne />
        <mesh position={[0, 0, -3]}>
            <cylinderGeometry args={[10, 10, 20]} />
            <meshStandardMaterial color="red" side={THREE.DoubleSide}/>
        </mesh>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
        <OrbitControls />
    
    </>

}
