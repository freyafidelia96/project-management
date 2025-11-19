import Sidebar from "./components/Sidebar.jsx";
import ViewProject from "./components/ViewProject.jsx";
import BookImage from "./assets/no-projects.png";
import PROJECTS_DATA from "./ProjectData.js";
import CreateProject from "./components/CreateProject.jsx";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const isEmpty = projects.length === 0;

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || null;

  function handleAddProject() {
    setShowAddProject(true);
  }

  function handleSaveProject(project) {
    const title = (project.title || "").trim();

    if (!title) {
      alert("Project title cannot be empty.");
      return;
    }

    const id = uuidv4();
    const newProject = { ...project, id };
    console.log("New Project:", newProject);
    setProjects((prevProjects) => [...prevProjects, newProject]);
    setSelectedProjectId(id);
    setShowAddProject(false);
  }

  function handleSelectProject(project) {
    // store only the project id to avoid keeping a stale object reference
    console.log("Selected Project:", project);
    setSelectedProjectId(project.id);
  }

  function handleDeleteProject(projectId) {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
    setSelectedProjectId(null);
  }

  function handleAddTask(task, projectId) {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          const newTask = { id: uuidv4(), text: task };
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }
        return project;
      })
    );
  }

  function handleDeleteTask(taskId) {
    // return a new projects array with the task removed from each project's tasks
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        tasks: project.tasks.filter((task) => task.id !== taskId),
      }))
    );
  }

  return (
    <div className="flex h-screen relative font-roboto">
      <Sidebar
        onCreateProject={handleAddProject}
        projects={projects}
        onSelectProject={handleSelectProject}
      />
      {showAddProject ? (
        <CreateProject
          onCancel={() => setShowAddProject(false)}
          onSave={handleSaveProject}
        />
      ) : null}
      {!selectedProject && !showAddProject && (
        <div className="flex flex-col justify-center items-center gap-y-3 w-full">
          <img src={BookImage} alt="No projects" className="w-15 h-15" />
          <p className="text-2xl font-bold text-stone-600">
            No Project Selected
          </p>
          <small className="text-stone-400 text-lg">
            Select a project or get started with a new one
          </small>
          <button
            className="mt-4 bg-stone-900 text-stone-500 py-2 px-3 rounded-sm cursor-pointer"
            onClick={handleAddProject}
          >
            Create new project
          </button>
        </div>
      )}
      {!isEmpty && !!selectedProject && !showAddProject && (
        <ViewProject
          project={selectedProject}
          onDeleteProject={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}

export default App;
