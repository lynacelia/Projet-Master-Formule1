/*partie quiz*/

//récupérer les différents boutons start-btn, next-btn et finish-btn.
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const finishBtn = document.getElementById('finish-btn');
const restartBtn = document.getElementById("restart-btn"); 

//récupérer les différentes div de la page Quiz (quiz-intro, quiz-container et quiz-result)
const quizIntro = document.getElementById("quiz-intro");         
const quizContainer = document.getElementById("quiz-container"); 
const quizResult = document.getElementById("quiz-result");

//rrécupére les etiquettes h4 pour afficher la question, et h3 pour afficher son numéro 
const questionNumero = document.getElementById("question-numero");
const questionElement = document.getElementById('question-title');

// récupére la div answers-container pour afficher les réponses proposées
const answersContainer = document.getElementById('answers-container');

//récupérer les étiquettes p et h2 afin d'afficher le score et un commentaire sur ce dernier
const score = document.getElementById("score");
const scorePrise = document.getElementById("score-prise");

let shuffledQuestions, currentIndex; //afin d'ordoner les questions aléatoirement et aller à la
                                     //question suivante
let count = 0, i=0; //variables pour compter le score obtenu et le numéro de la question

//evenement pour debuter le quiz
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', ()=>{
    currentIndex++;
    setNextQuestion();
    clearBody()
})

//evenement pour la fin du quiz qui donne le score avec un bouton pour recommencer
finishBtn.addEventListener('click', ()=>{
    //aficher le score obtenu
    score.textContent = "Votre score est : "+ count +" sur 10";

    //aficher un commentaire selon le score obtenu
    if(count <=5){scorePrise.textContent= "Eh bien, vous allez devoir travailler encore plus!";}
    else if(count >=6 && count<=8){scorePrise.textContent= "Tu as bien fait, Bravo!";}
    else{scorePrise.textContent="Félicitation, vous avez fait un excellent travail!";}
    quizContainer.classList.add("hide");
    quizResult.classList.remove("hide");
    clearBody();
    resetState();
})

/* en cliquant sur le bouton recommancer, la fonction est appelée. La div quiz-intro 
sera affichée, et la div quiz-result sera masquée et donc ne s'affichera pas. Le bouton 
finish sera remplacer par le bouton next, ainsi on paurra refaire le quiz une autre fois*/
restartBtn.addEventListener('click', ()=>{
    quizResult.classList.add("hide");
    finishBtn.classList.add('hide');
    nextBtn.classList.remove('hide');
    startGame();
})

/*en cliquant sur le bouton commancer ou recommancer, la fonction startGame est appelée. 
La div quiz-intro ne sera pas affichée, à ca place, la div quiz-container contenant les 
questions va apparaître et cela permettra de commancer le quiz. L'ordre des questions 
est fait aléatoirement*/
function startGame(){
    quizIntro.classList.add("hide");
    quizContainer.classList.remove("hide");
    shuffledQuestions = questions.sort(()=> Math.random() - .5);
    currentIndex = 0;
    resetState();
    count = 0;
    i = 0;
    showQuestion(shuffledQuestions[currentIndex]);
}

//cette fonction affiche les questions 
function showQuestion(question){
    //afficher le numéro de la question
    questionNumero.textContent = "Question " + (i+1) + " sur 10";

    //afficher la question
    questionElement.innerText = question.question;

    //afficher les reponses proposées
    answersContainer.classList.remove('hide');
    question.answers.sort(()=> Math.random() - .5);
    question.answers.forEach((answer)=>{
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    })
}

//cette fonction permet de passer a la prochaine question
function setNextQuestion(){
    i++;
    resetState();
    lastQuestion();
    showQuestion(shuffledQuestions[currentIndex]);
}

function resetState(){
    while(answersContainer.firstChild){
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

//si la reponse est juste on incrémente le score et on montre les réponses justes et fausses
//en changant la couleur des boutons 
function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answersContainer.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct);
        button.removeEventListener('click', selectAnswer);
    })
    if(correct){
        count++;
        console.log(count);
    }
}

//ajouter les elements correctes a correct et les elements incorrects a wrong
function setStatusClass(element, correct){
    if (correct) {
        element.classList.add('correct');
      } else {
        element.classList.add('wrong');
      }
}

//fonction qui decremente le nombre de questions pour parcourir toutes les questions sans repetition
function lastQuestion(){
    if(currentIndex === questions.length - 1){
        nextBtn.classList.add('hide');
        finishBtn.classList.remove('hide');
    }
}

//reinitialiser le quiz
function clearBody(){
    document.body.classList.remove('wrong');
    document.body.classList.remove('correct'); 
}

// le tableau questions contient toutes les questions du quiz ainsi que les réponses proposées
const questions = [
    {
    question: "En quelle année eut lieu le tout premier Grand Prix de Formule 1 ?",
    answers:[
        { 
            text: "1942", correct: false
        },
        {
            
            text: "1947", correct: false
        },
        {
            
            text: "1950", correct: true
        },
        {
            
            text: "1955", correct: false
        }
    ]
},
{
    
    question: "Lequel de ces constructeurs automobiles n’a jamais participé à un Grand Prix de Formule 1 ?",
    answers:[{
            
            text: "BMW", correct: false
        },
        {
            
            text: "Bugatti", correct: false
        },
        {
            
            text: "Nissan", correct: true
        },
        {
            
            text: "Maserati", correct: false
        }
    ],
},
{
    
    question: "Quel pilote a remporté le plus de victoires en Formule 1 ?",
    answers:[{
            
            text: "Juan Manuel Fangio", correct: false
        },
        {
            
            text: "Lewis Hamilton", correct: true
        },
        {
            
            text: "Michael Schumacher", correct: false
        },
        {
            
            text: "Ayrton Senna", correct: false
        }
    ],
},
{
    
    question: "Quelle écurie a remporté le plus de fois le championnat des constructeurs ?",
    answers:[{
            
            text: "Ferrari", correct: true
        },
        {
            
            text: "Lotus", correct: false
        },
        {
            
            text: "McLaren", correct: false
        },
        {
            
            text: "Mercedes", correct: false
        }
    ],
},
{
    
    question: "Parmi ces nations, laquelle possède le plus grand nombre de pilotes différents devenus champions du monde de Formule 1 ?",
    answers:[{
            
            text: "Grande-Bretagne", correct: true
        },
        {
            
            text: "Brésil", correct: false
        },
        {
            
            text: "Allemagne", correct: false
        },
        {
            
            text: "Italie", correct: false
        }
    ],
},

{
    
    question: "Lequel de ces pays n’a jamais accueilli un Grand Prix de Formule 1 ?",
    answers:[{
            
            text: "Afrique du sud", correct: false
        },
        {
            
            text: "Grèce", correct: true
        },
        {
            
            text: "Maroc", correct: false
        },
        {
            
            text: "Suisse", correct: false
        }
    ],
},

{
    
    question: "Parmi ces circuits, lequel a connu le plus grand nombre d’accidents mortels dans le cadre d’un Grand Prix de Formule 1 ?",
    answers:[{
            
            text: "Monza", correct: false
        },
        {
            
            text: "Silverstone", correct: false
        },
        {
            
            text: "Spa-Francorchamps", correct: false
        },
        {
            
            text: "Nürburgring", correct: true
        }
    ],
},

{
    
    question: "Quel est le record de vitesse atteint par une Formule 1 et mesuré lors d’un Grand Prix ?",
    answers:[{
            
            text: "360,1 km/h", correct: false
        },
        {
            
            text: "370,1 km/h", correct: true
        },
        {
            
            text: "380,1 km/h", correct: false
        },
        {
            
            text: "390,1 km/h", correct: false
        }
    ],
},

{
    
    question: "Quel pilote détient le triste record du plus grand nombre de Grand Prix disputés sans n’être jamais monté sur le podium ?",
    answers:[{
            
            text: "Chris Amon", correct: false
        },
        {
            
            text: "Jean-Pierre Jarier", correct: false
        },
        {
            
            text: "Niko Hulkenberg", correct: true
        },
        {
            
            text: "Gerhard Berger", correct: false
        }
    ],
},

{
    
    question: "Quel était le tout premier français vainqueur d’un Grand Prix de Formule 1 ?",
    answers:[{
            
            text: "Maurice Trintignant", correct: true
        },
        {
            
            text: "Eugène Martin", correct: false
        },
        {
            
            text: "Louis Rosier", correct: false
        },
        {
            
            text: "Yves Giraud-Cabantous", correct: false
        }
    ],
},
];
/*fin de la partie quiz */


