import { Inter } from 'next/font/google'
import Navbar from './Navbar'
import Footer from './Footer'


const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  return (
    <div>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}
