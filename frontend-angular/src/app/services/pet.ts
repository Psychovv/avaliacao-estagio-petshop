import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet, PetCreate, Servico, ServicoCreate } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  getPets(busca?: string, especie?: string): Observable<Pet[]> {
    let params = new HttpParams();
    if (busca) {
      params = params.append('busca', busca);
    }
    if (especie) {
      params = params.append('especie', especie);
    }
    return this.http.get<Pet[]>(`${this.apiUrl}/pets/`, { params });
  }

  createPet(pet: PetCreate): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/pets/`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/pets/${id}`);
  }

  getServicosByPetId(petId: number, limite: number = 5): Observable<Servico[]> {
    const params = new HttpParams().set('limite', limite.toString());
    return this.http.get<Servico[]>(`${this.apiUrl}/pets/${petId}/servicos/`, { params });
  }

  addServico(petId: number, servico: ServicoCreate): Observable<Servico> {
    return this.http.post<Servico>(`${this.apiUrl}/pets/${petId}/servicos/`, servico);
  }
}