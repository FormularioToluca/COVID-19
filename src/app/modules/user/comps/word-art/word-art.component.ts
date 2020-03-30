import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestService} from '../../services/quest.service';


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
  selector: 'app-word-art',
  templateUrl: './word-art.component.html',
  styleUrls: ['./word-art.component.scss']
})
export class WordArtComponent implements OnInit {
  @Input('question') question: string;
  public _words = null
  public _data = [];
  constructor(private _qs:QuestService, private _activated:ActivatedRoute, private _router:Router) { 
    _router.events.subscribe((val:any) => {
      console.log(val.url);
      
      if(val.url.includes('open')){
        this.ngOnInit()
      }
    })
  }

  public options: any = {
    chart: {
        type: 'packedbubble',
        height: '40%'
    },
    title: {
        text: this.question
    },
    tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}</sub>'
    },
    plotOptions: {
        packedbubble: {
            minSize: '30%',
            maxSize: '120%',
            zMin: 0,
            zMax: 1000,
            layoutAlgorithm: {
                splitSeries: false,
                gravitationalConstant: 0.02
            },
            dataLabels: {
                enabled: true,
                format: '{point.name}',
               
                style: {
                    color: 'black',
                    textOutline: 'none',
                    fontWeight: 'normal'
                }
            }
        }
    },
    series: [{
        name: 'Percepción',
        data: this._data
    }]
}

  ngOnInit() {
    let question = this._activated.snapshot.params.question;
    let group = this._activated.snapshot.params.participant;
    this._qs.getWorsCount(question, group).then((data:any)=>{
      console.log(data);
      this._words = data.$values;
      this._words.forEach(element => {
        let temp  = {
          name:element.name,
          value:element.value
        }
        this._data.push(temp)
      });

      console.log(this._data);
      
      
      Highcharts.chart('container', this.options);
    }).catch(error=>{
      console.log(error);
      
    })
  }

}
