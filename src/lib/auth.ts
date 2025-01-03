import { OAuth2Client } from 'google-auth-library';

export const YOUTUBE_SCOPES = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube'
];

export const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.NEXTAUTH_URL
);
//https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=703151048291-4ustcieu1o407bghaelt56u1rpi7cpfu.apps.googleusercontent.com&scope=openid%20email%20profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fgoogle&state=Cu_ebvY0JzNdqBOnKUGW5gEA7KNdnZx9fEZT0ISQSWU&code_challenge=KJnD5OS3l668ItQzYf9MXeAakJt97cmll2T9kN6wF88&code_challenge_method=S256&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow
