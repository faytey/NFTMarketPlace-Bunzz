import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Footer() {
  return (
    <div className='text-center text-lg m-0 p-3'>
        <p>Web3Bridge &copy; 2023</p>
    </div>
  )
}
