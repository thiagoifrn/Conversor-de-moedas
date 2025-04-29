import { Routes } from '@angular/router';
import { ConverterComponent } from './pages/converter/converter.component';

export const routes: Routes = [
  { path: '', component: ConverterComponent },
  { path: '**', redirectTo: '' },
];
