import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FootballersComponent } from './footballers/footballers.component';
import { FootballerDetailComponent } from './footballer-detail/footballer-detail.component';

const routes: Routes = [
  { path: 'footballers', component: FootballersComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: FootballerDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
