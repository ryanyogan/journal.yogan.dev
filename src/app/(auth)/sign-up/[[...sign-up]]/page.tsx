import { SignUp } from "@clerk/nextjs";

export const runtime = "edge";

export default function Page() {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />;
}
