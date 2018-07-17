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

        formStart: function(){
            try {
                var audio = new Audio("assets/media/loadsound.mp3");
                audio.autoplay = true;
                audio.play();
            } catch(error) {
                alert(error.message);
            }
            this.formReset();
        },
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
                if(this.checkScore()!= true){
                    return;
                }


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
                return;
            } catch(error) {
                    alert(error.message);
            }
        },
        formReset: function() {
            try {
                this.attempts = 7;
                this.guessedChar = [];
                this.won = false;
                this.exists = false;
                document.getElementById("wordtoguess").innerHTML = "";
                document.getElementById("guessedchara").innerHTML = "";
                document.getElementById("attempts").innerHTML = "Attempts: " + this.attempts;
                document.getElementById("wins").innerHTML = "Wins: " + this.wins;
                document.getElementById("loses").innerHTML = "Loses: " + this.loses;
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
            try {
                if(this.attempts >= 1){
                    var i = Math.floor(Math.random() * 3) + 1;
                    var audio = new Audio("assets/media/winsound/" + i + ".mp3");
                    audio.play();
                    alert("You won!\nThe word was: " + this.currentWord);
                    this.wins = this.wins + 1;
                } else {
                    var i = Math.floor(Math.random() * 3) + 1;
                    var audio = new Audio("assets/media/losesound/" + i + ".mp3");
                    audio.play();
                    alert("You lose!\nThe word was: " + this.currentWord);
                    this.loses = this.loses + 1;
                }
            } catch(error) {
                error.message
            }
            this.formReset();
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
            try {

            }
            catch(error) {
                alert(error.message);
            }
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
                    document.getElementById("attempts").innerHTML = "Attempts: "  + this.attempts;
                    //alert(this.attempts);
                }
                if(this.attempts == 0){
                    this.endGame();
                    return false;
                }
                return true;
        },
        preventRefresh: function(){
            document.getElementById("guessingchar").addEventListener("keydown", function(event) {
            if(event.keyCode != 8) {
                if (event.keyCode == "13") {
                    event.preventDefault();
                    gameo.guessChar();
                } else {
                    if(event.key != "undefined"){
                        document.getElementById("guessingchar").value = event.key;
                    }
                }
            }
            });
        },
        endForm: function(str){
            try {
                document.getElementById("wins").value = "Wins: " + this.wins;
                document.getElementById("loses").value = "Loses: " + this.loses;
            }
            catch (error) {
                alert(error.message);
            }
        }
};
