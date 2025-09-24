// src/app/components/pet-list/pet-list.ts (Versão Final)
import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-pet-list',
  standalone: true,
  
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css'
})
export class PetListComponent implements OnInit {

  pets: Pet[] = [];

  busca: string = '';
  especie: string = '';

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.carregarPets();
  }


  carregarPets(): void {
    this.petService.getPets(this.busca, this.especie).subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error("Erro ao carregar pets", err);
      }
    });
  }

  // 5. Nova função para limpar os filtros e recarregar a lista
  limparFiltros(): void {
    this.busca = '';
    this.especie = '';
    this.carregarPets();
  }
}