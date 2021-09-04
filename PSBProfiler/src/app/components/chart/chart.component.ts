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
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ]
        }]
      },
      options: {
        // scales: {
        //   y: {
        //     beginAtZero: true
        //   }
        // }
        // cutoutPercentage: 30,
        // legend: {
        //   position: 'right'
        // },
        animation: {
          animateRotate: false,
          animateScale: true
        }
      }
    });
  }
}

var chartOptions = {
  rotation: -Math.PI,
  cutoutPercentage: 30,
  circumference: Math.PI,
  legend: {
    position: 'right'
  },
  animation: {
    animateRotate: false,
    animateScale: true
  }
};
