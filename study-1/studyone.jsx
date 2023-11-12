import { useEffect, useRef, useState, useMemo } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { GizmoHelper, PivotControls, useHelper } from '@react-three/drei'
import { AxesHelper, Vector3, Euler, Quaternion, MathUtils } from 'three'
import { useFrame, useLoader } from '@react-three/fiber'
import { setQuaternionFromProperEuler } from 'three/src/math/MathUtils'
import * as THREE from 'three'
import { useControls } from 'leva'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function StudyOne()
{

    // const yRef = useRef()
    // const xRef = useRef()
    // const zRef = useRef()

    // const [ top, setTop ] = useState([1, 2, 3, 4])
    // const [ side, setSide ] = useState([5, 6, 2, 1])
    // const [ front, setFront ] = useState([8, 5, 1, 4])

    const [cubeState, setCubeState] = useState({
        top: [1, 2, 3, 4],
        side: [5, 6, 2, 1],
        front: [8, 5, 1, 4],
    })

    const [ clickCountY, setClickCountY ] = useState(0)
    const [ clickCountX, setClickCountX ] = useState(0)
    const [ clickCountZ, setClickCountZ ] = useState(0)

    const yRefClick = () =>
    {

        setCubeState((prevState) => {
            const tempTop = [prevState.top[3], prevState.top[0], prevState.top[1], prevState.top[2]]
            const tempSide = [prevState.side[0], prevState.side[1], prevState.top[0], prevState.top[3]]
            const tempFront = [prevState.front[0], prevState.front[1], prevState.top[3], prevState.top[2]]

            return {
                ...prevState,
                top: tempTop,
                side: tempSide,
                front: tempFront,
            }
        })
        setClickCountY((clickCountY) => clickCountY + 1)
    }
    const xRefClick = () =>
    {
        setCubeState((prevState) => {
            const tempTop = [prevState.side[2], prevState.side[1], prevState.top[2], prevState.top[3]]
            const tempSide = [prevState.side[3], prevState.side[0], prevState.side[1], prevState.side[2]]
            const tempFront = [prevState.front[0], prevState.side[3], prevState.side[2], prevState.front[3]]

            return {
                ...prevState,
                top: tempTop,
                side: tempSide,
                front: tempFront,
            }
        })
        setClickCountX((clickCountX) => clickCountX + 1)
    }
    const zRefClick = () =>
    {
        setCubeState((prevState) => {
            const tempTop = [prevState.front[1], prevState.top[1], prevState.top[2], prevState.front[2]]
            const tempSide = [prevState.front[0], prevState.side[1], prevState.side[2], prevState.front[1]]
            const tempFront = [prevState.front[3], prevState.front[0], prevState.front[1], prevState.front[2]]

            return {
                ...prevState,
                top: tempTop,
                side: tempSide,
                front: tempFront,
            }
        })
        setClickCountZ((clickCountZ) => clickCountZ + 1)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            yRefClick()
            setTimeout(xRefClick, 1500)
            setTimeout(zRefClick, 3000)
        }, 4500)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return <>

        {/* <mesh ref={yRef} position={[0, 1, 0]} onClick={yRefClick}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>

        <mesh ref={xRef} position={[1, 0, 0]} onClick={xRefClick}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="yellow" />
        </mesh>

        <mesh ref={zRef} position={[0, 0, 1]} onClick={zRefClick}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshStandardMaterial color="blue" />
        </mesh> */}

        <PivotMesh cube={1} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'no'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[0.57, 0.69, 0.57]} color={'navy'}/>
        <PivotMesh cube={2} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'no'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[0.57, 0.69, -0.57]} color={'blue'}/>
        <PivotMesh cube={3} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'no'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[-0.57, 0.69, -0.57]} color={'dodgerblue'}/>
        <PivotMesh cube={4} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'no'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[-0.57, 0.69, 0.57]} color={'lightblue'}/>

        <PivotMesh cube={5} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'yes'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[0.57, -0.69, 0.57]} color={'MediumVioletRed'}/>
        <PivotMesh cube={6} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'yes'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[0.57, -0.69, -0.57]} color={'DeepPink'}/>
        <PivotMesh cube={7} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'yes'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[-0.57, -0.69, -0.57]} color={'HotPink'}/>
        <PivotMesh cube={8} top={cubeState.top} side={cubeState.side} front={cubeState.front} upsideDown={'yes'} clickCountX={clickCountX} clickCountY={clickCountY} clickCountZ={clickCountZ} position={[-0.57, -0.69, 0.57]} color={'LightPink'}/>

    </>

}

function PivotMesh({
    cube,
    top, side, front, upsideDown,
    clickCountX, clickCountY, clickCountZ, 
    position, color
}){

    const pivotTopRef = useRef()
    const pivotSideRef = useRef()
    const pivotFrontRef = useRef()

    const meshRef = useRef()
    const lookRef = useRef()

    const [ meshCountX, setMeshCountX ] = useState(clickCountX)
    const [ meshCountY, setMeshCountY ] = useState(clickCountY)
    const [ meshCountZ, setMeshCountZ ] = useState(clickCountZ)
    
    useEffect(() => {

        if (side.includes(cube) && clickCountX > 0) {
            pivotSideRef.current.attach(meshRef.current)
            setMeshCountX(meshCountX + 1)
        }
    }, [clickCountX])

    useEffect(() => {

        if (top.includes(cube) && clickCountY > 0) {
            pivotTopRef.current.attach(meshRef.current)
            setMeshCountY(meshCountY + 1)
        }
    }, [clickCountY])

    useEffect(() => {
        if (front.includes(cube) && clickCountZ > 0) {
            pivotFrontRef.current.attach(meshRef.current)
            setMeshCountZ(meshCountZ + 1)
        }
    }, [clickCountZ])

    const { rotationX } = useSpring({
        rotationX: [ Math.PI / 2 * meshCountX ],
        config: { mass: 5, tension: 100, friction: 40, precision: 0.00001, velocity: 0, clamp: true }
    })

    const { rotationY } = useSpring({
        rotationY: [ Math.PI / 2 * meshCountY ],
        config: { mass: 5, tension: 100, friction: 40, precision: 0.00001, velocity: 0, clamp: true }
    })

    const { rotationZ } = useSpring({
        rotationZ: [ Math.PI / 2 * meshCountZ ],
        config: { mass: 5, tension: 100, friction: 40, precision: 0.00001, velocity: 0, clamp: true }
    })

    // set up leva for the three parameters
    const { mesh_rot_x, mesh_rot_y, mesh_rot_z } = useControls({ 
        mesh_rot_x: { value: 0, step: Math.PI / 16 },
        mesh_rot_y: { value: 0, step: Math.PI / 16 },
        mesh_rot_z: { value: 0, step: Math.PI / 16 }
    })    

    // only run on mount
    useEffect(() => {
        meshRef.current.lookAt(lookRef.current.position)
    }, [])

    const lookRefPosition = [
        position[0] * 10,
        position[1] * 8.5,
        position[2] * 10
    ]

    return <>

        <animated.group ref={pivotTopRef} rotation-y={rotationY} />
        <animated.group ref={pivotSideRef} rotation-x={rotationX} />
        <animated.group ref={pivotFrontRef} rotation-z={rotationZ} />

        <mesh 
            ref={meshRef} 
            position={position}
            rotation-x={mesh_rot_x}
            rotation-y={mesh_rot_y}
            rotation-z={mesh_rot_z}
        >
            <LensModel upsideDown={upsideDown} />
            <meshPhysicalMaterial transparent={true} opacity={0.5}/>
        </mesh> 

        <mesh ref={lookRef} position={lookRefPosition} visible={false}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>

    </>

}

function LensModel(upsideDown) {

    const model = useLoader(
        GLTFLoader,
        './models/lens.gltf'
    )

    model.scene.traverse(child => {
        child.castShadow = true
        child.receiveShadow = true
    })

    upsideDown.upsideDown === 'yes' ? model.scene.rotation.z = Math.PI : model.scene.rotation.z = 0

    return <>

        <primitive 
            castShadow
            receiveShadow
            object={ model.scene.clone() } 
        />

    </>

}

function interval(func, wait, times){
    var interv = function(w, t){
        return function(){
            if(typeof t === "undefined" || t-- > 0){
                setTimeout(interv, w);
                try{
                    func.call(null);
                }
                catch(e){
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};
