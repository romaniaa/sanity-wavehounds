import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({ link, title }) => {
  const buttonRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    const originalPosition = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const cursorX = e.clientX;
      const cursorY = e.clientY;

      const deltaX = buttonCenterX - cursorX;
      const deltaY = buttonCenterY - cursorY;

      // Calculate the distance between the cursor and the button's center
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      // Define the maximum distance to trigger the magnetic effect
      const maxDistance = 100;
      if (distance < maxDistance) {
        // Calculate the new position for the text
        const newTextX = (10 * deltaX) / distance;
        const newTextY = (10 * deltaY) / distance;

        // Use GSAP to animate the text's movement
        gsap.to(text, {
          duration: 0.3,
          x: newTextX,
          y: newTextY,
        });
      }
    };

    const handleMouseOut = () => {
      // Use GSAP to animate the text's return to its original position
      gsap.to(text, {
        duration: 0.3,
        x: originalPosition.x,
        y: originalPosition.y,
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseout', handleMouseOut);

    // Save the original position when the component mounts
    originalPosition.x = text.offsetLeft;
    originalPosition.y = text.offsetTop;

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className="magnetic-button h-40 max-w-[200px] flex relative" ref={buttonRef}>
      <span ref={textRef} className="h-50 max-w-[200px] absolute">
        {title}
      </span>
    </div>
  );
};

export default MagneticButton;
