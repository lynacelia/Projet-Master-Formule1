//START PARTIE CALENDRIER

//Lancer une requete de la page Web vers le serveur pour récupérer le fichier XML
//Mode Asynchrone
function loadDoc() {
  const xhr = new XMLHttpRequest(); //Créer un objet XMLHttpRequest
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
       RemplirLesTables(this);
       TimerPourChaqueDate(this);
    }
  
  }
  xhr.open("POST", "calendrier.xml");
  xhr.send();
}
//Remplir le tableau DEMO avec Les Dates- Les Pays- Le Lieu
function RemplirLesTables(xml) {

  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("course");
  const time = document.getElementById("try");
  time.innerHTML="";
  let table="";
  for (let i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
    `</td><td> <img src='images/${x[i].getElementsByTagName('drapeau')[0].childNodes[0].nodeValue}.png' alt='image' width='55' height='35'> </td><td>` +
    x[i].getElementsByTagName("drapeau")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("lieu")[0].childNodes[0].nodeValue +
    "</td></tr>";
//Remplir le Tableau TRY avec <tr><td><div id=i>..
//nous en aurons besoin pour le COUNTDOWN timer
    tr= document.createElement('tr');
    td= document.createElement('td');
    div = document.createElement('div');
     div.setAttribute("id", i);
     td.appendChild(div);
     tr.appendChild(td);
     time.appendChild(tr);
  
  }
  document.getElementById("demo").innerHTML = table;
}

//Créer COUNTDOWN Timer
function Timer(espace) {
//créer un objet clock
//1- espace pour l'affichage
//2- Calcul pour calculer le temps restant
//3- arret pour la date souhaitée
var clock = {
    espace: espace,
    arret: null,
    intervalID:0,
    Calcul: function () {
        var _second = 1000;
        var _minute = _second * 60;
        var _hour = _minute * 60;
        var _day = _hour * 24;

        var now = new Date();

        var distance = clock.arret - now;
        if (distance < 0) {

            clearInterval(clock.intervalID);
            clock.espace.innerHTML = 'EXPIRED!';

            return;
        }

        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        clock.espace.innerHTML = days + ' Jours | ' + hours + ' Heures | ' + minutes + ' Minutes | ' + seconds + ' Secondes ';

    }
}

this.countDown = function (arret) {
    clock.arret = arret;
    clock.intervalID = setInterval(clock.Calcul, 1000);
}
}
//Créer pour chaque date sa propre countdown timer
//placer le timer dans le tableau try
function TimerPourChaqueDate(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("course");
  var timers = {};
  for (let i = 0; i < x.length; i++) {
//Appel fonction Timer avec les lignes de table try comme parametres
   timers.i = new Timer(document.getElementById(i));
   timers.i.countDown(new Date(x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue));
  }
}
//END PARTIE CALENDRIER