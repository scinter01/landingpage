'use client'

import React, { FC, useState, useCallback, useEffect, useRef } from 'react'
import { useSpring, animated, config } from '@react-spring/web'
import { motion } from 'framer-motion'

const useAnimatedPath = (initialPath: string) => {
  const [length, setLength] = useState(0)

  const animatedStyle = useSpring({
    strokeDasharray: length,
    strokeDashoffset: 0,
    from: { strokeDashoffset: length },
    config: { duration: 2000 },
  })

  const ref = useCallback((node: SVGPathElement | null) => {
    if (node) {
      setLength(node.getTotalLength())
    }
  }, [])

  return { ref, ...animatedStyle }
}

const FlowDiagram: FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  })

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width: width - 48, height: Math.max(height - 48, 400) })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const nodes = [
    { 
      text: 'LCM', 
      fullName: 'Large Concept Models',
      description: 'Advanced frameworks for the modeling and management of complex data relationships.',
      color: '#FBBF24' 
    },
    { 
      text: 'TGN', 
      fullName: 'Temporal Graph Networks',
      description: 'Facilitates the dynamic analysis of evolving datasets over time.',
      color: '#10B981' 
    },
    { 
      text: 'AI', 
      fullName: 'Artificial Intelligence',
      description: 'Drives intelligent predictions, decision-making, and automation processes.',
      color: '#F97316' 
    },
    { 
      text: 'KG', 
      fullName: 'Knowledge Graphs',
      description: 'Organizes data to provide enhanced contextual understanding.',
      color: '#3B82F6' 
    },
    { 
      text: 'VD', 
      fullName: 'Vector Database',
      description: 'Ensures efficient, scalable storage and retrieval of high-dimensional data for advanced search applications.',
      color: '#8B5CF6' 
    },
  ]

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const x = dimensions.width * 0.5 + Math.cos(angle) * dimensions.width * 0.35
    const y = dimensions.height * 0.5 + Math.sin(angle) * dimensions.height * 0.35
    return { x, y }
  }

  const getConnectionPath = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2
    const controlX = midX + (endY - startY) * 0.2
    const controlY = midY - (endX - startX) * 0.2
    return `M ${startX} ${startY} Q ${controlX} ${controlY}, ${endX} ${endY}`
  }

  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="bg-black rounded-3xl overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 px-4">
            <animated.div
              style={fadeIn}
              className="w-full lg:w-1/2 relative"
              ref={containerRef}
            >
              <div className="relative p-6 backdrop-blur-xl bg-black/30 rounded-2xl border border-white/10" style={{ height: `${dimensions.height + 48}px`, minHeight: '448px' }}>
                <svg
                  className="w-full h-full"
                  viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#4B5563" stopOpacity="1" />
                      <stop offset="100%" stopColor="#1F2937" stopOpacity="1" />
                    </radialGradient>
                  </defs>

                  {/* Connections */}
                  {nodes.map((node, index) => {
                    const { x, y } = getNodePosition(index, nodes.length)
                    const path = getConnectionPath(x, y, dimensions.width * 0.5, dimensions.height * 0.5)
                    const { ref, strokeDashoffset } = useAnimatedPath(path)
                    return (
                      <animated.path
                        key={index}
                        ref={ref}
                        d={path}
                        stroke={node.color}
                        strokeWidth="3"
                        fill="none"
                        filter="url(#glow)"
                        strokeDashoffset={strokeDashoffset}
                        opacity={selectedNode === null || selectedNode === node.text ? 1 : 0.3}
                      />
                    )
                  })}

                  {/* Animated data flow */}
                  {nodes.map((node, index) => {
                    const { x, y } = getNodePosition(index, nodes.length)
                    const path = getConnectionPath(x, y, dimensions.width * 0.5, dimensions.height * 0.5)
                    return (
                      <circle
                        key={`flow-${index}`}
                        r="4"
                        fill={node.color}
                        filter="url(#glow)"
                        opacity={selectedNode === null || selectedNode === node.text ? 1 : 0.3}
                      >
                        <animateMotion
                          dur="5s"
                          repeatCount="indefinite"
                          path={path}
                        />
                      </circle>
                    )
                  })}

                  {/* ScInter central node */}
                  <g filter="url(#glow)">
                    <circle
                      cx={dimensions.width * 0.5}
                      cy={dimensions.height * 0.5}
                      r={dimensions.width * 0.15}
                      fill="url(#centerGlow)"
                      stroke="#4B5563"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    <text
                      x={dimensions.width * 0.5}
                      y={dimensions.height * 0.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#E5E7EB"
                      fontSize={Math.min(dimensions.width, dimensions.height) * 0.05}
                      fontWeight="bold"
                    >
                      ScInter
                    </text>
                  </g>

                  {/* Outer nodes */}
                  {nodes.map((node, index) => {
                    const { x, y } = getNodePosition(index, nodes.length)
                    return (
                      <g 
                        key={index} 
                        filter="url(#glow)"
                        onMouseEnter={() => setHoveredNode(node.text)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(selectedNode === node.text ? null : node.text)}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle
                          cx={x}
                          cy={y}
                          r={dimensions.width * 0.06}
                          fill="#1F2937"
                          stroke={node.color}
                          strokeWidth="2"
                          className="animate-pulse"
                          opacity={selectedNode === null || selectedNode === node.text ? 1 : 0.3}
                        />
                        <text
                          x={x}
                          y={y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#E5E7EB"
                          fontSize={Math.min(dimensions.width, dimensions.height) * 0.03}
                          fontWeight="bold"
                        >
                          {node.text}
                        </text>
                      </g>
                    )
                  })}
                </svg>
              </div>
            </animated.div>
            <div className="w-full lg:w-1/2 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6">
                Unlock the Power of Interactive AI
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                ScInter's Interactive AI Platform integrates key technologies to deliver real-time, actionable insights. The system operates as follows:
              </p>
              <ul className="space-y-4">
                {nodes.map((node, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <svg className={`w-6 h-6 mt-1 flex-shrink-0`} style={{ color: node.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300 text-lg">
                      <strong style={{ color: node.color }}>{node.fullName} ({node.text}):</strong> {node.description}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <motion.p 
                className="text-gray-400 text-lg mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                These integrated components operate synergistically within the ScInter platform, delivering a comprehensive solution for real-time data processing, advanced analytics, and informed decision-making.
              </motion.p>
              {(hoveredNode || selectedNode) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 bg-gray-800 rounded-lg"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {nodes.find(node => node.text === (hoveredNode || selectedNode))?.fullName}
                  </h3>
                  <p className="text-gray-300">
                    {nodes.find(node => node.text === (hoveredNode || selectedNode))?.description}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlowDiagram

