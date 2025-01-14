'use client'

import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

const StarMeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setClearColor(0x111111); // Dark grayish-black color

    renderer.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Create star geometry
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    })

    const starVertices = []
    const starPositions = []
    const numStars = 800
    const spread = 150

    for (let i = 0; i < numStars; i++) {
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      starVertices.push(x, y, z)
      starPositions.push(new THREE.Vector3(x, y, z))
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Create connections
    const connectionsMaterial = new THREE.LineBasicMaterial({
      color: 0x4169E1,
      transparent: true,
      opacity: 0.3,
    })
    const connectionsGeometry = new THREE.BufferGeometry()
    const connectionPositions: number[] = []

    for (let i = 0; i < starPositions.length; i++) {
      for (let j = i + 1; j < starPositions.length; j++) {
        const distance = starPositions[i].distanceTo(starPositions[j])
        if (distance < 15) {
          connectionPositions.push(
            starPositions[i].x, starPositions[i].y, starPositions[i].z,
            starPositions[j].x, starPositions[j].y, starPositions[j].z
          )
        }
      }
    }

    connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3))
    const connections = new THREE.LineSegments(connectionsGeometry, connectionsMaterial)
    scene.add(connections)

    camera.position.z = 75

    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.x += 0.0001
      stars.rotation.y += 0.0001
      connections.rotation.x += 0.0001
      connections.rotation.y += 0.0001
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Add mouse interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObject(stars)

      if (intersects.length > 0) {
        const intersect = intersects[0]
        const idx = Math.floor(intersect.index! / 3)
        const highlightMaterial = new THREE.PointsMaterial({
          color: 0x00FFFF,
          size: 0.3,
          transparent: true,
          opacity: 1,
        })
        const highlightGeometry = new THREE.BufferGeometry()
        highlightGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices.slice(idx * 3, (idx + 1) * 3), 3))
        const highlightPoint = new THREE.Points(highlightGeometry, highlightMaterial)
        scene.add(highlightPoint)

        setTimeout(() => {
          scene.remove(highlightPoint)
        }, 1000)
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', onMouseMove)
      containerRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 z-[-1]" />
}

export default StarMeshBackground

