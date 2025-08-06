// para caprturas los datos creo un estado
import { useState, useEffect } from "react"; //el useState permite declarar variables
import { useParams, useNavigate } from "react-router-dom";

import { fetchTask,createTask,updateTask,deleteTask} from "../api/services";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  console.log(params);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //va a recibir una infor del evento y se cancela el efecto prederterminado de actualizar el evento

    e.preventDefault();

    if (!params.id) { //si no hay un rapams id, esta actualizando
      const res = await createTask({title, description})
      console.log(res);
      
    } else {
      const res = await updateTask(params.id, {title, description})
      console.log(res);
    }

    e.target.reset();
    navigate("/");
  };

  useEffect(() => {
  if (params.id) {
    fetchTask(params.id)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }

}, []);


  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4 ">
            {params.id ? "Update Task" : "Create Task"}
          </h1>
          <input
            type="text"
            placeholder="title"
            className="block py-2 px-3 mb-4 w-full bg-white text-black "
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus
          />
          <textarea
            placeholder="description"
            className="block py-2 px-3 mb-4 w-full bg-white text-black"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 py-2 px-4 rounded">
            {params.id ? "Update Task" : "Create Task"}
          </button>
        </form>

        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5"
            onClick={async () => {
              try {
                const res = await deleteTask(params.id)
                console.log(res);
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;
