# backend-python/main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

import crud, models, schemas #
from database import SessionLocal, engine 

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="API do Petshop")

origins = [
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/pets/", response_model=schemas.Pet, status_code=201)
def create_pet(pet: schemas.PetCreate, db: Session = Depends(get_db)):
    return crud.create_pet(db=db, pet=pet)

@app.get("/pets/", response_model=List[schemas.Pet])
def read_pets(busca: Optional[str] = None, especie: Optional[str] = None, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pets = crud.get_pets(db, busca=busca, especie=especie, skip=skip, limit=limit)
    return pets

@app.delete("/pets/{pet_id}", response_model=schemas.Pet)
def delete_pet(pet_id: int, db: Session = Depends(get_db)):
    db_pet = crud.delete_pet(db=db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    return db_pet

@app.post("/pets/{pet_id}/servicos/", response_model=schemas.Servico, status_code=201)
def create_servico_for_pet(pet_id: int, servico: schemas.ServicoCreate, db: Session = Depends(get_db)):
    db_pet = crud.get_pet(db, pet_id=pet_id)
    if db_pet is None:
        raise HTTPException(status_code=404, detail="Pet não encontrado")
    return crud.create_pet_servico(db=db, servico=servico, pet_id=pet_id)

@app.get("/pets/{pet_id}/servicos/", response_model=List[schemas.Servico])
def read_servicos_from_pet(pet_id: int, limite: int = 5, db: Session = Depends(get_db)):
    servicos = crud.get_servicos_by_pet(db=db, pet_id=pet_id, limite=limite)
    return servicos