import { useRef } from "react";

export default function Project({
  project,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
}) {
  const formmatedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const taskInputRef = useRef(null);

  function handleAddTask() {
    const task = taskInputRef.current.value;
    if (task.trim() === "") return;
    onAddTask(task, project.id);
    taskInputRef.current.value = "";
  }

  return (
    <section className="flex flex-col mt-32 ms-8 gap-y-2 w-1/2">
      <div className="flex justify-between items-center">
        <h1 className="text-stone-900 font-bold text-2xl">{project.title}</h1>
        <button
          className="text-stone-950 cursor-pointer"
          onClick={() => onDeleteProject(project.id)}
        >
          Delete
        </button>
      </div>
      <small className="text-stone-500 mb-4 text-base">{formmatedDate}</small>
      <p className="pb-2 border-b-3 border-stone-300">
        <h3 className="w-1/2 leading-12">{project.description}</h3>
      </p>
      <h2 className="text-stone-900 font-semibold text-2xl mt-3">Tasks</h2>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="focus:ring-0 focus:outline-none bg-stone-200 p-1 w-1/3"
          ref={taskInputRef}
        />
        <button className="cursor-pointer" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div className="tasks bg-stone-100 rounded py-5 px-3 mt-6">
        {project.tasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center py-2">
            <p className="text-stone-700">{task.text}</p>
            <button
              className="cursor-pointer"
              onClick={() => onDeleteTask(task.id)}
            >
              Clear
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
