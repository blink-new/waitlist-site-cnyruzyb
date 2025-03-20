'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ArrowRight } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    
    setStatus('loading');
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            top: '20%',
            left: '30%',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            top: '50%',
            right: '20%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Join the Waitlist
          </h1>
          <p className="text-xl text-slate-300 mb-12">
            Be the first to experience our revolutionary platform. Sign up now and get early access.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <ArrowRight className="w-6 h-6" />
                )}
              </button>
            </div>
            
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 mt-2"
                >
                  {error}
                </motion.p>
              )}
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 mt-2"
                >
                  You're on the list! We'll be in touch soon.
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { number: '1000+', label: 'People Waiting' },
              { number: '24/7', label: 'Support' },
              { number: '100%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-slate-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}