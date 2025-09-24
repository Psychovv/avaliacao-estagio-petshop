export interface Servico {
  id: number;
  descricao: string;
  data: string;
  pet_id: number;
}

export interface ServicoCreate {
  descricao: string;
}

export interface Pet {
  id: number;
  nome: string;
  especie: string;
  tutor: string;
  criado_em: string;
  servicos: Servico[];
}

export interface PetCreate {
  nome: string;
  especie: string;
  tutor: string;
}