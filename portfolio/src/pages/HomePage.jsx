import { useState } from "react";
import { Link } from "react-router-dom"
import "./home.css";

function HomePage() {
  const meIdle = "./src/assets/animations/me_idle_front.gif";
  const meItem = "./src/assets/animations/me_item_front.gif";
  const meWalkFront = "./src/assets/animations/me_walk_front.gif";
  const meWalkSide = "./src/assets/animations/me_walk_side.gif";
  const meWalkBack = "./src/assets/animations/me_walk_back.gif";

  const [meGifSrc, setMeGifSrc] = useState(meIdle);

  return (
    <>
      <section className="home">
        <h1>Home</h1>
        <Link to='/work'>
        <div
          className="button"
          onMouseEnter={() => setMeGifSrc(meItem)}
          onMouseLeave={() => setMeGifSrc(meIdle)}
          >
          Look what I made!
        </div>
          </Link>
        <img
          src={meGifSrc}
          onMouseEnter={() => setMeGifSrc(meWalkFront)}
          onMouseLeave={() => setMeGifSrc(meIdle)}
        ></img>
      </section>
    </>
  );
}

export default HomePage;
