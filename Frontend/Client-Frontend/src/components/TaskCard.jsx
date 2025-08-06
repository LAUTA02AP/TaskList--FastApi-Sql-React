import { useNavigate } from "react-router-dom";

import { updateTask } from "../api/services";

function TaskCard({ task }) {
  const navigate = useNavigate(); //esto es para direcionar el id
  return (
    <div
      className="bg-zinc-950 p-4
        hover:cursor-pointer hover:bg-gray-950"
      onClick={() => {
        navigate(`/tasks/${task.id}`);
      }}
    >
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">{task.title}</h2>

        <button
          onClick={async (e) => {
            e.stopPropagation();
            const res = await updateTask(task.id, {
              completed: !task.completed,
            });

            if (res.status == 200) {
              window.location.reload(); //CAMBIAR POR ESTADO
            }
          }}
        >
          Check
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${task.completed ? "text-green-500" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <p className="text-slate-300">{task.description}</p>
    </div>
  );
}

export default TaskCard;
