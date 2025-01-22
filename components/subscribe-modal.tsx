'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MultiSelect } from "@/components/ui/multi-select" // Import a multi-select component
import { useToast } from "@/components/ui/use-toast"
import { subscribeUser } from '@/app/actions/subscribe'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

const INTEREST_FIELDS = [
  "Scientific Research",
  "AI in Science",
  "Collaboration & Networking",
  "Public Engagement in Science",
  "Knowledge Graphs & AI Tools",
  "Innovation in Scientific Platforms",
  "STEM Fields", // Key item for conditional rendering
  "Events & Webinars",
  "Research Opportunities",
  "Educational Resources",
  "General Updates"
]

const STEM_FIELDS = [
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics",
  "Computer Science",
  "Engineering",
  "Environmental Science",
  "Neuroscience",
  "Biotechnology",
  "Data Science",
  "Other"
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
  const [stemFields, setStemFields] = useState<string[]>([]) // Multi-select for STEM fields
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Combine all interests, including STEM fields if "STEM Fields" is selected
    const combinedInterests = [
      ...interests,
      ...(interests.includes("STEM Fields") ? stemFields : []) // Add STEM fields if applicable
    ]

    // Create FormData instance
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('interest', combinedInterests.join(', ')) // Combine interests into a string

    try {
      const result = await subscribeUser(formData) // Send FormData to the backend

      if (result.success) {
        setShowThankYou(true)
        setTimeout(() => {
          setShowThankYou(false)
          handleClose()
        }, 5000)
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
    setName('')
    setEmail('')
    setInterests([])
    setStemFields([])
  }

  return (
    <>
      <Dialog open={isOpen && !showThankYou} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white mb-4 text-center">
              Stay Connected with ScInter
            </DialogTitle>
            <DialogDescription className="text-gray-300 text-center">
              Subscribe for updates and join the revolution in STEM collaboration and discovery.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MultiSelect
              options={INTEREST_FIELDS.map(field => ({
                label: field,
                value: field,
              }))}
              selected={interests}
              onChange={setInterests}
              placeholder="Select Areas of Interest"
              className="bg-white/10 border-white/20 text-white"
            />
            {interests.includes("STEM Fields") && (
              <MultiSelect
                options={STEM_FIELDS.map(field => ({
                  label: field,
                  value: field,
                }))}
                selected={stemFields}
                onChange={setStemFields}
                placeholder="Select STEM Fields"
                className="bg-white/10 border-white/20 text-white"
              />
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
          >
            <div className="relative sm:max-w-md bg-gradient-to-br from-purple-900/80 to-blue-900/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white mb-4">Thank You for Joining ScInter!</h2>
              <p className="text-gray-300 mb-6">
                You're now part of the revolution to make science more collaborative and accessible. Stay tuned for updates and your early access invite! Together, we're shaping the future of discovery.
              </p>
              <button
                onClick={() => setShowThankYou(false)}
                className="absolute top-2 right-2 text-white hover:text-red-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
