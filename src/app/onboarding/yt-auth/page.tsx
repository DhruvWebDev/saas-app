"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { CardSpotlight } from '@/components/ui/card-spotlight';
export default function Page() {
  const { data: session, status } = useSession();

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-white"
        >
          <Loader2 size={30} className="animate-spin" />
          <p className="text-xl font-semibold">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-grid-white/[0.2] relative">
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      
      <CardSpotlight className="w-full max-w-md">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-6 p-8"
        >
          <motion.div variants={childVariants} className="text-center">
            <Youtube size={60} className="text-red-500 mb-4 mx-auto" />
            <h2 className="text-3xl font-bold text-white mb-2">
              {session ? 'Welcome Back!' : 'Connect with YouTube'}
            </h2>
            <p className="text-gray-400">
              {session 
                ? `Signed in as ${session.user?.name}`
                : 'Sign in with your Google account to access YouTube features'}
            </p>
          </motion.div>
          
          <motion.div variants={childVariants}>
            {session ? (
              <Button
                onClick={() => signOut()}
                variant="destructive"
                size="lg"
                className="flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button
                onClick={() => signIn('google')}
                variant="default"
                size="lg"
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600"
              >
                <LogIn size={20} />
                <span>Sign in with Google</span>
              </Button>
            )}
          </motion.div>

          {session && (
            <motion.div 
              variants={childVariants}
              className="text-center text-sm text-gray-400 mt-4"
            >
              <p>You now have access to YouTube features.</p>
              <p>Start managing your content and collaborating with editors!</p>
            </motion.div>
          )}
        </motion.div>
      </CardSpotlight>
    </div>
  );
}