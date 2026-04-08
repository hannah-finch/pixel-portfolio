import { useState } from "react";
import projects from "../../data/projects.json";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

function WorkPage() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
      <Header></Header>

      <section style={{ margin: "0 10%"}}>
        <h1>Some things I've made:</h1>

        <div style={{ display: "flex", gap: "6px", margin: "12px 0", alignItems: 'center' }}>
          <span style={{ fontWeight: "bold" }}>Filter: &nbsp;</span>
          {["all", "dev", "design"].map((f) => (
            <div
              className="filter-btn"
              key={f}
              onClick={() => setFilter(f)}
              variant={filter === f ? "default" : "secondary"}
            >
              {f}
            </div>
          ))}
        </div>

        <div className="project-grid"
        >
          {filtered.map((project) => (
            <ProjectCard p={project}></ProjectCard>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default WorkPage;
