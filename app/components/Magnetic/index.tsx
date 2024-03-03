import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps extends React.PropsWithChildren {}

const Magnetic = ({ children }: MagneticProps) => {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: any) => {
    const { clientX, clientY } = e;

    const magneticRect = ref?.current?.getBoundingClientRect();
    const middleX = clientX - (magneticRect?.left + magneticRect?.width / 2);
    const middleY = clientY - (magneticRect?.top + magneticRect?.height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      className="relative"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 350, damping: 5, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
