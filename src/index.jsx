import './style.css'

import { StrictMode, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { createRoot } from 'react-dom/client'

import Experience from './Experience'

const root = createRoot(document.querySelector('#root'))

root.render(
    <StrictMode>
        <Canvas>
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
    </StrictMode>
)