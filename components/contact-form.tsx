'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { submitContactForm } from '@/app/actions/subscribe'
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

export function ContactForm() {
  const [topic, setTopic] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('topic', topic)
    formData.append('message', message)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setTopic('')
        setName('')
        setEmail('')
        setMessage('')
        setShowThankYou(true)
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
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {!isFormVisible ? (
        <button
          onClick={() => setIsFormVisible(true)}
          className="text-teal-500 hover:text-teal-600 font-bold"
        >
          Contact Us
        </button>
      ) : (
        <div className="space-y-4 text-white">
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <h2 className="text-2xl font-bold mb-4">Please fill out the form below and we'll be in touch:</h2>
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-full bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Technical Support</SelectItem>
                <SelectItem value="privacy">Privacy Policy</SelectItem>
                <SelectItem value="terms">Terms of Service</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </form>
          <Button
            onClick={() => setIsFormVisible(false)}
            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </Button>
        </div>
      )}
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
              <h2 className="text-3xl font-bold text-white mb-4">Thank You for Contacting Us!</h2>
              <p className="text-gray-300 mb-6">
                We have received your message and will respond to you shortly. In the meantime, we invite you to explore ScInter's advancements in scientific collaboration.
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
