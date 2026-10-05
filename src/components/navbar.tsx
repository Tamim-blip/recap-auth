'use client'

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";


export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname()
  const router = useRouter()

  const {data : session} = useSession()

  const HandleSignOut = async() => {

    await signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/sign-in"); // redirect to login page
    },
  },
});

  }

  const NavLinks = <>
  <li>
            <Link href="#">Features</Link>
          </li>
         {
            session?.user && <>
             <li>
            <Link href="#" className="font-medium text-accent" aria-current="page">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
            </>
         }
  </>


const Links = <>
<div className="hidden items-center gap-4 md:flex">
         {
            session?.user ? <>

         <p>WellCome {session.user.name}</p>
         <Button onClick={HandleSignOut}>Sign out</Button>
            </> : <>
             <Link href="/sign-in">{pathName === '/sign-in' ? <Button>Sign In</Button> : "Sign In"}</Link>
            <Link href="/sign-up">{pathName === '/sign-up' ? <Button>Sign Up</Button> : "Sign Up"}</Link>
            </>
         }
        </div>
</>

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            {/* <Logo /> */}
            <p className="font-bold">ACME</p>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          {/*  */}

          {NavLinks}


          {/*  */}
        </ul>

        {Links}
        
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {NavLinks}
            {Links}
          </ul>
        </div>
      )}
    </nav>
  );
}