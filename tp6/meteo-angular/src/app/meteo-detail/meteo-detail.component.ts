import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {MeteoService} from '../services/meteo.service'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-meteo-detail',
  templateUrl: './meteo-detail.component.html',
  styleUrls: ['./meteo-detail.component.css']
})
export class MeteoDetailComponent implements OnInit {

  meteo : any;
  meteos : any;

  constructor(
    private route: ActivatedRoute,
    private meteoService: MeteoService,
    private location: Location
  ) {

  }

  ngOnInit() {
    this.getMeteo();
  }

  hours(){

  }

  filter(listmeteo: any){
    var dict: any[] = [];
    listmeteo.list.forEach((element: any) => {
      if(listmeteo.list.indexOf(element)%8 == 0){
        console.log(listmeteo.list.indexOf(element));
        let temperature = element.main.temp;
        element.main.temp = element.main.temp - 273.15;
        element.main.temp_min = element.main.temp_min - 273.15;
        element.main.temp_max = element.main.temp_max - 273.15;
        element.sunrise = listmeteo.city.sunrise;
        element.sunset = listmeteo.city.sunset;
        element.main.temp = parseFloat(element.main.temp).toFixed(2);
        element.main.temp_min = parseFloat(element.main.temp_min).toFixed(2);
        element.main.temp_max = parseFloat(element.main.temp_max).toFixed(2);
        dict.push(element);
      }
    });
    
    console.log("table = "+ dict[0].weather[0].icon);
    return dict;
  }

  getMeteo(): void {
    const name = this.route.snapshot.paramMap.get('name'); 
    // pour lire la paramètre 'name' dans l'URL de la page  comme définit dans le router avec
    // path: 'meteo/:name'

    if(name)
    {
      this.meteoService.getMeteo(name)
      .then(meteo => this.meteo = meteo)
      .catch(fail => this.meteo = fail);

      this.meteoService.getMeteoOn(name)
      .then(meteos => this.meteos = this.filter(meteos))
      .catch(fail => this.meteos = fail);

    }
  }

}