import React, { useEffect, useState } from 'react';

const ScrollTitle = ({ title }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollDirection(currentPosition > scrollPosition ? 'right' : 'left');
      setScrollPosition(currentPosition);
      setIsScrolling(true);
    };

    const handleScrollEnd = () => {
      setIsScrolling(false);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, [scrollPosition]);

  const calculateSkewAngle = () => {
    if (isScrolling) {
      if (scrollDirection === 'right') {
        return `${-scrollPosition * 0.1}deg`; // Adjust the multiplier for the skew effect
      } else if (scrollDirection === 'left') {
        return `${scrollPosition * 0.1}deg`; // Adjust the multiplier for the skew effect
      }
    }
    return '0deg'; // Set skew to 0 when not scrolling
  };

  const titleStyle = {
    transform: `translateX(${scrollPosition}px) skewX(${calculateSkewAngle()})`,
    transition: 'transform 0.2s', // Optional: Add a smooth transition
  };

  return (
    <div className="scroll-title-container">
      <h1 className="scroll-title" style={titleStyle}>
        {title}
      </h1>
    </div>
  );
};

export default ScrollTitle;
