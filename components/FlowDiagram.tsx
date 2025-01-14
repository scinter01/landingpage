'use client'

import { FC } from 'react'

const FlowDiagram: FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 opacity-5" />
      
      <div className="relative w-full max-w-5xl mx-auto p-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left side - Diagram */}
          <div className="flex-1 relative min-h-[500px]">
            {/* Central FlowiseAI Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-64 h-20">
                {/* Gradient border */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600" />
                {/* Inner content */}
                <div className="absolute inset-0 rounded-xl bg-gray-900 flex items-center justify-center overflow-hidden">
                  {/* Wave pattern overlay */}
                  <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <pattern id="wave" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M 0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100%" height="100%" fill="url(#wave)" />
                    </svg>
                  </div>
                  <span className="text-2xl font-semibold text-white relative">FlowiseAI</span>
                </div>
                {/* Shadow */}
                <div className="absolute -bottom-4 inset-x-4 h-4 bg-gradient-to-b from-purple-500/20 to-transparent rounded-full blur-sm" />
              </div>
            </div>

            {/* Connected Nodes */}
            {[
              {
                position: 'top-0 right-1/4 -translate-x-1/2',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-400">
                    <path fill="currentColor" d="M10 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm0-12a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                  </svg>
                ),
                borderColor: 'from-emerald-400 to-emerald-600'
              },
              {
                position: 'top-12 left-0',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-yellow-400">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                ),
                borderColor: 'from-yellow-400 to-yellow-600'
              },
              {
                position: 'top-32 right-0',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-orange-400">
                    <path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                  </svg>
                ),
                borderColor: 'from-orange-400 to-orange-600'
              },
              {
                position: 'bottom-0 left-1/4',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-blue-400">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z" />
                  </svg>
                ),
                borderColor: 'from-blue-400 to-blue-600'
              },
              {
                position: 'bottom-12 right-1/4 translate-x-full',
                icon: (
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-purple-400">
                    <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                  </svg>
                ),
                borderColor: 'from-purple-400 to-purple-600'
              }
            ].map((node, index) => (
              <div key={index} className={`absolute ${node.position}`}>
                <div className="relative w-16 h-16">
                  {/* Gradient border */}
                  <div className={`absolute -inset-[1px] rounded-lg bg-gradient-to-r ${node.borderColor}`} />
                  {/* Inner content */}
                  <div className="absolute inset-0 rounded-lg bg-gray-900 flex items-center justify-center">
                    {node.icon}
                  </div>
                  {/* Shadow */}
                  <div className="absolute -bottom-2 inset-x-2 h-2 bg-gradient-to-b from-gray-500/20 to-transparent rounded-full blur-sm" />
                </div>
                {/* Connection line */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-[2px] bg-blue-500/50 blur-[0.5px]" />
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Content */}
          <div className="flex-1 space-y-6">
            <span className="text-purple-400 text-lg">Interactive AI Platform</span>
            <h2 className="text-4xl font-bold text-white">Unlock the power of Interactive AI</h2>
            <p className="text-gray-400 text-xl">
              with LCM, TGN, and AI-driven knowledge graphs, seamlessly connecting data through Vectordb for smarter, real-time insights and decision-making.
            </p>
            <div className="space-y-4">
              {[
                'Large Concept Models & Knowledge Graphs',
                'Real-time Data Processing & Analysis',
                'Advanced Vector Database Integration'
              ].map((text, index) => (
                <div key={index} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-500">
                    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  <span className="text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowDiagram

