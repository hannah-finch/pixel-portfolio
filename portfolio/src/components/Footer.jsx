import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "60px",
            boxShadow: "5px 5px 15px var(--dark-shadow)",
            marginTop: '100px'
          }}
        >

          <Link to="/">
          <img
            src="../../public/animations/me_computer.gif"
            style={{ width: "200px"}}
          ></img>
          </Link>
        </section>
    </>
  );
}

export default Footer;
