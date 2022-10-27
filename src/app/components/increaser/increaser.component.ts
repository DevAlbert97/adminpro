import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css'],
})
export class IncreaserComponent implements OnInit {
  @Input() progress: number = 40;
  @Input() btnClass: string = 'btn-primary';

  @Output() outValue: EventEmitter<number> = new EventEmitter();

  changeValue(value: number) {
    if (this.progress + value <= 100 && this.progress + value >= 0) {
      this.progress += value;
      this.outValue.emit(this.progress);
    }
  }

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  onChange(value: number) {
    this.progress = value;
    this.outValue.emit(this.progress);
  }
}
