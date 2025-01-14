'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setIsOpen(false)
    }
  }

  return (
    <motion.nav
      className={`fixed w-full z-40 top-0 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <AnimatedLogo />
        <div className="hidden md:flex items-center space-x-4">
          <NavButton href="#features" onClick={() => scrollToSection('features')}>Key Features</NavButton>
          <NavButton href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</NavButton>
          <NavButton href="#use-cases" onClick={() => scrollToSection('use-cases')}>Use Cases</NavButton>
          <NavButton onClick={() => setIsSubscribeOpen(true)}>Subscribe</NavButton>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-4 space-y-2">
              <NavButton mobile href="#features" onClick={() => scrollToSection('features')}>Key Features</NavButton>
              <NavButton mobile href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</NavButton>
              <NavButton mobile href="#use-cases" onClick={() => scrollToSection('use-cases')}>Use Cases</NavButton>
              <NavButton mobile onClick={() => setIsSubscribeOpen(true)}>Subscribe</NavButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isSubscribeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-lg font-bold">Subscribe</h2>
            <p className="mt-2">Join our mailing list for updates!</p>
            <button
              onClick={() => setIsSubscribeOpen(false)}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.nav>
  )
}

const AnimatedLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  const atomVariants = {
    idle: { scale: 1 },
    animate: { scale: [1, 1.2, 1], transition: { duration: 0.5 } },
  }

  const electronVariants = {
    idle: { rotate: 0 },
    animate: { rotate: 360, transition: { duration: 2, ease: "linear", repeat: Infinity } },
  }

  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        className="relative"
        onHoverStart={() => setIsAnimating(true)}
        onHoverEnd={() => setIsAnimating(false)}
        onClick={() => setIsAnimating(true)}
      >
        <motion.div
          variants={atomVariants}
          animate={isAnimating ? "animate" : "idle"}
        >
          <div className="text-purple-400 font-bold text-2xl">⚛️</div>
        </motion.div>
        <motion.div
          className="absolute top-0 left-0 w-full h-full border-2 border-purple-400 rounded-full"
          variants={electronVariants}
          animate="animate"
        />
      </motion.div>
      <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
        ScInter
      </span>
    </Link>
  )
}

interface NavButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  mobile?: boolean;
  href?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ children, onClick, mobile = false, href }) => (
  <button
    onClick={(e) => {
      e.preventDefault()
      if (href) {
        const targetId = href.replace('#', '')
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      if (onClick) onClick()
    }}
    className={`${
      mobile ? 'block w-full text-left' : ''
    } px-4 py-2 text-base text-gray-200 hover:text-purple-400 hover:bg-white/10 rounded-lg transition-colors duration-300`}
  >
    {children}
  </button>
)
