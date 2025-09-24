# backend-python/crud.py (Versão Corrigida)
from sqlalchemy.orm import Session
import models, schemas 

def get_pet(db: Session, pet_id: int):
    return db.query(models.Pet).filter(models.Pet.id == pet_id).first()

def get_pets(db: Session, busca: str, especie: str, skip: int = 0, limit: int = 100):
    query = db.query(models.Pet)
    if busca:
        query = query.filter(models.Pet.nome.ilike(f"%{busca}%"))
    if especie:
        query = query.filter(models.Pet.especie == especie)
    return query.offset(skip).limit(limit).all()

def create_pet(db: Session, pet: schemas.PetCreate):
    db_pet = models.Pet(**pet.dict())
    db.add(db_pet)
    db.commit()
    db.refresh(db_pet)
    return db_pet

def delete_pet(db: Session, pet_id: int):
    db_pet = db.query(models.Pet).filter(models.Pet.id == pet_id).first()
    if db_pet:
        db.delete(db_pet)
        db.commit()
        return db_pet
    return None

def get_servicos_by_pet(db: Session, pet_id: int, limite: int = 5):
    return db.query(models.Servico).filter(models.Servico.pet_id == pet_id).order_by(models.Servico.data.desc()).limit(limite).all()

def create_pet_servico(db: Session, servico: schemas.ServicoCreate, pet_id: int):
    db_servico = models.Servico(**servico.dict(), pet_id=pet_id)
    db.add(db_servico)
    db.commit()
    db.refresh(db_servico)
    return db_servico