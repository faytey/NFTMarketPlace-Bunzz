import Link from "next/link";
import { memo } from "react";


const ButtonTemplate = memo((
  {
    ButtonName,
    ButtonLink,
    onButtonClick,
  }
) => {

  return (
    <div className="rounded-xl box-border h-[60px] flex flex-row py-0 px-[30px] items-center justify-center gap-[12px] border-[2px] border-solid border-[#A259FF]">
        <Link className="relative font-semibold" onClick={onButtonClick} href={ButtonLink}>
        {ButtonName}
        </Link>
    </div>
  );
});

export default ButtonTemplate;
