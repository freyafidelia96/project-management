import { useRef } from "react";

export default function CreateProject({ onCancel, onSave }) {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dueDateRef = useRef(null);

  function handleSaveInputs() {
    const newProject = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      dueDate: dueDateRef.current.value,
      tasks: [],
    };
    onSave(newProject);
    onCancel();
  }

  return (
    <section className="flex flex-col mt-32 ms-8 gap-y-8 w-1/2">
      <div className="actions flex gap-4 justify-end">
        <button className="text-stone-700 text-sm font-bold" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="bg-stone-900 py-2.5 px-5 text-sm text-stone-100 rounded"
          onClick={handleSaveInputs}
        >
          Save
        </button>
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="project-title"
          className="text-stone-700 font-semibold text-sm"
        >
          TITLE
        </label>
        <input
          ref={titleRef}
          type="text"
          id="project-title"
          name="project-title"
          className="bg-stone-300 border-b-2 focus:outline-none focus:ring-0 focus:border-b-stone-900 p-1"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="project-description"
          className="text-stone-700 font-semibold text-sm"
        >
          DESCRIPTION
        </label>
        <textarea
          ref={descriptionRef}
          id="project-description"
          name="project-description"
          className="bg-stone-300 border-b-2 focus:outline-none focus:ring-0 focus:border-b-stone-900 p-1"
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <label
          htmlFor="project-duedate"
          className="text-stone-700 font-semibold text-sm"
        >
          DUE DATE
        </label>
        <input
          ref={dueDateRef}
          type="date"
          id="project-duedate"
          name="project-duedate"
          className="bg-stone-300 border-b-2 focus:outline-none focus:ring-0 focus:border-b-stone-900 p-1"
        />
      </div>
    </section>
  );
}
