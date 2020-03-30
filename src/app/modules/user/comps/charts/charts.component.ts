import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  public options: any = {
    chart: {
      type: 'column',
      height: 700,
      width:700,
      inverted: false,
      allowDecimals: false
    },
    title: {
      text: 'En la escala de 1 al 5 (1 no colabora, 5 excelente colaboración). ¿Cómo consideras que es la colaboración de OPM?'
    },
    yAxis: [{
      className: 'highcharts-color-0',
      title: {
          text: 'Promedio'
      }
    }],
    plotOptions: {
      series: {
        
        dataLabels: {
            enabled: true,
            formatter : function() {
                var res 
                if(this.y ==0){
                  res =  "<br>" ;
                }
                if(this.y <= 1 && this.y >0){
                  res =  "<br>Never" ;
                }
                if(this.y >1 &&this.y <= 2){
                  res =   "<br>Rarely";
                }
                if(this.y>2 && this.y <=3){
                  res =   "<br>Sometimes";
                }
                if(this.y>3 && this.y <=4){
                  res =   "<br>Frequently";
                }
                if(this.y>4){
                  res =   "<br>Always";
                }
                return res;
                
            },
            yHigh: 40,
            yLow: -20,
        }
      }
    },
    xAxis: {
      categories:['No colabora','Rara vez','A veces','Colabora frecuentemente','Excelente colaboración '],
        title: {
            text: 'Opciones'
        }
    },
    series: [
        {name:'Self ',
        data:[Math.floor(Math.random() * (5 - 1)) + 1,Math.floor(Math.random() * (5 - 1)) + 1,Math.floor(Math.random() * (5 - 1)) + 1,Math.floor(Math.random() * (5 - 1)) + 1,Math.floor(Math.random() * (5 - 1)) + 1]},
        //data:this.selfAvg,},

        //data:this.totalAvg}
      ]
  }
  constructor() { }

  ngOnInit() {
    Highcharts.chart('container', this.options);
  }


}
