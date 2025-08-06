import axios from 'axios'

const URL = 'http://localhost:8000'

const endpoint =`${URL}/api/tasks`





export const fetchTasks = async () => axios.get(endpoint);

// const res = await fetch("http://127.0.0.1:8000/api/tasks", {
    //     method: 'POST',
    //     body: JSON.stringify({
    //         title,
    //         description
    //     }),
    //    headers : {
    //     'Content-type': 'application/json'
    // }
    // })
    //const data = await res.json()  LO REMPLAZO UTILIZANDO AXIOS


//peticion  
export const fetchTask = async (id) => axios.get(`${endpoint}/${id}`);

//crear 
export const createTask = async (newTask) => axios.post(endpoint, newTask);

//actualiza 
export const updateTask = async (id, task) => axios.put(`${endpoint}/${id}`, task);

//Delete 

export const deleteTask = async (id) => axios.delete(`${endpoint}/${id}`);
