import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncreaserComponent } from './increaser/increaser.component';
import { GraphsComponent } from './graphs/graphs.component';



@NgModule({
  declarations: [
    IncreaserComponent,
    GraphsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncreaserComponent,
    GraphsComponent
  ]
})
export class ComponentsModule { }
