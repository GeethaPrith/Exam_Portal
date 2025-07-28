import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,

} from 'chart.js';
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  LineController,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

@Component({
  selector: 'app-student-profile',
  imports: [],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.scss'
})
export class StudentProfileComponent implements AfterViewInit {
  @ViewChild('topicIqChart') topicIqChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('iqChart') iqChartRef!: ElementRef<HTMLCanvasElement>;
ngAfterViewInit(): void {
    this.rendertopicIqChart();
    this.renderiqChart();

  }
  rendertopicIqChart() {
    const ctx = this.topicIqChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['JavaScript', 'HTML', 'Flinto', 'Vue.js', 'Sketch', 'Priciple', 'CSS', 'Angular'],
        datasets: [
          {
            label: 'Best Score',
            data: [65, 75, 70, 60, 68, 55, 60, 72],
            fill: true,
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.2)',
            pointBackgroundColor: '#3f51b5',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#3f51b5'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: { stepSize: 50 },
            pointLabels: {
              font: { size: 14 }
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  renderiqChart() {
    const ctx = this.iqChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Experience IQ',
          data: [110, 95, 80, 140, 100, 130, 105],
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          pointBackgroundColor: '#3f51b5',
          pointBorderColor: '#fff',
          fill: false,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#555' }
          },
          y: {
            min: 0,
            max: 200,
            grid: {
              color: '#ddd',
              lineWidth: 1
            },
            ticks: {
              stepSize: 100,
              color: '#888'
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.raw} points`
            }
          }
        },
        elements: {
          line: { borderWidth: 2 }
        }
      }
    });
  }
}



