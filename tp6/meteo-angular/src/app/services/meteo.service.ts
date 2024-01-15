import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MeteoService {

  constructor() { }


  getMeteo(name: string): Promise<any> {
    //console.log('from service', name);

    return fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + name + '&units=metric&lang=fr&appid=e0900d05b9816777f41957e1b111899d')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        // test du code retour
        // 200 = OK
        // 404 = city not found 
        if (json.cod === 200) {
          return Promise.resolve(json);
        } else {
          console.error('Météo introuvable pour ' + name + ' (' + json.message + ')');

          return Promise.reject('Météo introuvable pour ' + name + ' (' + json.message + ')');
        }

      });

  }
  getMeteoOn(name: string) : Promise<any>{

    return fetch('https://api.openweathermap.org/data/2.5/forecast/?q='+ name +'&lang=fr&appid=0ada432b59deb9716c357092c5f79be6')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        if (json.cod == 200) {
          return Promise.resolve(json);
        } else {
          console.error('Météo introuvable pour ' + name + ' (' + json.message + ')');
          return Promise.reject('Météo introuvable pour ' + name + ' (' + json.message + ')');
        }

      });

  }

  getAll(){
    return
  }

}