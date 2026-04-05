import { Link } from "react-router-dom";

function Header() {
  return (
    <>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "50px",
            boxShadow: "5px 5px 15px var(--dark-shadow)",
            marginBottom: '100px'
          }}
        >
          <Link to="/">
          <h1
            style={{
              fontSize: "9vw",
              color: "var(--dark-gray)",
              // position: "absolute",
              // zIndex: "-1",
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
