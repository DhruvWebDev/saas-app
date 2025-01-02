"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function Page() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center space-x-2">
        <Loader2 size={20} className="animate-spin" />
        <Typography variant="body1">Loading...</Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Typography variant="h4" className="font-bold">
        {session ? 'Welcome Back!' : 'Please Sign In'}
      </Typography>
      {session ? (
        <Button
          onClick={() => signOut()}
          variant="destructive"
          className="flex items-center space-x-2"
        >
          <LogOut size={20} />
          <Typography variant="body1">Sign Out</Typography>
        </Button>
      ) : (
        <Button
          onClick={() => signIn('google')}
          variant="primary"
          className="flex items-center space-x-2"
        >
          <LogIn size={20} />
          <Typography variant="body1">Sign in with Google</Typography>
        </Button>
      )}
    </div>
  );
}
