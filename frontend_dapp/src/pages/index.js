import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="mt-6 " style = {{backgroundImage:"linear-gradient(20deg, blue, green, red)"}}>
      <div className="grid grid-cols-2">
      
      <div className = "grid-cols-1" style={{backgroundColor:"", paddingLeft:"23%", 
      paddingRight:"10%", paddingTop:"5%", paddingBottom:"5%",}}>
      <h1 style={{fontSize:"350%", fontWeight:"bold"}}>Discover Digital Art & Collect Nfts</h1>
      <p style={{fontSize:"120%",}}>Nft Marketplace Ui Created With Anima For Figma. Collect, Buy And Sell Art From More Than 20k Nft Artists.</p>
      </div>
      <div className = "grid-cols-1" style={{backgroundColor:"", paddingLeft:"10%", 
      paddingRight:"23%", paddingTop:"5%", paddingBottom:"5%"}}>
      <img src="././assets/benz.jpg" style={{transition:"5s ease-in-out",
       boxShadow:"15px 15px 10px 2px rgba(20,20,20,0.9)", animation:"homepicanimation 5s alternate infinite",
       animation:"homepicanimation2 3s alternate infinite", }} />
    
      </div>
      
      </div>
    </main>
  )
}
