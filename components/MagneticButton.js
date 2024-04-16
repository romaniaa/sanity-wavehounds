import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ children }) => {
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

      // Calculate the distance between the cursor and the button's center
      const deltaX = buttonCenterX - cursorX;
      const deltaY = buttonCenterY - cursorY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      // Define the maximum distance to trigger the magnetic effect
      const maxDistance = 200;

      // Normalize the movement based on the distance
      const movementScale = Math.min(distance / maxDistance, 1);

      // Use GSAP to animate the content's movement
      gsap.to(contentElement, {
        duration: 0.3,
        x: (50 * (deltaX / distance)) * movementScale,
        y: (50 * (deltaY / distance)) * movementScale,
      });
    };

    const handleMouseOut = () => {
      // Use GSAP to animate the content's return to its original position
      gsap.to(contentElement, {
        duration: 0.3,
        x: originalPosition.x,
        y: originalPosition.y,
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseout', handleMouseOut);

    // Save the original position when the component mounts
    originalPosition.x = contentElement.offsetLeft;
    originalPosition.y = contentElement.offsetTop;

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className={'magnetic-button h-40 max-w-[200px] flex relative'} ref={buttonRef}>
      <div ref={contentRef} className={'h-50 max-w-[200px] absolute'}>
        {children}
      </div>
    </div>
  );
};

export default MagneticButton;
