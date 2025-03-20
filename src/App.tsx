import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle2, XCircle } from 'lucide-react'
import { validateEmail } from './lib/utils'

function App() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email')
      return
    }

    setStatus('loading')
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text">
              Join the Waitlist
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-12">
              Be the first to experience our revolutionary platform. Sign up now and get early access.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                disabled={status === 'loading' || status === 'success'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="mt-4 w-full md:w-auto md:absolute md:right-2 md:top-2 px-6 py-2 md:py-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : status === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 mx-auto" />
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-red-400 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-green-400 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>You're on the list! We'll be in touch soon.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">1000+</div>
              <div className="text-slate-300">People Waiting</div>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
              <div className="text-slate-300">Support</div>
            </div>
            <div className="p-6 rounded-lg bg-white/5 border border-white/10">
              <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-slate-300">Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default App