import { Link } from "react-router-dom";

import "./header.css";

function Header() {
  return (
    <>
      <section
        style={{
          display: "flex",
          paddingTop: "100px",
          justifyContent: "center",
          height: "400px",
          marginBottom: "-250px",
          backgroundImage:
            "url('../../public/animations/background_banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "50% 100%",
          imageRendering: "pixelated",
          width: "100%",
          backgroundColor: "#1c1c1c",
          zIndex: "-1",
        }}
      >
        <Link to="/">
          <h1
            style={{
              fontSize: "72px",
              color: "var(--light-gray)",
              textAlign: "center",
            }}
          >
            Hannah B Finch
          </h1>
        </Link>
      </section>
    </>
  );
}

export default Header;
