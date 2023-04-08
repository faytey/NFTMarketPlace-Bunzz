import { Inter } from 'next/font/google'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
  return (
    <main className="flex justify-between text-center p-3">
      <div className="text-3xl font-bold">
        <Link href={"/"}>BUNZZ</Link>
      </div>
      <div>
        <ul className='space-x-7 text-lg'>
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
          <Link href={"/contactus"}>Contact Us</Link>
          <Link href={"/marketplace"}>Market Place</Link>
          <Link href={"/profile"}>Profile</Link>
        </ul>
      </div>
      <ConnectButton/>
    </main>
  )
}
