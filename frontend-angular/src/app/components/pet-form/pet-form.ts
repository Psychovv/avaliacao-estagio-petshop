import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PetCreate } from '../../models/pet.model';
import { PetService } from '../../services/pet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pet-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pet-form.html',
  styleUrl: './pet-form.css'
})
export class PetFormComponent {
  pet: PetCreate = {
    nome: '',
    especie: '',
    tutor: ''
  };

  constructor(
    private petService: PetService,
    private router: Router
  ) {}

  salvarPet(): void {
    if (!this.pet.nome || !this.pet.especie || !this.pet.tutor) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.petService.createPet(this.pet).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro ao salvar pet', err);
        alert('Ocorreu um erro ao salvar o pet. Tente novamente.');
      }
    });
  }
}