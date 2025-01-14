'use client'

import { motion } from 'framer-motion'
import { Brain, Network, Lightbulb, Share2 } from 'lucide-react'

const steps = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Our advanced AI algorithms process and analyze scientific papers, extracting key insights and identifying potential connections across disciplines.",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: Network,
    title: "Knowledge Graph Integration",
    description: "Research findings are mapped into our dynamic knowledge graph, creating a vast network of interconnected scientific concepts and discoveries.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Lightbulb,
    title: "Pattern Recognition",
    description: "Our system identifies emerging patterns and potential breakthroughs by analyzing relationships between different research areas.",
    color: "from-pink-500 to-orange-500"
  },
  {
    icon: Share2,
    title: "Collaborative Platform",
    description: "Researchers can collaborate, share insights, and build upon each other's work in real-time, accelerating the pace of scientific discovery.",
    color: "from-orange-500 to-blue-500"
  }
]

export function HowItWorks() {
  return (
    <div className="relative">
      {/* Connected line in the background */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-gray-500 to-transparent md:hidden" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="flex flex-col items-center md:items-start p-6 backdrop-blur-xl bg-black/30 rounded-xl border border-white/10 shadow-2xl group hover:bg-black/40 transition-all duration-300">
              {/* Icon with gradient background */}
              <div className={`p-3 rounded-lg bg-gradient-to-r ${step.color} mb-4 transform group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-gray-300 text-center md:text-left">
                {step.description}
              </p>

              {/* Connecting line for desktop */}
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden md:block absolute top-1/2 left-full w-12 h-px bg-gradient-to-r from-blue-500 to-transparent transform -translate-y-1/2" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

