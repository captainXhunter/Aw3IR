window.onload = () => { // https://developer.mozilla.org/fr/docs/Web/API/Window/load_event
    const paramsString = document.location.search; // récupérer des données envoyées par le formulaire
    const searchParams = new URLSearchParams(paramsString); // https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams

    // Iterating the search parameters
    for (const param of searchParams) {
        console.log(param);

        const elementId = param[0];
        const elementValue = param[1];
        const element = document.getElementById(elementId);

        if (element !== null) {
            element.textContent = elementValue;
        }
        if (param[0] === "address") {
            element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
        } else if (param[0] === "email") {
            element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
        }
    }
};

function submitForm() {
    var nom = document.getElementById('nom');
    var prenom = document.getElementById('prenom');
    var birthday = document.getElementById('birthday');
    var adresse = document.getElementById('adresse');
    var email = document.getElementById('email');
    window.location.href = "action.html?nom=" + nom + "&prenom=" + prenom + "&birthday=" + birthday + "&adresse=" + adresse + "&email=" + email;
}