var guessWordslist = ["Pickle Rick", "MR Meseeks", "Microverse Battery", "Jessica", "sea cucumber"];
var guessedChar = [];
var currentWord= "";
var hasSpace;

function guessChar() {
    try{
        document.getElementById("wordtoguess").innerHTML = "";
        guessedChar.push(document.getElementById("guessingchar").value);  
        for (var i = 0; i < currentWord.length; i++)
        {
            var u = 0;
            var match = false;
            for (u = 0; u < guessedChar.length; u++)
            {
                if (currentWord.charAt(i).toLowerCase() == guessedChar[u].toLowerCase()) {
                    match = true;
                    document.getElementById("wordtoguess").innerHTML += guessedChar[u] + " "; 
                } 
            }
            if (match == true) {
                //do nothing
            } else {
                document.getElementById("wordtoguess").innerHTML += "_ ";
            }
        }
    }
    catch(error) {
            alert(error.message);
    }

};

function formReset() {
    try {
        document.getElementById("wordtoguess").innerHTML = "";
        var newWord = guessWordslist[Math.floor(Math.random() * guessWordslist.length)];
        currentWord = newWord;
        alert(currentWord);
        for (var i = 0; i < newWord.length; i++)
        {
            if (newWord.charAt(i) == " ") {
                document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
            } else {
                document.getElementById("wordtoguess").innerHTML += "_ "; 
            }
        }
    }
    catch(error) {
        alert(error.message);
    }

};

function endGame() {

};

function startTimer() {

};

