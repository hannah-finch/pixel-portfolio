import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const meIdle = "./src/assets/animations/me_idle_front.gif";
  const meItem = "./src/assets/animations/me_item_front.gif";
  const meWalkFront = "./src/assets/animations/me_walk_front.gif";
  const meWalkRight = "./src/assets/animations/me_walk_right.gif";
  const meWalkLeft = "./src/assets/animations/me_walk_left.gif";

  const [meGifSrc, setMeGifSrc] = useState(meIdle);

  const positionRef = useRef(0);
  const isHolding = useRef(false);
  const direction = useRef(1);
  const animationRef = useRef(null);

  const bgRef = useRef(null);
  const frontBgRef = useRef(null);

  const speed = 5;
  const lastTimeRef = useRef(0);

const animate = (time) => {
  if (!isHolding.current) return;

  let delta = time - lastTimeRef.current;
  lastTimeRef.current = time;

  // Clamp to avoid jumpiness
  if (delta > 50) delta = 50;

  positionRef.current += speed * direction.current * (delta / 16);

  if (bgRef.current) {
    bgRef.current.style.backgroundPosition = `${positionRef.current}px 50%`;
  }
  if (frontBgRef.current) {
    frontBgRef.current.style.backgroundPosition = `${positionRef.current}px 50%`;
  }

  animationRef.current = requestAnimationFrame(animate);
};

 const startMovingLeft = () => {
  setMeGifSrc(meWalkLeft);
  direction.current = 1;

  if (animationRef.current) return;

  isHolding.current = true;
  lastTimeRef.current = performance.now();
  animationRef.current = requestAnimationFrame(animate);
};

const startMovingRight = () => {
  setMeGifSrc(meWalkRight);
  direction.current = -1;

  if (animationRef.current) return;

  isHolding.current = true;
  lastTimeRef.current = performance.now();
  animationRef.current = requestAnimationFrame(animate);
};

const stopMoving = () => {
  setMeGifSrc(meIdle);
  isHolding.current = false;

  if (animationRef.current) {
    cancelAnimationFrame(animationRef.current);
    animationRef.current = null;
  }
};

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <section
      ref={bgRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('./src/assets/animations/background.gif')",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "0px 50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "80px",
      }}
    >
      <h1
        style={{
          fontSize: "8vw",
          position: "absolute",
          top: "20px",
          color: "var(--light-gray)",
          zIndex: "-1",
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
          zIndex: "1",
        }}
      >
        Designer / Developer
      </h1>

      <div
        className="flex-row center"
        style={{ gap: "40px", position: "absolute", marginTop: "112px" }}
      >
        <div
          className="icon-container"
          onMouseDown={startMovingLeft}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={startMovingLeft}
          onTouchEnd={stopMoving}
          style={{zIndex: '1'}}
        >
          &lt;
        </div>

        <img
          src={meGifSrc}
          onMouseEnter={() => setMeGifSrc(meWalkFront)}
          onMouseLeave={() => setMeGifSrc(meIdle)}
        />

        <div
          className="icon-container"
          onMouseDown={startMovingRight}
          onMouseUp={stopMoving}
          onMouseLeave={stopMoving}
          onTouchStart={startMovingRight}
          onTouchEnd={stopMoving}
          style={{zIndex: '1'}}
        >
          &gt;
        </div>
      </div>

      <div
        ref={frontBgRef}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage:
            "url('./src/assets/animations/background_front.gif')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "0px 50%",
          position: "absolute",
        }}
      />

      <Link to="/work">
        <div
          className="button"
          onMouseEnter={() => setMeGifSrc(meItem)}
          onMouseLeave={() => setMeGifSrc(meIdle)}
          style={{ transform: "translateY(200px)" }}
        >
          Look what I made!
        </div>
      </Link>
    </section>
  );
}

export default HomePage;