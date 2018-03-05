var questionCounter = 0;
var questions = 0;
var answers = new Array();
var userChoices = []; 
var questionDiv = document.getElementById('questions_div');
var buttonNext = document.getElementById("button_next");
var buttonPrev = document.getElementById("button_prev");
var qTimer = document.getElementById("quiz_timer");
var now;
var countDownDate; 
var timerId;

readTextFile('data_q.json', function(allText) {
    questions = JSON.parse(allText);
    questions.forEach(function(obj,i){
        var answer = new Object();
        answer.question = obj.question;
        answer.rightAns = obj.choices[obj.correctAnswer];
        answer.userAns = -1;
        answers.push(answer);
    });
	displayNext();
    navigationButtonsEvents();
    setTimerEvents();

});
function readTextFile(file, callback){
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);

    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                callback(rawFile.responseText);
            }
        }
    }
    rawFile.send(null);
}
function displayNext(){
    if(questionCounter == 0){
        buttonPrev.disabled = true;
    }else{
        buttonPrev.disabled = false;
    }
	if(questionCounter<questions.length){
        clearQuestionsDiv();
        var label = document.createElement('div');
        label.className = 'current_question';
        label.innerText = questions[questionCounter].question;
        questionDiv.appendChild(label);
        var ansDiv = document.createElement('div');
        ansDiv.id = 'choices_div';
        ansDiv.className = 'choices_div';
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            var answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = 'choice';
            answerInput.value = i;
            answerInput.setAttribute("onclick",'handleClick(this);');
            answerInput.id = "answer_"+i;
            answerInput.className = 'answer';
            var answerLabel = document.createElement('label');
            answerLabel.setAttribute('for',answerInput.id);
            answerLabel.innerHTML = questions[questionCounter].choices[i];

            var choice = document.createElement('div');
            choice.id = 'choice_'+i;
            choice.className = 'choice-data';
            choice.appendChild(answerInput);
            choice.appendChild(answerLabel);

            ansDiv.appendChild(choice);
        }
        questionDiv.appendChild(ansDiv);
	}
}
function clearQuestionsDiv(){
    while(questionDiv.firstChild){
        questionDiv.removeChild(questionDiv.firstChild);
    }
}
function navigationButtonsEvents(){
    buttonNext.addEventListener("click",function(e){
        if(questionCounter < (questions.length -1)){
            questionCounter++;
            displayNext(questions);
        }
    },false);
    buttonPrev.addEventListener("click",function(e){
        if(questionCounter > 0 ){
            questionCounter--;
            displayNext(questions);
        }
    },false);
}
function handleClick(currRadio) {
    answers[questionCounter].userAns = questions[questionCounter].choices[currRadio.value];
}
function setTimerEvents(){
    now = new Date();
    countDownDate = new Date(now.getTime() + (1 * 60 * 1000));
    timerId = setInterval(function() {
        now = new Date();
        var diff = countDownDate - now;
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        //console.log(seconds);
        if(diff < 0){
            clearInterval(timerId);
        }
    }, 1000);

}