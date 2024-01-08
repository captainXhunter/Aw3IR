var app;
window.onload = function () {
    app = new Vue({
        el: '#weatherApp', // cible l'élement HTML où nous pourrons utiliser toutes les variables ci-dessous
        data: {
            // sera utilisé comme indicateur de chargement de l'application
            loaded: false,

            // cityName, variable utilisé dans le formulaire via v-model
            formCityName: '',

            message: 'WebApp Loaded.',
            messageForm: '',
            url: "",

            // liste des villes saisies, initialiser avec Paris
            cityList: [{
                name : 'Paris'
            }],

            // cityWeather contiendra les données météo reçus par openWeatherMap
            cityWeather : null,

             // cityWeather contiendra les données météo reçus par openWeatherMap sur 4 jours
             city4Weather : null,

            // indicateur de chargement
            cityWeatherLoading : false
        },

        // 'mounted' est exécuté une fois l'application VUE totalement disponible
        // Plus d'info. sur le cycle de vie d'une app VUE : 
        // https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
        mounted : function(){
            this.loaded = true;
            this.readData();
        },

        // ici, on définit les methodes qui vont traiter les données décrites dans DATA
        methods: {

            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList)); // va afficher la liste des villes
                // JSON.stringify permet transfomer une liste en chaine de caractère

                console.log('this.loaded:', this.loaded); // va afficher 'this.loaded: true'
            },
            
            isCityExist: function(_cityName){
                if( this.cityList.filter(item => 
                    item.name.toUpperCase() == _cityName.toUpperCase()
                ).length>0){
                return true;
                }else{
                return false;
                }
            },

            addCity: function (event) {
                event.preventDefault(); // pour ne pas recharger la page à la soumission du formulaire

                console.log(this.isCityExist(this.formCityName));
                
                if(this.isCityExist(this.formCityName)){
                    this.messageForm = 'existe déjà';
                }
                else{
                this.cityList.push({name : this.formCityName});
                this.messageForm = '';
                this.formCityName = '';
            }

            },
            remove: function (_city) {      
                this.cityList = this.cityList.filter(item => item.name != _city.name);        
            }, 
            meteo4date: function (_city){
                 // appel AJAX avec fetch
                 fetch('https://api.openweathermap.org/data/2.5/forecast/?q='+ _city.name +'&lang=fr&appid=0ada432b59deb9716c357092c5f79be6')
                 .then(function(response) {
                     return response.json();
                 })
                 .then(function(json) {
                     
                     // test du code retour
                     // 200 = OK
                     // 404 = city not found 
                     if(json.cod === "200"){
                         // on met la réponse du webservice dans la variable cityWeather
                         jsonFil=[]
                         json.list.forEach((element) => {
                            if(json.list.indexOf(element)%8 == 0){
                                jsonFil.push(element);
                            }
                         })
                         console.log(jsonFil);
                         app.city4Weather = jsonFil;
                         app.message = null;
                     }
                     else{
                         app.city4Weather = null;
                         app.message = 'Météo introuvable pour ' + _city.name 
                                         + ' (' + json.message+ ')';
                     }        
                 });  
            },
            meteo: function (_city) {  
                this.cityWeatherLoading = true;

                // appel AJAX avec fetch
                fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&appid=0ada432b59deb9716c357092c5f79be6')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        app.cityWeatherLoading = false;
            
                        // test du code retour
                        // 200 = OK
                        // 404 = city not found 
                        if(json.cod === 200){
                            // on met la réponse du webservice dans la variable cityWeather
                            app.cityWeather = json;
                            app.message = null;
                            app.url = "https://maps.googleapis.com/maps/api/staticmap?markers="+_city.name+"&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg";
                        }
                        else{
                            app.cityWeather = null;
                            app.message = 'Météo introuvable pour ' + _city.name 
                                            + ' (' + json.message+ ')';
                        }        
                    });           
            }
        }
    });
}