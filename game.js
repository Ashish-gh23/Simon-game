
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var started=false;
var level=1;
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
  if (!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;

  }
});

function checkAnswer(index){
  if (userClickedPattern[index]===gamePattern[index]){
    if (index===gamePattern.length-1){
      level+=1;
      $("#level-title").text("Level "+level);
      setTimeout(nextSequence(), 100);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  gamePattern=[];
  started=false;
  level=1
}

function nextSequence() {
  userClickedPattern=[]
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
