import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const meIdle = "./src/assets/animations/me_idle_front.gif";
  const meItem = "./src/assets/animations/me_item_front.gif";
  const meWalkFront = "./src/assets/animations/me_walk_front.gif";
  const meWalkRight = "./src/assets/animations/me_walk_right.gif";
  const meWalkLeft = "./src/assets/animations/me_walk_left.gif";
  const meWalkBack = "./src/assets/animations/me_walk_back.gif";

  const [meGifSrc, setMeGifSrc] = useState(meIdle);
  const [position, setPosition] = useState(0);
  const isHolding = useRef(false);
  const direction = useRef(1); // 1 = right, -1 = left
  const animationRef = useRef(null);

  const speed = 10; //pixels per frame

  const animate = () => {
    if (isHolding.current) {
      setPosition((prev) => prev + speed * direction.current);
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const startMovingLeft = () => {
    setMeGifSrc(meWalkLeft);
    direction.current = 1;
    if (!isHolding.current) {
      isHolding.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const startMovingRight = () => {
    setMeGifSrc(meWalkRight);
    direction.current = -1;
    if (!isHolding.current) {
      isHolding.current = true;
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const stopMoving = () => {
    setMeGifSrc(meIdle);
    isHolding.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <>
      <section
        className="home"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('./src/assets/animations/background.gif')",
          backgroundRepeat: "repeat-x",
          backgroundPosition: `${position}px 50%`,
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
            zIndex: "-1"
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
          }}
        >
          Designer / Developer
        </h1>

        <Link to="/work">
          <div
            className="button"
            onMouseEnter={() => setMeGifSrc(meItem)}
            onMouseLeave={() => setMeGifSrc(meIdle)}
          >
            Look what I made!
          </div>
        </Link>
        <div className="flex-row center" style={{gap: '40px'}}>
          <div
            className="icon-container"
            onMouseDown={startMovingLeft}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            onTouchStart={startMovingLeft}
            onTouchEnd={stopMoving}
          >
            &lt;
          </div>
          <img
            src={meGifSrc}
            onMouseEnter={() => setMeGifSrc(meWalkFront)}
            onMouseLeave={() => setMeGifSrc(meIdle)}
          ></img>
          <div
            className="icon-container"
            onMouseDown={startMovingRight}
            onMouseUp={stopMoving}
            onMouseLeave={stopMoving}
            onTouchStart={startMovingRight}
            onTouchEnd={stopMoving}
          >
            &gt;
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
