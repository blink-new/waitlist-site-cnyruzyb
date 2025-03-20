'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setErrorMessage('Please enter your email')
      setStatus('error')
      return
    }
    
    setStatus('loading')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Join the Future
          </h1>
          <p className="text-lg md:text-xl mb-12 text-text/80">
            Be among the first to experience our revolutionary platform.
            Join our waitlist today and get early access when we launch.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-surface rounded-2xl p-8 shadow-xl backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-background border border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold transition transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </button>
            </form>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-green-500"
              >
                Thanks for joining! We'll be in touch soon.
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-red-500"
              >
                {errorMessage}
              </motion.div>
            )}
          </motion.div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '1000+', label: 'People Waiting' },
              { number: '24', label: 'Days to Launch' },
              { number: '100%', label: 'Excitement' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="p-6 rounded-xl bg-surface/50 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-text/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}