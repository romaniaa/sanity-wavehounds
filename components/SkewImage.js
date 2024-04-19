import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SkewImage = ({ children }) => {
  useEffect(() => {
    const elements = React.Children.toArray(children);

    elements.forEach((element) => {
      const domElement = element.ref?.current;
      if (!domElement) return;

      let lastVelocity = 0;

      ScrollTrigger.create({
        trigger: domElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate({ getVelocity }) {
          const velocity = getVelocity();
		  console.log('velocity', velocity)
          if (Math.abs(velocity) > 500) {
            gsap.to(domElement, {
              skewY: `${velocity / 600}deg`
            });
            lastVelocity = velocity;
          } else if (Math.abs(lastVelocity) > 500) {
            gsap.to(domElement, {
              skewY: 0
            });
            lastVelocity = 0;
          }
        }
      });

      // Set velocity to 0 when reaching footer or bottom of viewport
      ScrollTrigger.create({
        trigger: domElement,
        start: 'bottom bottom', // Trigger when the bottom of the element hits the bottom of the viewport
        onEnter: () => {
          lastVelocity = 0; // Reset velocity to 0
        }
      });
    });

    // Cleanup ScrollTrigger instances when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
    };
  }, [children]);

  return <div>{children}</div>;
};

export default SkewImage;
