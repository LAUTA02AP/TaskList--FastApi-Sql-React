import { useEffect, useState } from "react"
import {fetchTasks} from "../api/services";
import TaskList from "../components/Tasklist";




function Homepage(){
    //pido las tareas al back

    const [tasks,setTask] = useState([]) //guardo las tareas 
    useEffect(() => {

       fetchTasks()
        .then ((res) => {
            setTask(res.data)
        } )
        .catch (err => console.log(err))
    }, []);





    return(
    <TaskList tasks={tasks}/>
   )
}

export default Homepage