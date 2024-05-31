//START PARTIE classement des ecuries

//Lancer une requete de la page Web vers le serveur pour récupérer le fichier XML
//Mode Asynchrone
function loadDoc2() {
  const xhr = new XMLHttpRequest(); //Créer un objet XMLHttpRequest
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
       RemplirLesTables(this);
    }
  
  }
  xhr.open("POST", "classementEcuries.xml");
  xhr.send();
}
//Remplir le tableau DEMO avec Les rangs- Les drapeaux- Les equipes et leurs points
function RemplirLesTables(xml) {
const xmlDoc = xml.responseXML;
const x = xmlDoc.getElementsByTagName("ecurie");

let table="";
for (let i = 0; i <x.length; i++) {       
  table += "<tr><td>" +
  x[i].getElementsByTagName("rang")[0].childNodes[0].nodeValue +
  `</td><td> <img src='images/${x[i].getElementsByTagName('drapeau')[0].childNodes[0].nodeValue}.png' alt='Girl in a jacket' width='55' height='35'> </td><td>` +
  x[i].getElementsByTagName("drapeau")[0].childNodes[0].nodeValue +
  "</td><td>" +
  x[i].getElementsByTagName("equipe")[0].childNodes[0].nodeValue + 
  "</td><td>" +
  x[i].getElementsByTagName("moteur")[0].childNodes[0].nodeValue + 
  "</td><td>" +
  x[i].getElementsByTagName("points")[0].childNodes[0].nodeValue + 
  "</td></tr>";
}
document.getElementById("demo2").innerHTML = table;
}