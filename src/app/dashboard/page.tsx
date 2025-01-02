"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, LogOut, Loader2, User, Mail } from 'lucide-react';

export default function AuthPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* Background with grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20" />
      
      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 -top-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -right-4 -bottom-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute left-1/2 -bottom-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Content */}
      <Card className="w-full max-w-md z-10 bg-black/50 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {status === 'loading' ? 'Loading...' : (session ? 'Welcome Back!' : 'Sign In to VidSync')}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {session ? 'Manage your account and videos' : 'Connect with your YouTube account to get started'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === 'loading' ? (
            <div className="flex items-center justify-center space-x-2">
              <Loader2 size={24} className="animate-spin text-white" />
              <span className="text-white">Loading...</span>
            </div>
          ) : session ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={session.user?.image || ''} />
                  <AvatarFallback>{session.user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold text-white">{session.user?.name}</h2>
                  <p className="text-gray-400 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => signOut()}
                variant="destructive"
                className="w-full"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => signIn('google')}
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-100"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign in with Google
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}