var guessWordslist = ["Pickle Rick", "MR Meseeks", "Microverse Battery", "Jessica", "sea cucumber"];
var guessedChar = [];
var currentWord= "";
var exists;
var won;

function guessChar() {
    try{
        exists = checkChar(document.getElementById("guessingchar").value)
        if (exists == true) {
                alert("You already guessed " + document.getElementById("guessingchar").value + "!");
                return;
            }
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
            if (match == false) {
                if (currentWord.charAt(i) == " ") {
                    document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
                    } else {
                    document.getElementById("wordtoguess").innerHTML += "_ "; 
                }
            }
        }
        document.getElementById("guessedchara").innerHTML = "";
        for (u = 0; u < guessedChar.length; u++)
        {
            document.getElementById("guessedchara").innerHTML += guessedChar[u] + ", ";
        }
        won = checkWord();
        if (won == true)
        {
            endGame();
        }
    }
    catch(error) {
            alert(error.message);
    }
    return;
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
    alert("You won!");
};

function checkChar(char) {
    for (u = 0; u < guessedChar.length; u++)
        {
            if (char == guessedChar[u])
            {
                return true;
            }
        }
    return false;
};

function checkWord() {
        var currentGuess = document.getElementById("wordtoguess").value;
        var wordsplit = currentWord.split(" ");
        if (currentGuess.includes(wordsplit[0]) && currentGuess.includes(wordsplit[1]))
        {
            return true;
        }
        return false;
};

function startTimer() {

};

