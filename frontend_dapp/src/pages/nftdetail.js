import { useCallback } from "react";
import { useRouter } from "next/router";

const NFTDetail = () => {
  const router = useRouter();
  const { imageIds, imageTitles } = router.query;

  const onNavLogoClick = useCallback(() => {
    router.push("/");
  }, [router]);


  const onButtonContainer1Click = useCallback(() => {
    window.open(
      "https://www.animaapp.com/?utm_source=figma-samples&utm_campaign=figma-nftmarket&utm_medium=figma-samples"
    );
  }, []);

  return (
    <div className="relative bg-background w-full h-[1125px] flex flex-col items-start justify-start text-left text-base text-text font-h3-work-sans">
      <div className="self-stretch bg-background flex flex-row items-center justify-start gap-[60px] text-32xl pl-14">
        <img
          className="self-stretch flex-1 relative max-w-full overflow-hidden max-h-full object-cover rounded-lg"
          alt=""
          src={imageIds}
        />
        <div className="flex-1 flex flex-col py-[100px] px-0 items-start justify-start gap-[40px]">
          <div className="w-[460px] flex flex-col items-start justify-start">
            <div className="self-stretch flex flex-col items-start justify-start gap-[20px]">
              <div className="self-stretch flex flex-row gap-[12px] items-center justify-start">
                <img
                  className="relative w-7 h-7 shrink-0 rounded-lg"
                  alt=""
                  src={imageIds}
                />
                <div className="flex-1 relative leading-[110%] capitalize font-semibold">
                  {imageTitles}
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start text-3xl">
                <div className="self-stretch relative leading-[160%] capitalize font-bold">
                  {imageTitles}
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
                  src={imageIds}
                />
                <div className="flex-1 flex-col relative leading-[140%]">
                  <span className="leading-3 font-light text-slate-400">Current owner</span>
                  <p className="self-stretch leading-[160%] font-bold text-xl">0x4bb62...48aa</p>
                </div>
              </div>
              <div className="self-stretch rounded-xl bg-text box-border h-[46px] shrink-0 flex flex-col py-4 px-5 items-center justify-start gap-[12px] border-[1px] border-solid border-caption-label-text">
                <span>Price</span>
                <div className="flex-1 relative leading-[140%]">
                  {imageTitles}
                </div>
                <span>eth</span>
                <img
                  className="relative w-5 h-5 shrink-0 hidden"
                  alt=""
                  src="/eyeslash.svg"
                />
              </div>
              <div className="self-stretch rounded-xl bg-text box-border h-[46px] shrink-0 flex flex-row py-4 px-5 items-center justify-start gap-[12px] border-[1px] border-solid border-caption-label-text">
                <img
                  className="relative w-5 h-5 shrink-0"
                  alt=""
                  src="/lockkey.svg"
                />
                <div className="flex-1 relative leading-[140%]">Password</div>
                <img
                  className="relative w-5 h-5 shrink-0 hidden"
                  alt=""
                  src="/eyeslash.svg"
                />
              </div>
              <div className="self-stretch rounded-xl bg-text box-border h-[46px] shrink-0 flex flex-row py-4 px-5 items-center justify-start gap-[12px] border-[1px] border-solid border-caption-label-text">
                <img
                  className="relative w-5 h-5 shrink-0"
                  alt=""
                  src="/lockkey.svg"
                />
                <div className="flex-1 relative leading-[140%]">
                  Confirm Password
                </div>
                <img
                  className="relative w-5 h-5 shrink-0 hidden"
                  alt=""
                  src="/eyeslash.svg"
                />
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
      <div className="self-stretch bg-background-secondary flex flex-col py-10 px-[195px] items-center justify-start gap-[30px] text-3xl font-caption-space-mono">
      </div>
    </div>
  );
};

export default NFTDetail;
