// import { Inter } from 'next/font/google'
// import Navbar from './Navbar'
import Footer from "./Footer";
import Nav from "./Nav";

// const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="pt-24">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
