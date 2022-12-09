buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

let gameStarted = false;
let level = 0;

/* to play the btn sounds */
function playSound(color){
    var audio = new Audio( "sounds/" + color + ".mp3");
    audio.play();
}

/* to animate btn selected */
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")    

    setTimeout(function (){
            $("#" + currentColor).removeClass("pressed")
        },100)
}

/* start the game */
$(window).on( "keydown", function () {
    if (gameStarted === false){
        nextSequence()      
        gameStarted = true        
    }

} )

function nextSequence(){

    userClickedPattern = []

    randomNumber = Math.round(Math.random()*3)

    randomChosenColor = buttonColors[randomNumber]

    gamePattern.push(randomChosenColor)
    
   /*  playSound(randomChosenColor)
    
    animatePress(randomChosenColor) */

    level++;

    $("h1").html("Level " + level)  
    
    /* Easy Mode */
    /* for (let i = 0; i < gamePattern.length; i++){
        setTimeout(function(){
            playSound(gamePattern[i])    
            animatePress(gamePattern[i])
        }, 1000 * i)
    }
     */
}

$(".btn").click( e => {
    let userChosenColor = e.target.id
    userClickedPattern.push(userChosenColor)
    
    playSound(userChosenColor)

    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            },1000)           
        }
    }else {
        var audio = new Audio( "sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over")

        setTimeout(function(){
            $("body").removeClass("game-over")
            
        },200)

        $("h1").html("Game Over, Press Any Key to Restart")
        startOver();          
    } 
}

function startOver(){
    level= 0,
    gamePattern = [];
    gameStarted = false;
}


