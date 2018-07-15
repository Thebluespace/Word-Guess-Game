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
                document.getElementById("attempts").innerHTML = "Wins: " + this.attempts;
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
            if(this.attempts >= 1){
                alert("You won!");
                this.wins = this.wins + 1;
            } else {
                alert("You lose!");
                this.loses = this.loses + 1;
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
                }
        },
        preventRefresh: function(){
            document.getElementById("guessingchar").addEventListener("keydown", function(event) {
            if(event.keyCode != 8) {
                if (event.keyCode == "13") {
                    event.preventDefault();
                    gameo.guessChar();
                } else {
                    document.getElementById("guessingchar").value = event.key;
                }
            }
            });
        },
        endForm: function(str){
                try {
                    document.getElementById("wins").value = "Wins: " + this.wins;
                    document.getElementById("loses").value = "Loses: " + this.loses;
                    // document.getElementById("wbgi").style.display = "block";
                    // document.getElementById("goheader").style.display = "block";
                    // document.getElementById("gotext").style.display = "block";
                    // document.getElementById("gobutton").style.display = "block";

                // var gamerover = document.createElement("div");
                // var goheader = document.createElement("h1");
                // goheader.setAttribute("class","goheader");
                // var gotext = document.createElement("p");
                // gotext.setAttribute("class","gotext");
                // gotext.innerHTML.value = "Wins: " + this.wins + "<br>" + "Loses: " + this.loses + "<br><br>" + "Word: " + this.currentWord;
                // var gotimer = document.createElement("p");
                // gotimer.setAttribute("class","gotimer");
                // gotimer.setAttribute("id","gotimer");
                // gamerover.style.backgroundImage = "url(../images/win.jpeg)";
                // gamerover.setAttribute("style", "background-position: center center; background-repeat: no-repeat; background-size: 100% 100%; position: fixed; margin: 25%; height: 50%; width: 50%;");
                if (str == "win") {
                    // gamerover.setAttribute("class","wbgi");
                    // document.body.prependChild(gamerover);
                    // goheader.textContent = "You Win!";
                    // document.getElementsByClassName("wbgi")[0].appendChild(goheader);
                    // document.getElementsByClassName("wbgi")[0].appendChild(gotimer);
                } else {
                    // gamerover.setAttribute("class","lbgi");
                    // document.body.prependChild(gamerover);
                    // goheader.textContent = "You Lose!";
                    // document.getElementsByClassName("lbgi")[0].appendChild(goheader);
                    // document.getElementsByClassName("lbgi")[0].appendChild(gotimer);
                }

        //         this.startTimer();
        //         alert("ALERT");
        //         if (str == "win") {
        //             document.getElementsByClassName("wbgi")[0].style.display = "none";
        //         } else {
        //             document.getElementsByClassName("lbgi")[0].style.display = "none";
        //         }
                
        //         this.formReset();
            }
            catch (error) {
                alert(error.message);
            }
        }
};

//add event listener to prevent refresh when pressing enter
// document.body.addEventListener("keydown", function(event) {
//     event.preventDefault();
//     if (event.keyCode === 13) {
//         this.guessChar();
//     }
// });