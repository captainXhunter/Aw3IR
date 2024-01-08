window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
     console.log( "DOM ready!" );
     // Y mettre le code Javascript pour valider tous les champs du formulaire
 };

 

 var myModal = new bootstrap.Modal(document.getElementById('myModal'));
 document.getElementById("exampleModalLabel").innerHTML = "Erreur";

 
  function validateEmail() {
    let mail = document.getElementById("mail").value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(mail).toLowerCase())){
      return true;
    }
    else{
      document.querySelector(".modal-body").innerHTML = "Le mail doit respecter le format";
      myModal.show();
      return false;
    }
  }
 
  function validateDate(){
      let date = document.getElementById("date").value;
      const now = new Date();
      const yyyy = now.getFullYear();
      let mm = now.getMonth() + 1; // Months start at 0!
      let dd = now.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formatage = yyyy + '-' + mm + '-' + dd;
      if( formatage <= date || date == '')
        {
          document.querySelector(".modal-body").innerHTML = "La date doit etre logique";
          myModal.show();
          return false;
        }
      else{
        return true;
      } 
    }

    function validateOthers(nom){
      const name = document.getElementById(nom).value;
      if(name.length < 5 || name == ""){
        document.querySelector(".modal-body").innerHTML = "Le " + nom + " doit contenir minimum 5 caracteres";
        myModal.show();
        return false;
      }
      else
        return true;
    }

    function validateAdresse(ad){
      let adresse = document.getElementById(ad).value;
      if(adresse.length < 5 || adresse == ""){
        document.querySelector(".modal-body").innerHTML = "L'" + ad + " doit contenir minimum 5 caracteres";
        myModal.show();
        return false;
      }
      else
        return true;
    }

  function validation(){
    document.getElementById("exampleModalLabel").innerHTML = "Erreur";
    let adr = document.getElementById("adresse").value;
    
    if(
      validateOthers("nom") && 
      validateOthers("prenom") && 
      validateAdresse("adresse") && 
      validateDate() &&
      validateEmail()
      ){
      document.querySelector(".modal-title").innerHTML = "Bienvenue " + document.getElementById("prenom").value;
      document.querySelector(".modal-body").innerHTML = '<a href="http://maps.google.com/maps?q='+adr+'"> <img src="https://maps.googleapis.com/maps/api/staticmap?markers='+adr+'&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt="google map" height=300 width=300/><br/> <span>Vous habitez à ' + adr + '  </span></a><br/>';
      myModal.show();
    }
    else{
      document.querySelector(".modal-body").innerHTML = 'Tous les champs sont obligatoires';
      myModal.show();
    }
}