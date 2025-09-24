// src/app/services/pet.ts 
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

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
}