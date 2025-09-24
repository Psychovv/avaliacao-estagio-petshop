import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ServiceHistoryModalComponent } from '../service-history-modal/service-history-modal'; // 1. IMPORTE AQUI

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ServiceHistoryModalComponent], // 2. ADICIONE AQUI
  templateUrl: './pet-list.html',
  styleUrl: './pet-list.css'
})
export class PetListComponent implements OnInit {

  pets: Pet[] = [];
  busca: string = '';
  especie: string = '';

  // 3. Propriedade para controlar qual pet está selecionado para o modal
  petSelecionado: Pet | null = null;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
    this.petService.getPets(this.busca, this.especie).subscribe({
      next: (data) => { this.pets = data; },
      error: (err) => { console.error("Erro ao carregar pets", err); }
    });
  }

  limparFiltros(): void {
    this.busca = '';
    this.especie = '';
    this.carregarPets();
  }
  
  excluirPet(id: number, nome: string): void {
    const confirmacao = confirm(`Tem certeza que deseja excluir o pet "${nome}"? Esta ação não pode ser desfeita.`);
    if (confirmacao) {
      this.petService.deletePet(id).subscribe({
        next: () => {
          this.pets = this.pets.filter(pet => pet.id !== id);
        },
        error: (err) => {
          console.error(`Erro ao excluir o pet com id ${id}`, err);
          alert('Ocorreu um erro ao excluir o pet.');
        }
      });
    }
  }

  // 4. ADICIONE ESTAS DUAS FUNÇÕES
  abrirModalHistorico(pet: Pet): void {
    this.petSelecionado = pet;
  }

  fecharModalHistorico(): void {
    this.petSelecionado = null;
  }
}