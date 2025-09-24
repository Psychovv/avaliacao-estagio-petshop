import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pet, Servico, ServicoCreate } from '../../models/pet.model';
import { PetService } from '../../services/pet';

@Component({
  selector: 'app-service-history-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-history-modal.html',
  styleUrl: './service-history-modal.css'
})
export class ServiceHistoryModalComponent implements OnChanges {
  @Input() pet: Pet | null = null;
  @Output() fechar = new EventEmitter<void>();

  servicos: Servico[] = [];
  isLoading = false;
  error: string | null = null;
  novaDescricao: string = '';

  constructor(private petService: PetService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pet'] && this.pet) {
      this.carregarServicos();
    }
  }

  carregarServicos(): void {
    if (!this.pet) return;
    this.isLoading = true;
    this.error = null;
    this.petService.getServicosByPetId(this.pet.id).subscribe({
      next: (data) => {
        this.servicos = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar serviços', err);
        this.error = 'Não foi possível carregar o histórico de serviços.';
        this.isLoading = false;
      }
    });
  }

  adicionarServico(): void {
    if (!this.pet || !this.novaDescricao.trim()) return;

    const novoServico: ServicoCreate = { descricao: this.novaDescricao };

    this.petService.addServico(this.pet.id, novoServico).subscribe({
      next: () => {
        this.novaDescricao = ''; // Limpa o campo do formulário
        this.carregarServicos(); // Recarrega a lista para mostrar o novo serviço
      },
      error: (err) => {
        console.error('Erro ao adicionar serviço', err);
        alert('Não foi possível adicionar o serviço.');
      }
    });
  }

  fecharModal(): void {
    this.fechar.emit();
  }
}