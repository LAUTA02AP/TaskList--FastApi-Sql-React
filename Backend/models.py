from pydantic import BaseModel
from typing import Optional

# Modelo base para crear o mostrar tareas
class TaskBase(BaseModel):
    title: str
    description: str
    completed: Optional[bool] = False

# Modelo para crear tarea (input)
class TaskCreate(TaskBase):
    pass

# Modelo para actualizar tarea (input parcial)
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

# Modelo para devolver tarea (output), incluye id
class TaskResponse(TaskBase):
    id: int

    class Config:
        from_attributes = True  # esto permite que Pydantic lea el objeto SQLAlchemy directamente