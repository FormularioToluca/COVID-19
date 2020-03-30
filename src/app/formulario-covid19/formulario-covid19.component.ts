import { Component, OnInit } from '@angular/core';
import { CovidService } from '../common/services/covid.service'
import swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-covid19',
  templateUrl: './formulario-covid19.component.html',
  styleUrls: ['./formulario-covid19.component.scss']
})
export class FormularioCovid19Component implements OnInit {
  data: any = {
    employee: null,
    depto: null,
    date: null,
    temperature: null,
    transport: null,
    places: null,
    contact: null,
    reunions: null,
    type:null
  }
  sending:boolean = false;
  constructor(private covid: CovidService) { }



  ngOnInit() {
  }

  submitInfo(): void {
    console.log(this.data);
    this.covid.registerAnswers(this.data).then(res => {
      console.log(res);
      this.sending = false;
      this.data = {
        employee: null,
        depto: null,
        date: null,
        temperature: null,
        transport: null,
        places: null,
        contact: null,
        reunions: null,
        type:null
      }
      this.showSuccess('Respuestas guardadas/ Answers saved');
    }).catch(error => {
      console.error(error);

    })

  }


  showSuccess(msg: string) {


    swal.fire({
      icon: 'success',
      title: 'Success...',
      text: msg,
    })
  }

}
