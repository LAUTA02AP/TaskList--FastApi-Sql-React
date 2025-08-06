from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from database import get_db, Task                # ORM model y DB session
from models import TaskCreate, TaskUpdate, TaskResponse  # Pydantic schemas

from fastapi.middleware.cors import CORSMiddleware
from decouple import config 

app = FastAPI()

print(
    config("FRONTEND_URL")
)
origins = [ #hago un arreglo por que varias url pueden hacer peticiones al backend 
    config("FRONTEND_URL")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # o los dominios que permitas
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# from schemas import TaskCreate, TaskUpdate, TaskResponse

@app.get("/")
def welcome():
    return {"message": "Welcome to the API!"}

@app.get('/api/tasks', response_model=List[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    tasks = db.query(Task).all()
    return tasks

@app.get('/api/tasks/{id}', response_model=TaskResponse)
def get_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(404, f"There is no task with the id {id}")
    return task

@app.post('/api/tasks', response_model=TaskResponse)
def save_task(task: TaskCreate, db: Session = Depends(get_db)):
    task_found = db.query(Task).filter(Task.title == task.title).first()
    if task_found:
        raise HTTPException(409, "Task already exists")

    db_task = Task(title=task.title, description=task.description, completed=task.completed)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.put('/api/tasks/{id}', response_model=TaskResponse)
def put_task(id: int, task_update: TaskUpdate, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(404, f"There is no task with the id {id}")

    update_data = task_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)
    return task

@app.delete('/api/tasks/{id}')
def remove_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if not task:
        raise HTTPException(404, f"There is no task with the id {id}")

    db.delete(task)
    db.commit()
    return {"message": "Successfully deleted task"}
