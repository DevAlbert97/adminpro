import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { GraphsComponent } from './graphs/graphs.component';
import { IncreaserComponent } from './increaser/increaser.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { TableLoaderComponent } from './table-loader/table-loader.component';



@NgModule({
  declarations: [
    IncreaserComponent,
    GraphsComponent,
    TableLoaderComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    IncreaserComponent,
    GraphsComponent,
    TableLoaderComponent,
    ModalImageComponent
  ]
})
export class ComponentsModule { }
