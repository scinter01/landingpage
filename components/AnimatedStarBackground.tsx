'use client'

import React, { useRef, useEffect } from 'react'

const AnimatedStarBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const stars: Star[] = []
    const numStars = 200
    let mouseX = 0
    let mouseY = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    class Star {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
      }

      update() {
        this.x += this.speedX + (mouseX - canvas.width / 2) * 0.0005
        this.y += this.speedY + (mouseY - canvas.height / 2) * 0.0005

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function createStars() {
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star())
      }
    }

    function animateStars() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(0, 0, 51, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      animationFrameId = requestAnimationFrame(animateStars)
    }

    function handleMouseMove(event: MouseEvent) {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    function handleResize() {
      resizeCanvas()
      stars.length = 0
      createStars()
    }

    createStars()
    animateStars()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-[-1]" />
}

export default AnimatedStarBackground

