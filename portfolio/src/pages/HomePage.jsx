import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  // Assets
  const meIdle = "./src/assets/animations/me_idle_front.gif";
  const meItem = "./src/assets/animations/me_item_front.gif";
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

  const speed = 400; // pixels per second
  const IMAGE_WIDTH = 4864; // width in pixels of the actual background images, super important for tiling

  // Background image assets
  const bgImg = "./src/assets/animations/background_back.png";
  const midImg = "./src/assets/animations/background.png";
  const fgImg = "./src/assets/animations/background_front.gif";
  const ffgImg = "./src/assets/animations/background_frontfront.gif";

  const createLayer = (ref, img, zIndex) => (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: `${IMAGE_WIDTH}px`,
        height: "100%",
        willChange: "transform",
        zIndex: zIndex,
        opacity: .94,
      }}
    >
      {/* LEFT tile */}
      <div
        style={{
          position: "absolute",
          width: `${IMAGE_WIDTH}px`,
          height: "100%",
          left: `-${IMAGE_WIDTH}px`,
          top: 0,
          backgroundImage: `url(${img})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* CENTER tile */}
      <div
        style={{
          position: "absolute",
          width: `${IMAGE_WIDTH}px`,
          height: "100%",
          left: 0,
          top: 0,
          backgroundImage: `url(${img})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* RIGHT tile */}
      <div
        style={{
          position: "absolute",
          width: `${IMAGE_WIDTH}px`,
          height: "100%",
          left: `${IMAGE_WIDTH}px`,
          top: 0,
          backgroundImage: `url(${img})`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );

  const animate = (time) => {
    if (!isMoving.current) return;

    let delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (delta > 50) delta = 50; // avoids big jumps

    const movement = speed * direction.current * (delta / 1000);
    positionRef.current += movement;

    const apply = (ref, multiplier) => {
      if (!ref.current) return;

      const layerWidth = IMAGE_WIDTH;

      const raw = positionRef.current * multiplier;
      const wrapped = raw % layerWidth;

      ref.current.style.transform = `translateX(${wrapped}px)`;
    };

    apply(bgRef, 0.1);
    apply(midRef, 0.6);
    apply(fgRef, 0.8);
    apply(ffgRef, 1);

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
    <>
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
        {/* World */}
        <div
          ref={worldRef}
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {createLayer(bgRef, bgImg, 0)}
          {createLayer(midRef, midImg, 0)}
          {createLayer(fgRef, fgImg, 1)}
          {createLayer(ffgRef, ffgImg, 1)}

          {/* PLAYER (look, it's a mini-me!) */}
          <img
            src={meGifSrc}
            style={{
              position: "relative",
              top: "50px",
            }}
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
    </>
  );
}

export default HomePage;
