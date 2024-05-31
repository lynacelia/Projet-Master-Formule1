/*---------------------------------------------------------plustitres.html---------------------------------------------------------------------------*/
// fonction pour le systeme d'onglets
( function () {
  var AfficherOnglet = function(a)
  { var plustitres = document.querySelector(".plustitres")
    var tabs_li = a.parentNode
  
    //on retire la classe active de l'onglet actif
    // on ajoute la classe active à l'onglet actuel
    if(tabs_li.classList.contains('active'))
    {return false}
  
    plustitres.querySelector('.tabs .active').classList.remove('active')
    tabs_li.classList.add('active')
  
    //on retire la classe active du contenu actif
     // on ajoute la classe active au contenu correspondant au clic 
     plustitres.querySelector('.tab-content.active').classList.remove('active')
     plustitres.querySelector(a.getAttribute('href')).classList.add('active')
    }
  
  
  var tabs = document.querySelectorAll('.tabs a')
  for(var i =0; i<tabs.length;i++ )
  {tabs[i].addEventListener('click',function(e){
    AfficherOnglet(this)
  })
  }  
  
  // pour récuperer l'ancre window.location
  
  // je récupère le hash
  // ajouter la class active sur le lien href="hash"
  // retirer la class activ dur les autres onglets
  // afficher / masquer les contenus correspondants
  
  var hash = window.location.hash
  var a = document.querySelector('.plustitres a[href="'+ hash +'"]')
  if (a!== null && !a.parentNode.classList.contains('active')) 
  {  AfficherOnglet(a)
  }
  })()