import { forwardRef } from "react";

import Magnetic from "@/app/components/Magnetic";

const Header = forwardRef(function index(
  props,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="fixed flex w-full justify-end box-border cursor-pointer mix-blend-difference z-[1]">
      <Magnetic>
        <div className='relative flex flex-col gap-2 p-[30px] pointer-events-none before:block before:content-[""] before:w-[30px] before:h-0.5 before:mix-blend-difference before:bg-white after:block after:content-[""] after:w-[30px] after:h-0.5 after:mix-blend-difference after:bg-white'>
          <div
            ref={ref}
            className="absolute left-0 top-0 w-full h-full pointer-events-auto hover:scale-[3]"
          />
        </div>
      </Magnetic>
    </div>
  );
});

export default Header;
