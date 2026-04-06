import { useState, useRef } from "react";

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
    <div
      key={project.id}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "26px",
      }}
    >
      {/* IMAGE CONTAINER */}
      <div
        style={{
          width: "100%",
          aspectRatio: "5/4",
          borderRadius: "20px",
          boxShadow: "5px 5px 15px var(--dark-shadow)",
          overflow: "hidden",
          position: "relative",
          marginBottom: "20px",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* IMAGE */}
        <img
          src={project.images[currentImage]}
          alt={project.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* TYPE TAG */}
        <span
          style={{
            position: "absolute",
            right: "10px",
            top: "10px",
            backgroundColor: "var(--dark-gray)",
            color: "white",
            padding: "10px 20px",
            fontWeight: "bold",
            fontSize: "11px",
            opacity: ".7",
            borderRadius: "5px",
          }}
        >
          {project.type}
        </span>

        {/* ARROWS */}
        {project.images.length > 1 && (
          <>
            <button onClick={prevImage} style={arrowStyle("left")}>
              ‹
            </button>
            <button onClick={nextImage} style={arrowStyle("right")}>
              ›
            </button>
          </>
        )}

        {/* DOTS */}
        {project.images.length > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {project.images.map((_, index) => (
              <div
                key={index}
                onClick={() => changeImage(index)}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentImage ? "white" : "#ffffff66",
                  cursor: "pointer",
                  transition: "all 0.2s",
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
  );
}

/* Arrow styling */
const arrowStyle = (side) => ({
  position: "absolute",
  top: "50%",
  [side]: "10px",
  transform: "translateY(-50%)",
  backgroundColor: "#00000080",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  cursor: "pointer",
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default ProjectCard;
