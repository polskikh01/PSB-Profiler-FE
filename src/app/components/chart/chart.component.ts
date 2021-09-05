import {Component, OnInit} from '@angular/core';
import {Chart} from 'node_modules/chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    Chart.defaults.font.size = 20;
    let myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: [
          'DPF',
          'XLSX',
          'DOCX',
          'PNG'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [73, 11, 9, 7],
          borderWidth: 0,
          backgroundColor: [
            'rgb(131, 48, 83)',
            'rgb(232, 87, 20)',
            'rgb(20, 156, 232)',
            'rgb(240, 240, 240)'
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Типы обрабатываемых документов',
            position: "bottom",
            color: '#FFFFFF',
          },
          legend: {
            position: "right",
            labels: {
              padding: 50,
              color: '#FFFFFF',
              font: {
                size: 16
              }
            }
          },
        }
      }
    });
  }
}
