import { auth } from "@/auth";
import Link from 'next/link'
import SignOut  from "../signout/page";
export default async function TestPage() {
   const session = await auth();
 
  if (!session?.user) return  <Link href="/pages/signin">Please Sign In</Link>
  return(
    <div>
        <h1>TEst Page</h1>
        {JSON.stringify(session)}
        <SignOut/>
    </div>
  )
}