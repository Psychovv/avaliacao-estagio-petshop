import { Component, OnInit } from '@angular/core';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.html', // Corrigido para o nome do seu arquivo
  styleUrl: './pet-list.css'    // Corrigido para o nome do seu arquivo
})
export class PetListComponent implements OnInit {

  pets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.carregarPets();
  }

  carregarPets(): void {
    this.petService.getPets().subscribe({
      next: (data) => {
        this.pets = data;
      },
      error: (err) => {
        console.error("Erro ao carregar pets", err);
      }
    });
  }
}