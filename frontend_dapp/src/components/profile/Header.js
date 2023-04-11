import Image from 'next/image';
import PlaceHolder from '../../../public/assets/Image PlaceHolder.png';
import Avatar from '../../../public/assets/Avatar.png';


const Header = () => {
  return (
    <div>
      <Image src={PlaceHolder} alt='Image Placeholder' width="550px" height="300px" className='absolute  w-[1280px] h-[330px]'/>
      <Image src={Avatar} alt='' width='120px' height='120px' className='relative h-[120px] w-[120px]'   />
    </div>
  )
}

export default Header
