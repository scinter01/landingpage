'use client'

import { useState, useRef, useEffect } from 'react'
import { NavBar } from '../components/nav-bar'
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { ULogo } from '../components/u-logo'
import { Footer } from '../components/footer'
import StarMeshBackground from '@/components/StarMeshBackground'
import { motion } from 'framer-motion'
import { SubscribeModal } from '../components/subscribe-modal'
import KnowledgeGraph from '../components/KnowledgeGraph'
import { AnimatedText } from '@/components/AnimatedText'
import FlowDiagram from '@/components/FlowDiagram'
import KnowledgeAnimation from '@/components/KnowledgeAnimation'
import { Atom, Rocket, Users, Globe, Network, BookOpen, TrendingUp, Lightbulb } from 'lucide-react'

const SectionContainer = ({ children, className = "" }) => (
  <div className={`container mx-auto px-4 py-20 text-center ${className}`}>
    {children}
  </div>
)

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
    <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
      {children}
    </span>
  </h2>
)

const Features = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {[
      { icon: Atom, title: "STEM Education", description: "Advancing scientific knowledge through innovative learning approaches" },
      { icon: Rocket, title: "Innovation", description: "Pushing boundaries with cutting-edge educational technologies" },
      { icon: Users, title: "Community", description: "Building a global network of STEM enthusiasts and educators" },
      { icon: Globe, title: "Global Impact", description: "Making STEM education accessible worldwide" }
    ].map((feature, index) => (
      <div key={index} className="flex flex-col items-center text-center p-6 backdrop-blur-md bg-slate-900/50 rounded-xl transition-all duration-300 hover:bg-slate-900/70 hover:transform hover:scale-105">
        <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-300">{feature.description}</p>
      </div>
    ))}
  </div>
)

const UseCases = () => {
  const cases = [
    { icon: Network, title: "Researcher Collaboration", description: "Foster global collaboration with ease. ScInter connects researchers worldwide, enabling them to share ideas, co-author groundbreaking studies, and collaborate seamlessly, no matter the distance." },
    { icon: BookOpen, title: "Accessible Knowledge for All", description: "Simplifying complex research for a wider audience. ScInter distills scientific papers into clear, digestible insights, making knowledge accessible to students, professionals, and anyone with a thirst for learning." },
    { icon: TrendingUp, title: "Trend Prediction in Research", description: "Stay ahead of the curve with data-driven predictions. ScInter helps researchers anticipate emerging trends and interdisciplinary opportunities, positioning them at the forefront of their fields." },
    { icon: Lightbulb, title: "Real-World Impact", description: "Turning research into reality. ScInter connects scientific breakthroughs to practical solutions, driving innovation and impact in industries, communities, and global challenges." },
    { icon: Users, title: "Interactive Learning & Mentorship", description: "Facilitating meaningful learning experiences. ScInter enables peer-to-peer engagement, expert mentorship, and collaborative workshops, empowering users to grow and share knowledge in a dynamic environment." }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {cases.map((useCase, index) => (
        <motion.div 
          key={index} 
          className="p-6 backdrop-blur-xl bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/10 hover:transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <useCase.icon className="w-12 h-12 text-purple-400 mb-4 mx-auto" />
          <h3 className="text-lg font-bold mb-2 text-white text-center">{useCase.title}</h3>
          <p className="text-sm text-gray-300 text-center">{useCase.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [selectedNode, setSelectedNode] = useState(null)
  const graphRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (graphRef.current && !graphRef.current.contains(event.target)) {
        setSelectedNode(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <StarMeshBackground />
      <NavBar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center px-4 py-24 sm:py-32 min-h-screen">
        <motion.div 
          className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full text-center p-8 sm:p-12">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Revolutionizing Scientific Discoveries and Collaborations
            </motion.h1>
            <AnimatedText text="Explore insights, collaborate globally, and accelerate scientific research with AI-powered Large Concept Models, Knowledge Graphs, and Graph Neural Networks." />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8"
            >
              <Button 
                size="lg"
                onClick={() => setIsSubscribeOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Subscribe
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* What is ScInter? Section */}
      <section className="py-24 bg-gradient-to-b from-black/50 to-blue-900/30">
        <SectionContainer>
          <SectionTitle>What is ScInter?</SectionTitle>
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden p-8">
            <h3 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Unifying Science, Technology, and Collaboration
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              ScInter is a global platform that bridges the gap between researchers, professionals, and enthusiasts worldwide. Powered by AI-driven Knowledge Graphs, Large Concept Models, and Graph Neural Networks, ScInter enables users to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Explore complex research with ease</li>
              <li>Find collaborators globally</li>
              <li>Make science accessible to all</li>
            </ul>
          </div>
        </SectionContainer>
      </section>

      {/* Knowledge Animation Section */}
      <section className="py-24 bg-gradient-to-b from-black/50 to-blue-900/30">
        <SectionContainer>
          <SectionTitle>Global Scientific Collaboration</SectionTitle>
          <KnowledgeAnimation />
        </SectionContainer>
      </section>

      {/* How It Works Section */}
      <SectionContainer id="how-it-works">
        <SectionTitle>How It Works ?</SectionTitle>
        <Features />
      </SectionContainer>

      {/* Flow Diagram Section */}
      <section className="bg-black/40 py-20">
        <SectionContainer>
          <SectionTitle>Interactive AI Platform</SectionTitle>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <FlowDiagram />
          </div>
        </SectionContainer>
      </section>

      {/* Features Section */}
      <SectionContainer id="features">
        <SectionTitle>Key Features</SectionTitle>
        <Features />
      </SectionContainer>

      {/* Knowledge Network Section */}
      <SectionContainer>
        <SectionTitle>Knowledge graph</SectionTitle>
        <div className="h-[500px] bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl overflow-hidden relative">
          <KnowledgeGraph onNodeClick={setSelectedNode} />
        </div>
      </SectionContainer>

      {/* Use Cases Section */}
      <SectionContainer id="use-cases">
        <SectionTitle>User case</SectionTitle>
        <UseCases />
      </SectionContainer>

      {/* Join ScInter Section */}
      <section id="join" className="py-24 bg-gradient-to-b from-black/50 to-blue-900/30">
        <SectionContainer>
          <motion.div 
            className="max-w-4xl mx-auto text-center backdrop-blur-xl bg-black/40 rounded-xl p-8 sm:p-12 border border-white/10 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight">
              Join the Future of STEM

            </h2>
            <div className="mb-8">
              <ULogo />
            </div>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              "Discover new connections, collaborate globally, and accelerate scientific breakthroughs with ScInter."

            </p>
            <Button 
              size="lg"
              onClick={() => setIsSubscribeOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Subscribe
            </Button>
          </motion.div>
        </SectionContainer>
      </section>

      <Toaster />
      <Footer />
      <SubscribeModal isOpen={isSubscribeOpen} setIsOpen={setIsSubscribeOpen} />
    </main>
  )
}

