export default function NoProjectSelected({ onAddProject }) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
      <img src={BookImage} alt="No projects" className="w-15 h-15" />
      <p className="text-2xl font-bold text-stone-600">No Project Selected</p>
      <small className="text-stone-400 text-lg">
        Select a project or get started with a new one
      </small>
      <button
        className="mt-4 bg-stone-900 text-stone-500 py-2 px-3 rounded-sm cursor-pointer"
        onClick={onAddProject}
      >
        Create new project
      </button>
    </div>
  );
}
