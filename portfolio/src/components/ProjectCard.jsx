function ProjectCard(props) {
  const project = props.p;
  return (
    <>
      <div
        key={project.id}
        style={{
          width: "100%",
          // padding: "20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          position: 'relative'
        }}
      >
        
        <img
          src={project.image}
          style={{
            width: "100%",
            boxSizing: "border-box",
            borderRadius: "20px",
            boxShadow: "5px 5px 15px var(--dark-shadow)",
            marginBottom: "20px",
          }}
        ></img>
        <span style={{position: 'absolute', right: '10px', top: "10px", backgroundColor: "var(--dark-gray)", color: 'white', padding: '10px 20px', fontWeight: 'bold', fontSize: '11px', opacity: '.7', borderRadius: '5px'}}>{project.type}</span>
        <h2>{project.title}</h2>
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--light-gray)",
            width: "100%",
          }}
        ></div>
        <p style={{ fontSize: "14px", margin: '0 34px', alignSelf: "center", textAlign: 'center' }}>
          {project.desc}
        </p>
        <div
          style={{
            height: "1px",
            backgroundColor: "var(--light-gray)",
            width: "100%",
          }}
        ></div>

        <p style={{ color: "white", lineHeight: "1.5" }}>{project.details}</p>

        <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
        {project.tech.map((item, index) => (
          <span key={index} className="type">{item}</span>
        ))}
        </div>

      </div>
    </>
  );
}

export default ProjectCard;
