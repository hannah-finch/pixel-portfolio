import { useState, useRef } from "react";
import "./projectCard.css";

function ProjectCard(props) {
  const project = props.p;

  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const changeImage = (newIndex) => {
    setFade(false); // fade out
    setTimeout(() => {
      setCurrentImage(newIndex);
      setFade(true); // fade in
    }, 150);
  };

  const nextImage = () => {
    const next =
      currentImage === project.images.length - 1 ? 0 : currentImage + 1;
    changeImage(next);
  };

  const prevImage = () => {
    const prev =
      currentImage === 0 ? project.images.length - 1 : currentImage - 1;
    changeImage(prev);
  };

  /* Swipe handlers for mobile */
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) nextImage(); // swipe left
    if (distance < -50) prevImage(); // swipe right
  };

  return (
    <div key={project.id}>
      {/* IMAGE CONTAINER */}
      <div
        className="image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE */}
        <img
          src={project.images[currentImage]}
          alt={project.title}
          style={{
            opacity: fade ? 1 : 0,
          }}
        />

        {/* TYPE TAG */}
        <span className="type-tag">{project.type}</span>

        {/* ARROWS */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="arrow"
              style={{ left: "10px" }}
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="arrow"
              style={{ right: "10px" }}
            >
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {project.images.length > 1 && (
          <div className="dot-container">
            {project.images.map((_, index) => (
              <div
                key={index}
                onClick={() => changeImage(index)}
                className="dot"
                style={{
                  backgroundColor:
                    index === currentImage ? "white" : "#ffffff66",
                }}
              />
            ))}
          </div>
        )}

        {/* BUTTON */}
        {project.btnLink && (
          <a
            href={project.btnLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              bottom: "35px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <div className="button-2">{project.btnTxt}</div>
          </a>
        )}
      </div>
      {/* text container */}
      <div className="text-container">
        <h2>{project.title}</h2>

        <div
          style={{
            width: "100%",
            border: "1px solid var(--light-gray)",
            borderLeft: "none",
            borderRight: "none",
            padding: "16px 0px",
          }}
        >
          <p style={{ fontSize: "14px", lineHeight: "1.2" }}>{project.desc}</p>
        </div>

        <p style={{ color: "white", lineHeight: "1.5" }}>{project.details}</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {project.tech.map((item, index) => (
            <span key={index} className="tech">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
