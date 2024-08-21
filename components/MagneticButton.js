import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children, resetToCenter }) => {
  const buttonRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    const contentElement = contentRef.current;

    const originalPosition = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const deltaX = buttonCenterX - cursorX;
      const deltaY = buttonCenterY - cursorY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      const maxDistance = 10;
      const movementScale = Math.min(distance / maxDistance, 1);

      gsap.to(contentElement, {
        duration: 0.3,
        x: (50 * (deltaX / distance)) * movementScale,
        y: (50 * (deltaY / distance)) * movementScale,
      });
    };

    const handleMouseOut = () => {
      let targetX = originalPosition.x;
      let targetY = originalPosition.y;

      if (resetToCenter) {
        const buttonRect = button.getBoundingClientRect();
        const contentRect = contentElement.getBoundingClientRect();

        targetX = (buttonRect.width - contentRect.width) / 2;
        targetY = (buttonRect.height - contentRect.height) / 2;
      }

      gsap.to(contentElement, {
        duration: 0.3,
        x: targetX,
        y: targetY,
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseout', handleMouseOut);

    originalPosition.x = contentElement.offsetLeft;
    originalPosition.y = contentElement.offsetTop;

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseout', handleMouseOut);
    };
  }, [resetToCenter]);

  return (
    <div className="magnetic-button h-auto flex max-w-[150px] justify-center w-full relative cursor-pointer transform-all duration-300" ref={buttonRef}>
      <div ref={contentRef} className="h-30 w-[150px] absolute flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;
