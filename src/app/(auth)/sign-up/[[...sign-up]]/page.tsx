
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp forceRedirectUrl={process.env.NEXT_CLERK_REDIRECT_URL!}/>;
}