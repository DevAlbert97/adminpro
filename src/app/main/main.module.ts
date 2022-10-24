import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphOneComponent } from './graph-one/graph-one.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    GraphOneComponent,
    ProgressComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule],
  exports: [
    DashboardComponent,
    GraphOneComponent,
    ProgressComponent,
  ],
})
export class MainModule {}
