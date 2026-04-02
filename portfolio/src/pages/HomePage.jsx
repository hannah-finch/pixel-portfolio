import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Assets
  const meIdle = "./src/assets/animations/me_idle_front.gif";
  const meItem = "./src/assets/animations/me_item_front.gif";
  const meWalkFront = "./src/assets/animations/me_walk_front.gif";
  const meWalkRight = "./src/assets/animations/me_walk_right.gif";
  const meWalkLeft = "./src/assets/animations/me_walk_left.gif";

  const [meGifSrc, setMeGifSrc] = useState(meIdle);

  // Movement system
  const positionRef = useRef(0);
  const direction = useRef(0);
  const isMoving = useRef(false);
  const animationRef = useRef(null);
  const lastTimeRef = useRef(0);

  // World + layers
  const worldRef = useRef(null);
  const bgRef = useRef(null);
  const midRef = useRef(null);
  const fgRef = useRef(null);
  const ffgRef = useRef(null);

  const speed = 300; // pixels per second

  const animate = (time) => {
    if (!isMoving.current) return;

    let delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    // Clamp big jumps
    if (delta > 50) delta = 50;

    const movement = speed * direction.current * (delta / 1000);
    positionRef.current += movement;

    const pos = positionRef.current;

    // Move layers (parallax)
    if (bgRef.current) {
      bgRef.current.style.transform = `translateX(${pos * 0.4}px)`;
    }
    if (midRef.current) {
      midRef.current.style.transform = `translateX(${pos * 0.6}px)`;
    }
    if (fgRef.current) {
      fgRef.current.style.transform = `translateX(${pos * 0.8}px)`;
    }
    if (ffgRef.current) {
      ffgRef.current.style.transform = `translateX(${pos}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startMoving = (dir, gif) => {
    setMeGifSrc(gif);
    direction.current = dir;

    if (animationRef.current) return;

    isMoving.current = true;
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopMoving = () => {
    setMeGifSrc(meIdle);
    isMoving.current = false;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Whole world */}
      <div
        ref={worldRef}
        style={{
          position: "absolute",
          width: "200%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      >
        {/* Background (the far hills) */}
        <div
          ref={bgRef}
          style={{
            position: "absolute",
            width: "200%",
            height: "100%",
            backgroundImage:
              "url('./src/assets/animations/background_back.png')",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
            willChange: "transform",
          }}
        />

        {/* Midground */}
        <div
          ref={midRef}
          style={{
            position: "absolute",
            width: "200%",
            height: "100%",
            backgroundImage: "url('./src/assets/animations/background.png')",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
            opacity: 0.9,
            willChange: "transform",
          }}
        />

        {/* Foreground */}
        <div
          ref={fgRef}
          style={{
            position: "absolute",
            width: "200%",
            height: "100%",
            pointerEvents: "none",
            backgroundImage:
              "url('./src/assets/animations/background_front.gif')",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
            opacity: 0.9,
            willChange: "transform",
            zIndex: "1",
          }}
        />

        {/* Very front foreground */}
        <div
          ref={ffgRef}
          style={{
            position: "absolute",
            width: "200%",
            height: "100%",
            pointerEvents: "none",
            backgroundImage:
              "url('./src/assets/animations/background_frontfront.gif')",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "center",
            opacity: 0.9,
            willChange: "transform",
            zIndex: "1",
          }}
        />
      </div>

      {/* PLAYER (look, it's a mini-me!) */}
      <div
        style={{
          position: "absolute",
          top: "47%",
        }}
      >
        <img
          src={meGifSrc}
          onMouseEnter={() => setMeGifSrc(meWalkFront)}
          onMouseLeave={() => setMeGifSrc(meIdle)}
        />
      </div>

      <h1
        style={{
          fontSize: "8vw",
          position: "absolute",
          top: "20px",
          width: "100%",
          textAlign: "center",
          color: "var(--light-gray)",
          zIndex: -1,
        }}
      >
        Hannah B Finch
      </h1>

      <h1
        style={{
          fontSize: "4vw",
          position: "absolute",
          bottom: "20px",
          color: "var(--light-gray)",
          backgroundColor: "#151515df",
          padding: "0 20px 10px",
          zIndex: 1,
        }}
      >
        Designer / Developer
      </h1>
      <div
        style={{
          position: "relative",
          zIndex: "2",
          width: "300px",
          top: "50%",
          transform: "translateY(80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            className="icon-container"
            onMouseDown={() => startMoving(1, meWalkLeft)}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            onTouchStart={() => startMoving(1, meWalkLeft)}
            onTouchEnd={stopMoving}
          >
            &lt;
          </div>

          <div
            className="icon-container"
            onMouseDown={() => startMoving(-1, meWalkRight)}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            onTouchStart={() => startMoving(-1, meWalkRight)}
            onTouchEnd={stopMoving}
          >
            &gt;
          </div>
        </div>
        <Link to="/work">
          <div
            className="button"
            onMouseEnter={() => setMeGifSrc(meItem)}
            onMouseLeave={() => setMeGifSrc(meIdle)}
          >
            Look what I made!
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
