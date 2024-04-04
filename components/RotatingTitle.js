import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const RotatingTitle = ({ title }) => {
  const circleRef = useRef(null);
  const titleRef = useRef(null);
  let lastScrollY = useRef(0);
  let rotation = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY.current;
      rotation.current += scrollDelta * 0.1; // Adjust rotation sensitivity as needed
      if (circleRef.current) { // Add conditional check here
        gsap.to(circleRef.current, {
          rotation: rotation.current,
          duration: 0.5,
        });
      }
      lastScrollY.current = scrollY;
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="laptop:ml-1/2 relative w-[272px]">
      <svg ref={circleRef} className="block absolute top-[-55px] left-[-62px] w-[120px] h-[120px] laptop:top-[-136px] laptop:left-[-140px] laptop:w-[272px] laptop:h-[272px]" viewBox="0 0 272 272" xmlns="http://www.w3.org/2000/svg">
        <path id="curve" d="M0,136a136,136 0 1,0 272,0a136,136 0 1,0 -272,0" fill="transparent"/>
        <text className="uppercase heading-3 tracking-[0.5em] dark:fill-light-blue light:fill-red">
          <textPath xlinkHref="#curve">
            {title}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

export default RotatingTitle;
