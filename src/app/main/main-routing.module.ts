import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { NoPageFoundComponent } from '../no-page-found/no-page-found.component';

import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'graph-one', component: GraphOneComponent, data: { title: 'Graphs' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'ProgressBar' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Settings' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promises' } },
      { path: 'rxjs',  component: RxjsComponent,  data: { title: 'Rxjs' } },
      { path: 'perfil',  component: PerfilComponent,  data: { title: 'Perfil' } },

      // Maintenance
      { path: 'users',  component: UsersComponent,  data: { title: 'Usuarios' } },
      { path: 'hospitals',  component: HospitalsComponent,  data: { title: 'Hospitales' } },
      { path: 'doctors',  component: DoctorsComponent,  data: { title: 'Doctores' } },
    ],
  },
  {
    path: '**',
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
