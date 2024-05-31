var nameErr = document.getElementById('name-error');
var emailErr = document.getElementById('email-error');
var messageErr = document.getElementById('message-error');
var checkErr = document.getElementById('check-error');
var submitErr = document.getElementById('submit-error');

//tester si le nom est valide
function validateName(){
    var name = document.getElementById('name').value;
    if((!name.match(/^[A-Za-z]*\s{1}[A-Za-z]+$/)) || name.length == 0){
        return false;
    }
    nameErr.innerHTML = '';
    return true;
}

//tester si l'email est valide
function validateEmail(){
    var email = document.getElementById('email').value;
    if((!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) || (email.length == 0)){
        return false;
    }
    emailErr.innerHTML = '';
    return true;
}

// tester si le message est  valide
function validateMessage(){
    var message = document.getElementById('message').value;
    var messageMinLength = 10;
    var nbrCaracters = messageMinLength - message.length;

    if(nbrCaracters>=0){return false;}
    messageErr.innerHTML = '';
    return true;
}

//valider le formulaire
function validateForm(){
    //si le champ du nom est vide ou faux alors on affiche un message d'erreur
    if(!validateName()){nameErr.innerHTML = "entrez votre nom au complet";
    setTimeout(function(){nameErr.style.display = 'none';}, 4000);}

    //si le champ de l'email est vide ou faux alors on affiche un message d'erreur
    if(!validateEmail()){emailErr.innerHTML = "entrez votre email";
    setTimeout(function(){emailErr.style.display = 'none';}, 4000);}

    //si le champ du message est vide ou faux alors on affiche un message d'erreur
    if(!validateMessage()){messageErr.innerHTML = "le message doit contenir au moins 10 caractères";
    setTimeout(function(){messageErr.style.display = 'none';}, 4000);}

    //si les champs ne sont pas valider alors la fonction retourne faux ce qui fait qu'on envoie pas le formulaire
    if(!validateName() || !validateEmail() || !validateMessage()){
        return false;
    }
    if(document.getElementById('agree').checked){
        document.getElementById("myform").reset();
        return true;
    } 
    else{
        alert('Vous devez accepter les conditions'); //l'utilisateur doit accepter les conditions afin d'envoyer son mmail pour des raison de confidentialité
        return false;
    }
}