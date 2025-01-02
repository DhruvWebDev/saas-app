import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { YOUTUBE_SCOPES } from '@/lib/auth';
import { encrypt, decrypt } from '@/lib/encryption';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile ' + YOUTUBE_SCOPES.join(' ')
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log('account', account);
        try {
          // Encrypt the access token before storing it
          const encryptedToken = encrypt(account.access_token!);
          token.accessToken = encryptedToken;
          token.accessTokenExpires = account.expires_at! * 1000; // Convert to milliseconds
          token.refreshToken = encrypt(account.refresh_token!);
        } catch (error) {
          console.error('Error encrypting tokens:', error);
          // If encryption fails, don't store the tokens
          token.accessToken = null;
          token.refreshToken = null;
        }
        console.log('jwt', token);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.accessTokenExpires = token.accessTokenExpires as number;
        session.refreshToken = token.refreshToken as string;
      }
      console.log('session', session);
      return session;
    }
  },
  // Increase the session max age to match the token expiration
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});

export { handler as GET, handler as POST };