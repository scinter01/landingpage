'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { subscribeUser } from '@/app/actions/subscribe'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

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
  const [interest, setInterest] = useState('')
  const [customInterest, setCustomInterest] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('interest', interest === 'other' ? customInterest : interest)

    try {
      const result = await subscribeUser(formData)

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
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setName('')
    setEmail('')
    setInterest('')
    setCustomInterest('')
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
            <Select value={interest} onValueChange={setInterest}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Area of Interest" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white rounded-lg shadow-md">
                {STEM_FIELDS.map((field) => (
                  <SelectItem key={field} value={field.toLowerCase()}>
                    {field}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {interest === 'other' && (
              <Input
                placeholder="Specify your area of interest"
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
