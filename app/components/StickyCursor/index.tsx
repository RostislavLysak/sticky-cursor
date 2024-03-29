"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from "framer-motion";

type TPosition = {
  x: number;
  y: number;
};

type TTemplate = {
  rotate: number;
  scaleX: number;
  scaleY: number;
};

export default function index({
  stickyElement,
}: {
  stickyElement: React.MutableRefObject<HTMLDivElement | null>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cursorRef = useRef(null);
  const cursorSize = isHovered ? 60 : 20;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  };

  const rotate = (distance: TPosition) => {
    const angle = Math.atan2(distance.y, distance.x);
    animate(cursorRef.current, { rotate: `${angle}rad` }, { duration: 0 });
  };

  const manageMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    if (stickyElement.current) {
      const { left, top, width, height } =
        stickyElement.current.getBoundingClientRect();

      const center = {
        x: left + width / 2,
        y: top + height / 2,
      };

      if (isHovered) {
        const distance = { x: clientX - center.x, y: clientY - center.y };

        rotate(distance);

        const absDistance = Math.max(
          Math.abs(distance.x),
          Math.abs(distance.y)
        );
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3]);
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8]);

        scale.x.set(newScaleX);
        scale.y.set(newScaleY);

        mouse.x.set(center.x - cursorSize / 2 + distance.x * 0.1);
        mouse.y.set(center.y - cursorSize / 2 + distance.y * 0.1);
      } else {
        mouse.x.set(clientX - cursorSize / 2);
        mouse.y.set(clientY - cursorSize / 2);
      }
    }
  };

  const manageMouseOver = () => {
    setIsHovered(true);
  };

  const manageMouseLeave = () => {
    animate(
      cursorRef.current,
      { scaleX: 1, scaleY: 1 },
      { duration: 0.1, type: "spring" }
    );
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    stickyElement.current?.addEventListener("mouseover", manageMouseOver);
    stickyElement.current?.addEventListener("mouseleave", manageMouseLeave);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      stickyElement.current?.removeEventListener("mouseover", manageMouseOver);
      stickyElement.current?.removeEventListener(
        "mouseleave",
        manageMouseLeave
      );
    };
  });

  const template = ({ rotate, scaleX, scaleY }: TTemplate) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`;
  };

  return (
    <motion.div
      transformTemplate={template}
      ref={cursorRef}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      animate={{ width: cursorSize, height: cursorSize }}
      className="fixed w-[15px] h-[15px] bg-black rounded-[50%] pointer-events-none"
    />
  );
}
