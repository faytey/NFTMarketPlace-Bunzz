import React from 'react'

const NFTSpecs = () => {
  return (
    <div>
        <div className="flex-1 flex flex-col py-[100px] px-0 items-start justify-start gap-[40px]">
        <div className="w-[460px] flex flex-col items-start justify-start">
        <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
            <div className="self-stretch flex flex-row gap-[12px] items-center justify-start">
            <img
                className="relative w-7 h-7 shrink-0 rounded-lg"
                alt=""
                src="assets/CherryGirl.png"
            />
            <div className="flex-1 relative leading-[110%] capitalize font-normal">
            CherryGirl
            </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start text-3xl">
            <div className="self-stretch relative leading-[160%] capitalize font-bold">
                <p>CherryGirl</p>
                <span className="self-stretch leading-[160%] font-bold text-xl text-slate-400">#444444</span>
            </div>
            </div>
        </div>
        </div>
        <div className="w-[330px] flex flex-col items-start justify-start gap-[30px] text-base text-background">
        <div className="self-stretch flex flex-col items-start justify-start gap-[15px]">
            <div className="self-stretch bg-text box-border h-[46px] shrink-0 flex flex-row py-4 px-5 items-center justify-start gap-[12px] border-b-2 border-solid border-gray-300">
            <img
                className="relative w-7 h-7 shrink-0 rounded-full"
                alt=""
                src="assets/CherryGirl.png"
            />
            <div className="flex-1 flex-col relative leading-[140%]">
                <span className="leading-3 font-light text-slate-400">Current owner</span>
                <p className="self-stretch leading-[160%] font-bold text-xl">0x4bb62...48aa</p>
            </div>
            </div>
            <div className="self-stretch bg-text box-border h-[65px] shrink-0 flex  py-4 px-5 items-center justify-start gap-[12px] border-b-2 border-solid">
            <div className=" flex flex-1 relative leading-[140%] flex-col items-start gap-3">
            <span className='leading-3 font-light text-slate-400 tracking-wide'>Price:</span>
            <span className=' leading-4 font-semibold text-2xl tracking-wide'> 0.006 eth</span>
            </div>

            </div>
            <div className="self-stretch rounded-xl bg-text box-border h-[92px] shrink-0 flex flex-col py-4 px-5 items-start justify-start gap-[12px] border-[2px] border-solid">
            <div className="flex-1 relative leading-[140%]">
            Description:
            </div>

            </div>
            
        </div>
        <div className="self-stretch rounded-xl bg-call-to-action h-[46px] shrink-0 flex flex-row py-0 px-[50px] box-border items-center justify-center gap-[12px] text-center text-text">
            <img
            className="relative w-5 h-5 shrink-0 hidden"
            alt=""
            src="/rocketlaunch3.svg"
            />
            <div className="relative leading-[140%] font-semibold">
            Create account
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default NFTSpecs
