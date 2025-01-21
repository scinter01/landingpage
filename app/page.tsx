"use client"

import { useState } from "react"
import { NavBar } from "../components/nav-bar"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Atom, Brain, Share, FileText, Zap, Globe, Users, Lightbulb } from "lucide-react"
import { ULogo } from "../components/u-logo"
import { Footer } from "../components/footer"
import Background from "../components/Background"
import { CurvedLines } from "../components/curved-lines"
import { motion, useScroll, useTransform } from "framer-motion"
import { SubscribeModal } from "../components/subscribe-modal"
import { UseCases } from "../components/use-cases"
import KnowledgeGraphWithErrorBoundary from "../components/KnowledgeGraph"
import FlowDiagram from "../components/FlowDiagram"
import { InteractiveMission } from "../components/InteractiveMission"

export default function Home() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main className="min-h-screen text-white relative overflow-hidden bg-gradient-to-b from-black via-purple-900/20 to-black">
      <Background />
      <CurvedLines />
      <NavBar />

      {/* Hero Section */}
      <section id="hero" className="relative flex items-center justify-center px-4 py-12 sm:py-8 mt-20 min-h-[60vh]">
        <motion.div
          className="text-center w-full max-w-6xl mx-auto bg-black/50 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ opacity }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Revolutionizing <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Scientific Discoveries
            </span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-300 mb-6 sm:mb-8 mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="sm:whitespace-nowrap">Explore insights, collaborate globally, and</span>{" "}
            <span className="sm:whitespace-nowrap">accelerate research with AI-powered platform.</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={() => setIsSubscribeOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Subscribe
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Knowledge Graph Section */}
      <section id="knowledge-graph" className="relative">
        <div className="max-w-7xl mx-auto text-center px-4">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-purple-300 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dive into the Cosmic Web of Scientific Knowledge
          </motion.h2>
          <motion.div
            className="backdrop-blur-xl bg-black/30 rounded-2xl border border-white/10 p-4 mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full h-[80vh] min-h-[400px]">
              <KnowledgeGraphWithErrorBoundary />
            </div>
          </motion.div>
          <motion.p
            className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Each node represents diverse STEM areas and communities, while the connections
            <br className="hidden md:inline" /> illustrate relationships between them, creating a dynamic and evolving
            STEM ecosystem.
          </motion.p>
        </div>
      </section>

      {/* What is ScInter? Section */}
      <section id="about" className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-md bg-opacity-90">
              What is ScInter?
            </span>
          </h2>
          <div className="backdrop-blur-xl bg-black/30 rounded-2xl border border-white/10 p-8 md:p-12">
            <div className="space-y-12">
              <div>
                <p className="text-lg text-gray-200 leading-relaxed">
                  ScInter is an advanced platform dedicated to fostering global scientific collaboration and
                  accelerating innovation. Utilizing state-of-the-art AI-driven Knowledge Graphs, Large Concept Models,
                  and Graph Neural Networks, ScInter redefines how research is accessed, analyzed, and connected.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  ScInter empowers individuals and organizations to:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Explore Complex Research</h3>
                    <p className="text-gray-300">Access actionable insights across disciplines and fields of study.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <Globe className="w-12 h-12 text-purple-400 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Facilitate Global Collaboration</h3>
                    <p className="text-gray-300">Connect with researchers, institutions, and industries worldwide.</p>
                  </div>
                  <div className="text-center space-y-4">
                    <Lightbulb className="w-12 h-12 text-purple-400 mx-auto" />
                    <h3 className="text-xl font-semibold text-white">Promote Inclusivity in Science</h3>
                    <p className="text-gray-300">Ensure equitable access to scientific knowledge and resources.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section id="features" className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-md bg-opacity-90">
              Key Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={Atom}
              title="Large Concept Model (LCM)"
              description="Discover interdisciplinary connections between scientific concepts and emerging research trends."
            />
            <FeatureCard
              icon={Brain}
              title="Dynamic Knowledge Graphs"
              description="Visualize relationships between concepts, publications, and experts using AI algorithms."
            />
            <FeatureCard
              icon={Share}
              title="Collaborative Ecosystem"
              description="Engage with a global network through real-time collaboration and discussion forums."
            />
            <FeatureCard
              icon={FileText}
              title="Simplified Knowledge Sharing"
              description="Access complex scientific research in easy-to-understand formats."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-md bg-opacity-90">
              How It Works?
            </span>
          </h2>
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Build Your Profile",
                description: "Customize your experience with your research interests and expertise.",
              },
              {
                step: 2,
                title: "Explore the Knowledge Graph",
                description: "Navigate interconnected topics and identify potential collaborators.",
              },
              {
                step: 3,
                title: "Collaborate in Real-Time",
                description: "Use AI-assisted tools for seamless global collaboration.",
              },
              {
                step: 4,
                title: "Gain Actionable Insights",
                description: "Leverage AI capabilities to identify research gaps and trends.",
              },
            ].map((item) => (
              <StepCard key={item.step} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Flow Diagram Section */}
      <FlowDiagram />

      {/* Use Cases Section */}
      <section id="use-cases" className="relative py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg backdrop-blur-md bg-opacity-90">
              Use Cases
            </span>
          </h2>
          <UseCases />
        </div>
      </section>

      {/* Join ScInter Section */}
      <section id="join" className="relative py-24 md:py-32 px-4 bg-gradient-to-b from-black to-purple-900/40">
        <motion.div
          className="max-w-5xl mx-auto text-center backdrop-blur-xl bg-white/10 rounded-2xl p-8 sm:p-12 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
            Join ScInter to Transform STEM
          </h2>
          <div className="mb-8">
            <ULogo />
          </div>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Discover new connections, collaborate globally, and accelerate scientific breakthroughs.
          </p>
          <Button
            size="lg"
            onClick={() => setIsSubscribeOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-xl rounded-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg mb-12"
          >
            Subscribe
          </Button>
          <div className="mt-12 pt-12 border-t border-white/10">
            <div className="text-center space-y-2">
              <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Vision
              </p>
              <p className="text-xl text-white">Build one reliable place for science.</p>
              <p className="text-2xl font-bold mt-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mission
              </p>
              <p className="text-xl text-white">Establish a STEM hub of people, content, products, and services.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <Toaster />
      <Footer />
      <SubscribeModal isOpen={isSubscribeOpen} setIsOpen={setIsSubscribeOpen} />
    </main>
  )
}

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="p-6 transform transition-all duration-300 hover:scale-105 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-10 h-10 text-purple-400 mb-4" />
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </motion.div>
)

const ScInterFeature = ({ icon: Icon, title, description }) => (
  <motion.div
    className="flex flex-col items-center text-center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="w-12 h-12 text-purple-400 mb-4" />
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-base text-gray-300">{description}</p>
  </motion.div>
)

const StepCard = ({ step, title, description }) => (
  <motion.div
    className="backdrop-blur-xl bg-white/5backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay: step * 0.1 }}
  >
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
        <span className="text-white font-bold text-lg">{step}</span>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
)

