import { Component } from '@angular/core';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css'],
})
export class GraphOneComponent {
  chartLabels1: string[] = ['Atendiendo', 'Operando', 'No disponibles'];
  chartData1: number[] = [50, 45, 20];
  chartColors1: string[] = ['#F05BD1', '#F0D867', '#AA4FF0'];
  chartLabels2: string[] = ['Atendiendo', 'Operando', 'No disponibles'];
  chartData2: number[] = [32, 45, 10];
  chartColors2: string[] = ['#BD5963', '#8A1723', '#EA89F0'];
  chartLabels3: string[] = ['Cama', 'Tratamiento', 'Quirofano', 'Observacion'];
  chartData3: number[] = [125, 75, 45, 82];
  chartColors3: string[] = ['#2C7033', '#A7F2AF', '#5DF06C', '#4D7051'];
  chartLabels4: string[] = ['Bodega', 'Piso', 'Agotados'];
  chartData4: number[] = [1500, 2300, 50];
  chartColors4: string[] = ['#9B4EA3', '#E79CF0', '#5ACDF0'];
}
