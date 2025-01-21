'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { subscribeUser } from '@/app/actions/subscribe'
import { motion } from 'framer-motion'
import { MultiSelect } from "@/components/ui/multi-select"
import { Brain, Globe, Users, CheckCircle } from 'lucide-react'

const INTEREST_FIELDS = [
  "Scientific Research",
  "AI in Science",
  "Collaboration & Networking",
  "Public Engagement in Science",
  "Knowledge Graphs & AI Tools",
  "Innovation in Scientific Platforms",
  "STEM Subjects",
  "Events & Webinars",
  "Research Opportunities",
  "Educational Resources",
  "General Updates"
]

const STEM_SUBJECTS = [
  "Biology",
  "Chemistry",
  "Physics",
  "Engineering",
  "Mathematics",
  "Computer Science",
  "Environmental Science",
  "Health Sciences"
]

export function SubscribeModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [stemSubjects, setStemSubjects] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('interests', interests.join(', '))
    if (interests.includes('STEM Subjects')) {
      formData.append('stem_subjects', stemSubjects.join(', '))
    }

    try {
      const result = await subscribeUser(formData)
      
      if (result.success) {
        setShowForm(false)
        // Reset form fields
        setName('')
        setEmail('')
        setInterests([])
        setStemSubjects([])
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Subscription error:', error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setShowForm(true)
    setName('')
    setEmail('')
    setInterests([])
    setStemSubjects([])
    setIsLoading(false)
  }

  const handleSubscribeAgain = () => {
    setShowForm(true)
    setName('')
    setEmail('')
    setInterests([])
    setStemSubjects([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/network-bg.svg')] opacity-10 z-0"></div>
        <div className="relative z-10 p-6">
          {showForm ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-white mb-2 text-center">
                  Join the ScInter Community
                </DialogTitle>
                <DialogDescription className="text-gray-300 text-center max-w-sm mx-auto">
                  Be part of the revolution in scientific collaboration and discovery.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <Input
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <MultiSelect
                  options={INTEREST_FIELDS.map(field => ({
                    label: field,
                    value: field.toLowerCase().replace(/ /g, '-')
                  }))}
                  selected={interests}
                  onChange={setInterests}
                  placeholder="Select Areas of Interest"
                  className="bg-white/10 border-white/20 text-white"
                />
                {interests.includes('stem-subjects') && (
                  <MultiSelect
                    options={STEM_SUBJECTS.map(subject => ({
                      label: subject,
                      value: subject.toLowerCase().replace(/ /g, '-')
                    }))}
                    selected={stemSubjects}
                    onChange={setStemSubjects}
                    placeholder="Select STEM Subjects"
                    className="bg-white/10 border-white/20 text-white"
                  />
                )}
                <div className="flex justify-center w-full">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
                </div>
              </form>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <FeatureItem icon={Brain} text="AI-Powered Research" />
                <FeatureItem icon={Globe} text="Global Network" />
                <FeatureItem icon={Users} text="Collaborative Science" />
              </div>
            </>
          ) : (
            <ThankYouMessage onClose={handleClose} onSubscribeAgain={() => setShowForm(true)} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const FeatureItem = ({ icon: Icon, text }) => (
  <div className="flex items-center space-x-2 text-white">
    <Icon className="w-5 h-5 text-blue-400" />
    <span className="text-sm">{text}</span>
  </div>
)

const ThankYouMessage: React.FC<{ onClose: () => void, onSubscribeAgain: () => void }> = ({ onClose, onSubscribeAgain }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
      </motion.div>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-white mb-4"
      >
        Thank You!
      </motion.h2>
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-white mb-6"
      >
        We're excited to have you join the ScInter community. Get ready for groundbreaking insights and collaborations!
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-x-4"
      >
        <Button
          onClick={onSubscribeAgain}
          className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition-colors"
        >
          Subscribe Again
        </Button>
        <Button
          onClick={onClose}
          className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
        >
          Close
        </Button>
      </motion.div>
    </motion.div>
  )
}

