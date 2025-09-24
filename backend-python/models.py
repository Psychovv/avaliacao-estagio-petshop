# backend-python/models.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Text, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base 

class Pet(Base):
    __tablename__ = "pets"
    id = Column(Integer, primary_key=True)
    nome = Column(Text, nullable=False)
    especie = Column(Text, CheckConstraint("especie IN ('Cachorro', 'Gato', 'Outro')"), nullable=False)
    tutor = Column(Text, nullable=False)
    criado_em = Column(DateTime(timezone=True), server_default=func.now())
    servicos = relationship("Servico", back_populates="pet", cascade="all, delete-orphan")

class Servico(Base):
    __tablename__ = "servicos"
    id = Column(Integer, primary_key=True)
    pet_id = Column(Integer, ForeignKey("pets.id"), nullable=False)
    descricao = Column(Text, nullable=False)
    data = Column(DateTime(timezone=True), server_default=func.now())
    pet = relationship("Pet", back_populates="servicos")