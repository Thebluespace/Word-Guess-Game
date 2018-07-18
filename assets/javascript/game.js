
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++ Rick & Morty Hangman Game +++++++++++++++++++++++++++++++++++
++++++++++++++++++++++++++++++++++++ created by Thomas Greenme +++++++++++++++++++++++++++++++++++
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
                gameo.preventRefresh();
                var audio = new Audio("assets/media/loadsound.mp3");
                audio.autoplay = true;
                audio.play();
            } catch(error) {
                alert(error.message);
            }
            finally {
                gameo.formReset();
            }
        },
        guessChar: function() {
            // Guess character function executed on Guess button press
            try{
                // calls checkChar function to prevent guessing same character twice
                gameo.exists = false;
                gameo.exists = gameo.checkChar(document.getElementById("guessingchar").value)
                if (gameo.exists == true) {
                        alert("You already guessed " + document.getElementById("guessingchar").value + "!");
                        return;
                    }
            
                //Call function to check score
                if(gameo.checkScore()!= true){
                    return;
                }


                // writes current guessed characters to page and leaves blanks
                document.getElementById("wordtoguess").innerHTML = "";
                gameo.guessedChar.push(document.getElementById("guessingchar").value);  
                for (var i = 0; i < gameo.currentWord.length; i++)
                {
                    var u = 0;
                    var match = false;
                    for (u = 0; u < gameo.guessedChar.length; u++)
                    {
                        if (gameo.currentWord.charAt(i).toLowerCase() == gameo.guessedChar[u].toLowerCase()) {
                            match = true;
                            document.getElementById("wordtoguess").innerHTML += gameo.guessedChar[u] + " "; 
                        } 
                    }
                    if (match == false) {
                        if (gameo.currentWord.charAt(i) == " ") {
                            document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
                            } else {
                            document.getElementById("wordtoguess").innerHTML += "_ "; 
                        }
                    }
                }

                // writes guessed character to box
                document.getElementById("guessedchara").innerHTML = "";
                for (u = 0; u < gameo.guessedChar.length; u++)
                {
                    document.getElementById("guessedchara").innerHTML += gameo.guessedChar[u] + ", ";
                }

                // calls check word to see if complete word has been guessed
                gameo.won = gameo.checkWord();
                if (gameo.won == true)
                {
                    gameo.endGame();
                }
                return;
            } catch(error) {
                    alert(error.message);
            }
        },
        formReset: function() {
            try {
                gameo.attempts = 7;
                gameo.guessedChar = [];
                gameo.guessWordslist = ["Pickle Rick", "MR Meseeks", "Microverse Battery", "Jessica", "sea cucumber"];
                gameo.won = false;
                gameo.exists = false;
                document.getElementById("wordtoguess").innerHTML = "";
                document.getElementById("guessedchara").innerHTML = "";
                document.getElementById("attempts").innerHTML = "Attempts: " + gameo.attempts;
                document.getElementById("wins").innerHTML = "Wins: " + gameo.wins;
                document.getElementById("loses").innerHTML = "Loses: " + gameo.loses;
                gameo.currentWord = gameo.guessWordslist[Math.floor(Math.random() * gameo.guessWordslist.length)];
                //alert(gameo.currentWord);
                for (var i = 0; i < gameo.currentWord.length; i++)
                {
                    if (gameo.currentWord.charAt(i) == " ") {
                        document.getElementById("wordtoguess").innerHTML += "&nbsp;&nbsp;&nbsp;"; 
                    } else {
                        document.getElementById("wordtoguess").innerHTML += "_ "; 
                    }
                }
            }
            catch(error) {guessWordslist: ["Pickle Rick", "MR Meseeks", "Microverse Battery", "Jessica", "sea cucumber"],
                alert(error.message);
            }
        
        },
        endGame: function() {
            try {
                if(gameo.attempts >= 1){
                    var i = Math.floor(Math.random() * 3) + 1;
                    var audio = new Audio("assets/media/winsound/" + i + ".mp3");
                    audio.play();
                    alert("You won!\nThe word was: " + gameo.currentWord);
                    gameo.wins = gameo.wins + 1;
                } else {
                    var i = Math.floor(Math.random() * 3) + 1;
                    var audio = new Audio("assets/media/losesound/" + i + ".mp3");
                    audio.play();
                    alert("You lose!\nThe word was: " + gameo.currentWord);
                    gameo.loses = gameo.loses + 1;
                }
            } catch(error) {
                alert(error.message);
            }
            finally {
                gameo.formReset();
            }
        },
        checkChar: function(char) {
            for (u = 0; u < gameo.guessedChar.length; u++)
                {
                    if (char == gameo.guessedChar[u])
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
                var toCompare = gameo.currentWord.toLowerCase();
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
                for (var u = 0; u < gameo.currentWord.length; u++)
                {
                    if (gameo.currentWord.charAt(u).toLowerCase() == currentGuess.toLowerCase()) {
                        match = true;
                    }
                }
                if(match == false) {
                    gameo.attempts -= 1;
                    document.getElementById("attempts").innerHTML = "Attempts: "  + gameo.attempts;
                    //alert(gameo.attempts);
                }
                if(gameo.attempts == 0){
                    gameo.endGame();
                    return false;
                }
                return true;
        },
        preventRefresh: function(){
            try {
                document.getElementById("guessingchar").addEventListener("keydown", function(event) {
                if(event.keyCode != 8) {
                    if (event.keyCode == "13") {
                        event.preventDefault();
                        gameo.guessChar();
                    } else {
                        if(event.key.length == 1){
                            document.getElementById("guessingchar").value = event.key;
                        }
                    }
                }
                });
                } catch {
                    
                }
        },
        endForm: function(str){
            try {
                document.getElementById("wins").value = "Wins: " + gameo.wins;
                document.getElementById("loses").value = "Loses: " + gameo.loses;
            }
            catch (error) {
                alert(error.message);
            }
        }
};
