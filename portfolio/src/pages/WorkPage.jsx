import { useState } from "react";
import projects from "../../data/projects.json";

function WorkPage() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <>
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

      <div>
        {filtered.map((project) => (
          // later add clickability for projects, this is just sitting here for now
          <div key={project.id} onClick={() => setSelected(project)}>
            <div>
              <img src={project.image} style={{ width: "100px" }} />
              <div>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <span>{project.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default WorkPage;
