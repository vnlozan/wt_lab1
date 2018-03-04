var questionCounter = 0; 
var userChoices = []; 
readTextFile('data_q.json', function(allText) {
    var questions = JSON.parse(allText);
    console.log(questions);
    
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
