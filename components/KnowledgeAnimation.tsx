'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Zap } from 'lucide-react'

interface Researcher {
  id: number
  x: number
  y: number
  size: number
  field: string
}

interface Connection {
  id: string
  source: Researcher
  target: Researcher
}

interface Branch {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  keyword: string
}

const scientificFields = [
  "Physics", "Chemistry", "Biology", "Computer Science", "Mathematics",
  "Neuroscience", "Environmental Science", "Astronomy", "Genetics", "Materials Science"
]

const KnowledgeAnimation: React.FC = () => {
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    // Initialize researchers
    const newResearchers = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 360 + 20,
      y: Math.random() * 260 + 20,
      size: Math.random() * 0.5 + 0.5,
      field: scientificFields[Math.floor(Math.random() * scientificFields.length)]
    }))
    setResearchers(newResearchers)

    // Create initial connections
    const newConnections = []
    for (let i = 0; i < newResearchers.length; i++) {
      for (let j = i + 1; j < newResearchers.length; j++) {
        if (Math.random() < 0.3) { // 30% chance of connection
          newConnections.push({
            id: `${i}-${j}`,
            source: newResearchers[i],
            target: newResearchers[j]
          })
        }
      }
    }
    setConnections(newConnections)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      // Create a new branch
      if (connections.length > 0) {
        const randomConnection = connections[Math.floor(Math.random() * connections.length)]
        const midX = (randomConnection.source.x + randomConnection.target.x) / 2
        const midY = (randomConnection.source.y + randomConnection.target.y) / 2
        const branchX = midX + (Math.random() - 0.5) * 60
        const branchY = midY + (Math.random() - 0.5) * 60
        const newBranch: Branch = {
          id: `branch-${Date.now()}`,
          x1: midX,
          y1: midY,
          x2: branchX,
          y2: branchY,
          keyword: `${randomConnection.source.field} + ${randomConnection.target.field}`
        }
        setBranches(prevBranches => [...prevBranches.slice(-9), newBranch])
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [connections])

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <svg className="w-full h-64 md:h-96" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          <defs>
            <radialGradient id="researcher-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          
          {connections.map((connection) => (
            <motion.line
              key={connection.id}
              x1={connection.source.x}
              y1={connection.source.y}
              x2={connection.target.x}
              y2={connection.target.y}
              stroke="url(#researcher-gradient)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: Math.random() * 2 }}
            />
          ))}

          <AnimatePresence>
            {branches.map((branch) => (
              <React.Fragment key={branch.id}>
                <motion.line
                  x1={branch.x1}
                  y1={branch.y1}
                  x2={branch.x2}
                  y2={branch.y2}
                  stroke="#22c55e"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                />
                <motion.circle
                  cx={branch.x2}
                  cy={branch.y2}
                  r="4"
                  fill="#22c55e"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.text
                  x={branch.x2 + 6}
                  y={branch.y2 + 4}
                  fill="#22c55e"
                  fontSize="8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {branch.keyword}
                </motion.text>
              </React.Fragment>
            ))}
          </AnimatePresence>

          {researchers.map((researcher) => (
            <motion.g
              key={researcher.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 1, 1, 0],
                opacity: [0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            >
              <circle
                cx={researcher.x}
                cy={researcher.y}
                r={8 * researcher.size}
                fill="url(#researcher-gradient)"
              />
              <Brain
                className="text-white"
                x={researcher.x - 8 * researcher.size}
                y={researcher.y - 8 * researcher.size}
                width={16 * researcher.size}
                height={16 * researcher.size}
              />
              <text
                x={researcher.x}
                y={researcher.y + 16 * researcher.size}
                fill="#ffffff"
                fontSize="6"
                textAnchor="middle"
              >
                {researcher.field}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>
      <motion.h3
        className="text-2xl font-bold text-center mt-8 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Global Scientific Collaboration
      </motion.h3>
      <motion.p
        className="text-center text-gray-300 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Watch as researchers from around the world connect and collaborate, forming an ever-expanding network of scientific insights and discoveries. New branches of knowledge emerge from these connections, representing breakthroughs and innovations across various fields.
      </motion.p>
    </div>
  )
}

export default KnowledgeAnimation

