import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
  @Input() title!: string;
  @Input() labels!: string[];
  @Input() data!: number[];
  @Input() colors: string[] = ['#6857E6', '#009FEE', '#F02059'];

  ChartData!: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.ChartData = {
      labels: this.labels,
      datasets: [
        { data: this.data,
          backgroundColor: this.colors
        }
      ],
    };
  }
}
