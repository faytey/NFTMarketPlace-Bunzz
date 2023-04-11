import Header from '../../src/components/profile/Header';
import Detail from '../../src/components/profile/Detail';
import Market from '../../src/components/profile/Market';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  return (
    <div className="">
      <Header />
      <Detail />
      <Market />
    </div>
  )
}
