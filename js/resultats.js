//START PARTIE Resultats des courses

//Lancer une requete de la page Web vers le serveur pour récupérer le fichier XML
//Mode Asynchrone
function loadDoc(){
    const xhr = new XMLHttpRequest(); //Créer un objet XMLHttpRequest
    xhr.onreadystatechange = function() {
      if (xhr.readyState==4 && xhr.status==200) {
         RemplirLesTables(this);
      }
    }
    xhr.open("GET", "resultats.xml");
    xhr.send();
  }
  //Remplir le tableau demo1 avec Les grand Prix- Les dates- Les gagnants- Les voitures et les tours et le temps
  function RemplirLesTables(xml) {
  const xmlDoc = xml.responseXML;
  const x = xmlDoc.getElementsByTagName("resultat");
  let table="";
  for (let i = 0; i <x.length; i++) {       
    table += "<tr><td>" +
    x[i].getElementsByTagName("grandPrix")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("gagnant")[0].childNodes[0].nodeValue + 
    "</td><td>" +
    x[i].getElementsByTagName("voiture")[0].childNodes[0].nodeValue + 
    "</td><td>" +
    x[i].getElementsByTagName("tours")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("temps")[0].childNodes[0].nodeValue + 
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
  }