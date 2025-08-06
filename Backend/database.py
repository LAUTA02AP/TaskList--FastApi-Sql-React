from sqlalchemy import create_engine

from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, declarative_base

DATABASE_URL = "mysql+mysqlconnector://root:CQREwuGGTSgDsijXHwGIaYHNZSjunwRE@mysql.railway.internal:3306/railway"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# class Usuario(Base):
#     __tablename__ = "usuarios"
#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True, nullable=False)
#     hashed_password = Column(String, nullable=False)

#     tareas = relationship("Tarea", back_populates="usuario")

class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(255), nullable=False)
    completed = Column(Boolean, default=False)
    
Base.metadata.create_all(bind=engine)