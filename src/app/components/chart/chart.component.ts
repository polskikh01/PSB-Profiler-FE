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
    var myChart = new Chart("myChart", {
      type: 'pie',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow',
          'TEST123'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100, 700],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 0, 16)'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            position: "right",

            labels: {
              padding: 50,
              color: '#FFFFFF'
            }
          },
        }
      }
    });
  }
}
