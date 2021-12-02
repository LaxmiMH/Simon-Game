var buttonColors = [ "red", "blue", "green", "yellow"];

var emptyPattern = [];

var userClickedPattern= [];
var level = 0;

var started = false;


//start the game
$(document).keypress(function() {
  if (!started) {
    $("h2").text("Level " + level);

  
      nextSequence();
  
    
    started = true;
    console.log(started)
  }
});

//If user clicks on button make particular sound
$('.btn').click( function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);  
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length-1);
    
})

//check user answer
function checkAnswer(currentLevel) {

  if (emptyPattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    if (userClickedPattern.length === emptyPattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

   } else {
     playSound("wrong")
    $('body').addClass("game-over");
    $('h2').text("Game Over, Press any Key to Restart");


     setTimeout(
       function() {
        $('body').removeClass("game-over");
      },200);
      
     startOver();

  }

}

//RESTARING GAME
function startOver () {
  level = 0;
  started = false;
  emptyPattern = [];

}


//starting randomly take color and make sound
function nextSequence() {
  userClickedPattern = [];

    level++;
   $("h2").text("Level  " + level);
   
   var randomNumber = Math.floor(Math.random()  * 4 );
    var randomChosenColor = buttonColors[randomNumber];
    emptyPattern.push(randomChosenColor);
    
    $("#" +randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
   
    playSound(randomChosenColor);
  
}

//perform play sound action
function playSound (name) {
    var buttonSound = "sounds/"+  name + ".mp3";
    var audio = new Audio(buttonSound);
    audio.play();
}

//adding  animation to user clicks
function animatePress(currentColor) {
    $(currentColor).addClass("pressed")
   setTimeout (function () {
       $(currentColor).removeClass("pressed")
   }, 100)
}


