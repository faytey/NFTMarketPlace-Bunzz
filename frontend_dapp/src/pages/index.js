import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="mt-6 " style = {{backgroundImage:"linear-gradient(20deg, blue, green, red)", transition:"3s ease-in-out"}}>
      <div className="grid grid-cols-2 pb-6" id="firstHomeSection" style={{transition:"3s ease-in-out"}}>
      
      <div className = "grid-cols-1" style={{backgroundColor:"", paddingLeft:"23%",
      paddingRight:"10%", paddingTop:"5%", paddingBottom:"5%",}}>
      <h1 style={{fontSize:"350%", fontWeight:"bold"}}>Discover Digital Art & Collect Nfts</h1>
      <p style={{fontSize:"120%",}}>Nft Marketplace Ui Created With Anima For Figma. Collect, Buy And Sell Art From More Than 20k Nft Artists.</p>
      <button class="mt-8 font-bold py-4 px-8 rounded-full"
      style={{transition:"1s ease-in-out",background:"#a244ff",}} id="homeButton">
      Get Started
      </button>
      <p className="grid grid-cols-3 mt-8" style={{fontSize:"120%",}} >
      <p className="grid-cols-1">
      <span style={{fontSize:"120%", fontWeight:"bold"}}>240k+</span><br></br>
      Total Sale
      </p>
      <p className="grid-cols-1">
      <span style={{fontSize:"120%", fontWeight:"bold"}}>100k+</span><br></br>
      Auctions
      </p>
      <p className="grid-cols-1">
      <span style={{fontSize:"120%", fontWeight:"bold"}}>240k+</span><br></br>
      Artists
      </p>
      </p>
      </div>

      <div className = "grid-cols-1 " style={{backgroundColor:"", paddingLeft:"10%", 
      paddingRight:"23%", paddingTop:"5%", paddingBottom:"5%"}}>
      <img src="././assets/benz.jpg" className = "" id="homepagefirstPic" style={{transition:"5s ease-in-out",
       boxShadow:"15px 15px 10px 2px rgba(20,20,20,0.9)", animation:"homepicanimation2 3s alternate infinite",borderRadius:"" }} />
      </div>
      
      </div>



    </main>
  )
}
