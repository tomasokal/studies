import { useEffect, useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { useControls } from 'leva'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'
import { MeshTransmissionMaterial } from './materials/MeshTransmissionMaterial.ts'

export default function StudyOne()
{


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
            rotation-x={0}
            rotation-y={0}
            rotation-z={0}
        >
            <LensModel upsideDown={upsideDown} />
        </mesh> 

        <mesh ref={lookRef} position={lookRefPosition} visible={false}>
            <boxGeometry args={[1, 1, 1]} />
        </mesh>

    </>

}

function LensModel(upsideDown) {

    const { nodes, materials } = useGLTF("./models/lens.gltf")

    const model = useLoader(
        GLTFLoader,
        './models/lens.gltf'
    )

    model.scene.traverse(child => {
        child.castShadow = true
        child.receiveShadow = true
    })

    upsideDown.upsideDown === 'yes' ? model.scene.rotation.z = Math.PI : model.scene.rotation.z = 0

    const meshTransmissionMaterial = new MeshTransmissionMaterial()
    
    const { 
        color, roughness, metalness, 
        ior, specularColor, specularIntensity, 
        transmission, thickness, attenuationColor, attenuationDistance, chromaticAberration,
        envMapIntensity,
        opacity, transparent
     } = useControls({
        color: { value: '#ffffff' },
        roughness: { value: 0.5, min: 0, max: 1 },
        metalness: { value: 0, min: 0, max: 1 },

        ior: { value: 1.5, min: 1, max: 2 },
        specularColor: { value: '#ffffff' },
        specularIntensity: { value: 0.5, min: 0, max: 1 },

        transmission: { value: 0.5, min: 0, max: 1 },
        thickness: { value: 1, min: 0, max: 5 },
        attenuationColor: { value: '#ffffff' },
        attenuationDistance: { value: 0.5, min: 0, max: 1 },
        chromaticAberration: { value: 0.03, min: 0, max: 1 },

        envMapIntensity: { value: 0.5, min: 0, max: 1 },

        opacity: { value: 0.5, min: 0, max: 1 },
        transparent: true,
    })

    model.scene.traverse( function( object ) {

        if ( object.isMesh ) {

            object.castShadow = true
            object.receiveShadow = true

            // object.material = new MeshTransmissionMaterial({
            //     _transmission: transmission,
            //     thickness: thickness,
            //     roughness: roughness,
            //     chromaticAberration: chromaticAberration,
            //     // anisotropicBlur: 0.1,
            //     // distortion: 0,
            //     // distortionScale: 0.5,
            //     // temporalDistortion: 0.0,
            //   })

            object.material = new THREE.MeshPhysicalMaterial(
                {
                    color: color,
                    roughness: roughness,
                    metalness: metalness,

                    ior: ior,
                    specularColor: specularColor,
                    specularIntensity: specularIntensity,

                    transmission: transmission,
                    thickness: thickness,
                    attenuationColor: attenuationColor,
                    attenuationDistance: attenuationDistance,

                    envMapIntensity: envMapIntensity,

                    opacity: 0.5,
                    transparent: transparent,

                    depthTest: false,
                }
            )
    
        }
    
    })

    return <>

        <primitive 
            castShadow
            receiveShadow
            object={ model.scene.clone() }
            material={ model.materials }
        />

    </>

}
