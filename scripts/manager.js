var questionCounter = 0; 
var userChoices = []; 
var questionDiv = document.getElementById('questions_div');


// var innerDiv = document.createElement('div');
// innerDiv.className = 'block-2';
// questionDiv.appendChild(innerDiv);

readTextFile('data_q.json', function(allText) {
    var questions = JSON.parse(allText);
    console.log(questions);
	displayNext(questions);
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
function displayNext(questions){
	// console.log(questions.length);
	if(questionCounter<questions.length){
        clearQuestionsDiv();
        var label = document.createElement('label');
        label.className = 'current_question';
        label.innerText = questions[questionCounter].question;
        questionDiv.appendChild(label);
        var ansDiv = document.createElement('div');
        ansDiv.id = 'answers_div';
        ansDiv.className = 'answers_div';
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            var answerInput = document.createElement('input');
            answerInput.type = 'radio';
            answerInput.name = 'choice';
            answerInput.value = i;
            answerInput.id = "answer_"+i;
            answerInput.className = 'answer';
            var answerLabel = document.createElement('label');
            answerLabel.setAttribute('for',answerInput.id);
            answerLabel.innerHTML = questions[questionCounter].choices[i];

            var choice = document.createElement('div');
            choice.id = 'choice_'+i;
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