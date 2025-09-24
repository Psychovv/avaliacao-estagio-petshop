import { Routes } from '@angular/router';
import { PetListComponent } from './components/pet-list/pet-list';
import { PetFormComponent } from './components/pet-form/pet-form';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'pets/novo', component: PetFormComponent },
  { path: '**', redirectTo: '' }
];