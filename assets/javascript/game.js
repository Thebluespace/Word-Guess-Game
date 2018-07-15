/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++ Rick & Morty Hangman Game +++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++ created by Thomas Greene ++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

// game object housing all variables and functions
var gameo = {
    guessWordslist: ["Pickle Rick", "MR Meseeks", "Microverse Battery", "Jessica", "sea cucumber"],
    guessedChar: [],
    currentWord: "",
    exists: false,
    won: false,
    attempts: 0,
    wins: 0,
    loses: 0,

        guessChar: function() {
            // Guess character function executed on Guess button press
            try{
                // calls checkChar function to prevent guessing same character twice
                this.exists = this.checkChar(document.getElementById("guessingchar").value)
                if (this.exists == true) {
                        alert("You already guessed " + document.getElementById("guessingchar").value + "!");
                        return;
                    }
            
                //Call function to check score
                this.checkScore();

                // writes current guessed characters to page and leaves blanks
                document.getElementById("wordtoguess").innerHTML = "";
                this.guessedChar.push(document.getElementById("guessingchar").value);  
                for (var i = 0; i < this.currentWord.length; i++)
                {
                    var u = 0;
                    var match = false;
                    for (u = 0; u < this.guessedChar.length; u++)
                    {
                        if (this.currentWord.charAt(i).toLowerCase() == this.guessedChar[u].toLowerCase()) {
                            match = true;
                            document.getElementById("wordtoguess").innerHTML += this.guessedChar[u] + " "; 
                        } 
                    }
                    if (match == false) {
                        if (this.currentWord.charAt(i) == " ") {
                            document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
                            } else {
                            document.getElementById("wordtoguess").innerHTML += "_ "; 
                        }
                    }
                }

                // writes guessed character to box
                document.getElementById("guessedchara").innerHTML = "";
                for (u = 0; u < this.guessedChar.length; u++)
                {
                    document.getElementById("guessedchara").innerHTML += this.guessedChar[u] + ", ";
                }

                // calls check word to see if complete word has been guessed
                this.won = this.checkWord();
                if (this.won == true)
                {
                    this.endGame();
                }
            }
            catch(error) {
                    alert(error.message);
            }
            return;
        },
        formReset: function() {
            try {
                this.attempts = 7;
                document.getElementById("wordtoguess").innerHTML = "";
                this.currentWord = this.guessWordslist[Math.floor(Math.random() * this.guessWordslist.length)];
                //alert(this.currentWord);
                for (var i = 0; i < this.currentWord.length; i++)
                {
                    if (this.currentWord.charAt(i) == " ") {
                        document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
                    } else {
                        document.getElementById("wordtoguess").innerHTML += "_ "; 
                    }
                }
            }
            catch(error) {
                alert(error.message);
            }
        
        },

        endGame: function() {
            if(this.attempts >= 1){
                alert("You won!");
            } else {
                alert("You lose!");
            }
        },
        checkChar: function(char) {
            for (u = 0; u < this.guessedChar.length; u++)
                {
                    if (char == this.guessedChar[u])
                    {
                        return true;
                    }
                }
            return false;
        },
        checkWord: function() {
            try {
            var state = false;
                var compareGuess = document.getElementById("wordtoguess").innerHTML.toString().toLowerCase();
                while (compareGuess.includes(" ")) {
                    while (compareGuess.includes("&nbsp;")){
                        compareGuess = compareGuess.replace("&nbsp;","");
                    }
                    compareGuess = compareGuess.replace(" ","");
                    //alert(compareGuess); // for debugging
                }
                var toCompare = this.currentWord.toLowerCase();
                while (toCompare.includes(" ")) {
                    toCompare = toCompare.replace(" ","");
                    //alert(toCompare); // for debugging
                }
                if (compareGuess == toCompare)
                {
                    //alert("Match!");
                    state = true;
                }
        
                return state;
            }
            catch (error) {
                alert(error.message);
            }
        },
        startTimer: function() {

        },
        checkScore: function(){

            // checks current guessing char to see if it matches any char in the currentWord
            var match = false;
            var currentGuess = document.getElementById("guessingchar").value;
                for (var u = 0; u < this.currentWord.length; u++)
                {
                    if (this.currentWord.charAt(u).toLowerCase() == currentGuess.toLowerCase()) {
                        match = true;
                    }
                }
                if(match == false) {
                    this.attempts -= 1;
                    //alert(this.attempts);
                }
                if(this.attempts == 0){
                    this.endGame();
                }
        }
};


// function formReset() { // old code, shifted everything inside of object 'gameo'
//     try {
//         document.getElementById("wordtoguess").innerHTML = "";
//         var newWord = guessWordslist[Math.floor(Math.random() * guessWordslist.length)];
//         currentWord = newWord;
//         alert(currentWord);
//         for (var i = 0; i < newWord.length; i++)
//         {
//             if (newWord.charAt(i) == " ") {
//                 document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
//             } else {
//                 document.getElementById("wordtoguess").innerHTML += "_ "; 
//             }
//         }
//     }
//     catch(error) {
//         alert(error.message);
//     }

// };

// function endGame() {
//     alert("You won!");
// };

// function checkChar(char) {
//     for (u = 0; u < guessedChar.length; u++)
//         {
//             if (char == guessedChar[u])
//             {
//                 return true;
//             }
//         }
//     return false;
// };

// function checkWord() {
//     try {
//     var state = false;
//         var compareGuess = document.getElementById("wordtoguess").textContent.toString().toLowerCase();
//         while (compareGuess.includes(" ")) {
//             var compareGuess = compareGuess.replace(" ","");
//         }
//         var toCompare = currentWord.toLowerCase().replace(" ","");
//         //alert(toCompare);
//         //alert(compareGuess);
//         if (compareGuess == toCompare)
//         {
//             //alert("Match!");
//             state = true;
//         }

//         return state;
//     }
//     catch (error) {
//         alert(error.message);
//     }
// };

// function startTimer() {

// };