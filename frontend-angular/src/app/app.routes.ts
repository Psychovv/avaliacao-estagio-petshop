import { Routes } from '@angular/router';
import { PetListComponent } from './components/pet-list/pet-list'; 

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: '**', redirectTo: '' }
];