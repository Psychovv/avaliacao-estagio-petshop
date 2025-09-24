from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

# scemas para servicos
class ServicoBase(BaseModel):
    descricao: str

class ServicoCreate(ServicoBase):
    pass

class Servico(ServicoBase):
    id: int
    pet_id: int
    data: datetime

    class Config:
        orm_mode = True

# schemas para pets
class PetBase(BaseModel):
    nome: str
    especie: str
    tutor: str

class PetCreate(PetBase):
    pass

class Pet(PetBase):
    id: int
    criado_em: datetime
    servicos: List[Servico] = []

    class Config:
        orm_mode = True