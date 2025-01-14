'use client'

import React, { FC, useState, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'

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
  // Fade-in animation for the container
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  })

  // Nodes for the diagram
  const nodes = [
    { text: 'TGN', path: 'M 250 200 L 180 100', color: '#10B981' },
    { text: 'LCM', path: 'M 200 250 L 100 150', color: '#FBBF24' },
    { text: 'AI', path: 'M 300 250 L 400 150', color: '#F97316' },
    { text: 'KG', path: 'M 200 300 L 150 400', color: '#3B82F6' },
    { text: 'VD', path: 'M 300 300 L 350 400', color: '#8B5CF6' },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl">
      <animated.div
        style={fadeIn}
        className="relative w-full max-w-5xl mx-auto p-12"
      >
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Diagram */}
          <div className="flex-1 relative min-h-[500px]">
            <svg
              className="w-full h-full"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Animated Paths */}
              {nodes.map((node, index) => {
                const { ref, strokeDashoffset } = useAnimatedPath(node.path)
                return (
                  <animated.path
                    key={index}
                    ref={ref}
                    d={node.path}
                    stroke={node.color}
                    strokeWidth="2"
                    fill="none"
                    filter="url(#glow)"
                    strokeDashoffset={strokeDashoffset}
                  />
                )
              })}

              {/* Central Node */}
              <rect
                x="200"
                y="200"
                width="100"
                height="100"
                fill="#1F2937"
                stroke="#4B5563"
                strokeWidth="2"
                className="animate-pulse"
              />
              <text
                x="250"
                y="250"
                textAnchor="middle"
                dominantBaseline="central"
                fill="#E5E7EB"
                fontSize="24"
                fontWeight="bold"
              >
                Scinter
              </text>

              {/* End Nodes */}
              {nodes.map((node, index) => {
                const [x, y] = node.path
                  .split('L')[1]
                  .trim()
                  .split(' ')
                  .map(Number)
                return (
                  <g key={index}>
                    <rect
                      x={x - 30}
                      y={y - 30}
                      width="60"
                      height="60"
                      fill="#1F2937"
                      stroke={node.color}
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#E5E7EB"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {node.text}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 space-y-6">
            <span className="text-purple-400 text-lg">
              Interactive AI Platform
            </span>
            <h2 className="text-4xl font-bold text-white">
              Unlock the Power of Interactive AI
            </h2>
            <p className="text-gray-400 text-xl">
              With LCM, TGN, and AI-driven knowledge graphs, seamlessly
              connecting data through Vectordb for smarter, real-time insights
              and decision-making.
            </p>
            <div className="space-y-4">
              {[
                'Large Concept Models & Knowledge Graphs',
                'Real-time Data Processing & Analysis',
                'Advanced Vector Database Integration',
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500">
                    <path
                      fill="currentColor"
                      d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"
                    />
                  </svg>
                  <span className="text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default FlowDiagram
