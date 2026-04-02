import { useState } from "react";
import projects from "../../data/projects.json";

function WorkPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
          <h1
        style={{
          fontSize: "8vw",
          color: "var(--light-gray)",

        }}
      >
        Hannah B Finch
      </h1>
    <section style={{margin: '60px 10%'}}>


      <h1>Work</h1>

      <div>
        {["all", "dev", "design"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            variant={filter === f ? "default" : "secondary"}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
        {filtered.map((project) => (
          // later add clickability for projects, this is just sitting here for now
      <div key={project.id} onClick={() => setSelected(project)}
        style={{
          width: "100%",
          backgroundColor: "var(--dark-gray)",
          border: "5px solid black",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <img
          src={project.image}
          style={{
            width: "100%",
            border: "5px solid black",
            boxSizing: "border-box",
          }}
        ></img>
        <h2>{project.title}</h2>
        <p>{project.desc}</p>
        <span>{project.type}</span>
      </div>
        ))}
      </div>

    </section>
    </>
  );
}

export default WorkPage;
