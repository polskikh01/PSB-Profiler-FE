import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-chart-display',
  templateUrl: './chart-display.component.html',
  styleUrls: ['./chart-display.component.css']
})
export class ChartDisplayComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    Chart.defaults.font.size = 20;
    let myChart = new Chart("myChartDisplay", {
      type: 'pie',
      data: {
        labels: [
          '< 30сек',
          '30сек < 60сек',
          '60сек < 90сек',
          '90сек<120сек'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [78, 12, 7, 3],
          borderWidth: 0,
          backgroundColor: [
            'rgb(20, 156, 232)',
            'rgb(232, 87, 20)',
            'rgb(240, 240, 240)',
            'rgb(131, 48, 83)'
          ]
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Среднее время обработки документа',
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
