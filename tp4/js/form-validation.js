var myModal = new bootstrap.Modal(document.getElementById('myModal'));
document.getElementById("exampleModalLabel").innerHTML = "Erreur";
let loc = document.getElementById("gps");
if(loc){
    loc.addEventListener('click', getLocation);
}

function masquerMessage(){document.getElementById("message").setAttribute("style", "display:none;");}

function count_caracteres(id){
    value = document.querySelector(`#${id}`).value.length + 1;
    document.getElementById("span"+id).textContent = this.value + "car.";
}

function count_caracteres_inv(id){
    let doc = document.getElementById(id)
    doc.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' || e.key === 'Backspace'){
            value = document.querySelector(`#${id}`).value.length - 1;
            if(value == -1)
                value = 0;
            document.getElementById("span"+id).textContent = this.value + "car.";
        }
    });
}

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
    if( formatage <= date || date == '' || date < 5)
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
    let name = document.getElementById(nom).value;
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
    let prenom = document.getElementById("prenom").value;
    let nom = document.getElementById("nom").value;
    let date = document.getElementById("date").value;
    let mail = document.getElementById("mail").value;
    
    if(
    validateOthers("nom") && 
    validateOthers("prenom") && 
    validateAdresse("adresse") && 
    validateDate() &&
    validateEmail()
    ){
    contactStore.add(nom, prenom, date, adr, mail);
    contactList = contactStore.getList();
    document.querySelector("table tbody").innerHTML="";
    for (var index in contactList) {
        
        document.querySelector("table tbody").innerHTML = document.querySelector("table tbody").innerHTML + "<tr><td>" + contactList[index].name + "</td><td>" + contactList[index].firstname +"</td><td>" + contactList[index].date +"</td><td>" + contactList[index].adress +"</td><td>" +contactList[index].mail + "</td></tr>";
        document.getElementById("liste").setAttribute('style', "display:block");
        document.getElementById("message").setAttribute('style', "display:block");
        window.setTimeout(masquerMessage, 3000);
    }
    }
    else{
    document.querySelector(".modal-body").innerHTML = 'Tous les champs sont obligatoires';
    myModal.show();
    }
}