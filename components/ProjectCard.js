import React, { useState } from "react";
import Cursor from "./Cursor";
// import WhImage from "./blocks/WhImage";

const ProjectCard = ({ project }) => {
  const [showImage, setShowImage] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setShowImage(true);
  };

  const handleMouseLeave = () => {
    setShowImage(false);
  };

  return (
    <>
      <div
        className="project-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2>{project.title}</h2>
        <p>{new Date(project.date).toLocaleDateString()}</p>
      </div>
      {showImage && (
        <Cursor image={project.media} cursorPosition={cursorPosition} />
      )}
    </>
  );
};

export default ProjectCard;
