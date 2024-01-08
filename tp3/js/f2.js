window.onload = function () {   // ce code est exécuter une fois que toute la page est téléchargée par le navigateur
    // voir plus : https://www.w3schools.com/js/js_htmldom.asp
     console.log( "DOM ready!" );
     // Y mettre le code Javascript pour valider tous les champs du formulaire
     document.getElementById("exampleModalLabel").innerHTML = "Erreur"; 
 };

 

 var myModal = new bootstrap.Modal(document.getElementById('myModal'));

 el_mail=document.getElementById("mail")
 if(el_mail){
    el_mail.addEventListener('blur', function validateEmail() {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(el_mail.value).toLowerCase())){
          return true;
        }
        else{
          document.querySelector(".modal-body").innerHTML = "Le mail doit respecter le format";
          myModal.show();
          return false;
        }
      })
 }
  console.log(el_mail)
  el_adresse= document.getElementById("adresse")
  if (el_adresse){
      el_adresse.addEventListener('blur', function ValidateAdresse(){
          let adresse = el_adresse.value;
          if(adresse.length < 5 || adresse == ""){
            document.querySelector(".modal-body").innerHTML = "L'adresse doit contenir minimum 5 caracteres";
            myModal.show();
            return false;
          }
          else
              return true
      });
  }