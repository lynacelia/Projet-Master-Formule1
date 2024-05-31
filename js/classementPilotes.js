//START PARTIE classement des pilotes

//Lancer une requete de la page Web vers le serveur pour récupérer le fichier XML
//Mode Asynchrone
function loadDoc() {
  const xhr = new XMLHttpRequest(); //Créer un objet XMLHttpRequest
  xhr.onreadystatechange = function() {
    if (xhr.readyState==4 && xhr.status==200) {
       RemplirLesTables1(this);
    }
  }
  xhr.open("GET", "classementPilotes.xml");
  xhr.send();
}
//Remplir le tableau demo1 avec Les rangs- Les drapeaux- Les joueurs- Les équipes et les points
function RemplirLesTables1(xml) {
const xmlDoc = xml.responseXML;
const x = xmlDoc.getElementsByTagName("pilote");
let table="";
for (let i = 0; i <x.length; i++) {       
  table += "<tr><td>" +
  x[i].getElementsByTagName("rang")[0].childNodes[0].nodeValue +
  `</td><td> <img src='images/${x[i].getElementsByTagName('drapeau')[0].childNodes[0].nodeValue}.png' alt='image' width='55' height='35'> </td><td>` +
  x[i].getElementsByTagName("drapeau")[0].childNodes[0].nodeValue +
  "</td><td>" +
  x[i].getElementsByTagName("joueur")[0].childNodes[0].nodeValue + 
  "</td><td>" +
  x[i].getElementsByTagName("equipe")[0].childNodes[0].nodeValue + 
  "</td><td>" +
  x[i].getElementsByTagName("points")[0].childNodes[0].nodeValue + 
  "</td></tr>";
}
document.getElementById("demo1").innerHTML = table;
}