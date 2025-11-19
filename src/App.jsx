import Sidebar from "./components/Sidebar.jsx";
import ViewProject from "./components/ViewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
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
        <NoProjectSelected onAddProject={handleAddProject} />
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
