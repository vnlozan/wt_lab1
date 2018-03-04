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
	}
}
function clearQuestionsDiv(){
    while(questionDiv.firstChild){
        questionDiv.removeChild(questionDiv.firstChild);
    }
}