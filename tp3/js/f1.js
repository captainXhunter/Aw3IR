window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
     console.log( "DOM ready!" );
     // Y mettre le code Javascript pour valider tous les champs du formulaire
     
 };

 
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
 
  function validateDate(date){
    const now = new Date();
    const yyyy = now.getFullYear();
    let mm = now.getMonth() + 1; // Months start at 0!
    let dd = now.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatage = yyyy + '-' + mm + '-' + dd;
    if( formatage <= date )
      return false;
    else
      return true;
    }

  function validation(){
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let date = document.getElementById("date").value;
    let adresse = document.getElementById("adresse").value;  
    let mail = document.getElementById("mail").value;
    document.getElementById("exampleModalLabel").innerHTML = "Erreur";

    var myModal = new bootstrap.Modal(document.getElementById('myModal'));
    let index = 5;
    let error = " doit avoir 5 caracteres au minimum";
    
    if(validateEmail(mail) == false){
      document.querySelector(".modal-body").innerHTML = "Le mail doit respecter le format";
      myModal.show();
      index -= 1;
    }
    if(adresse.length < 5 || prenom == ""){
      document.querySelector(".modal-body").innerHTML = "L'adresse " + error;
      index -= 1;
      myModal.show();
    }
    if(validateDate(date) == false){
      document.querySelector(".modal-body").innerHTML = "La date doit etre logique";
      index -= 1;
      myModal.show();
    }
    if(prenom.length < 5 || prenom == ""){
      document.querySelector(".modal-body").innerHTML = "Le prenom " + error;
      index -= 1;
      myModal.show();
    }
    if(nom.length < 5 || nom == ""){
      document.querySelector(".modal-body").innerHTML = "Le nom " + error;
      index -= 1;
      myModal.show();
    }
    if(index == 5){
      document.querySelector(".modal-title").innerHTML = "Bienvenue " + prenom;
      document.querySelector(".modal-body").innerHTML = '<a href="http://maps.google.com/maps?q='+adresse+'"> <img src="https://maps.googleapis.com/maps/api/staticmap?markers='+adresse+'&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg" alt="google map" height=300 width=300/><br/> <span>Vous habitez à ' + adresse + '  </span></a><br/>'
      
      myModal.show();
    }
}