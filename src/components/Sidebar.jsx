export default function Sidebar({
  onCreateProject,
  projects,
  onSelectProject,
}) {
  function handleSelectProject(project) {
    onSelectProject(project);
  }

  return (
    <aside className="bg-stone-950 h-full w-1/5 mt-8 rounded-r-2xl flex flex-col pt-20 gap-y-8 ps-8 pe-4">
      <p className="text-stone-50 font-bold text-xl">YOUR PROJECTS</p>

      <div
        className="bg-stone-800 text-stone-400 text-sm px-5 py-3 w-fit rounded-sm cursor-pointer"
        onClick={onCreateProject}
      >
        + Add Project
      </div>

      <div className="projects text-stone-400 flex flex-col gap-y-3">
        {projects.map((project) => (
          <p
            className="cursor-pointer"
            onClick={() => handleSelectProject(project)}
            key={project.title}
          >
            {project.title}
          </p>
        ))}
      </div>
    </aside>
  );
}
