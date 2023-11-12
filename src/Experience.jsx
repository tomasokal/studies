import { OrbitControls, Stage } from '@react-three/drei'
import StudyOne from '../study-1/studyone'

export default function Experience()
{
    
    return <>
    
        <StudyOne />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
    
    </>

}
