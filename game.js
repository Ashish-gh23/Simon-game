
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var started=false;
var level=1;

$(".btn").click(function() {
  if (!started && $(window).width() <=992){
    document.getElementById("mobile-title").style.display = "none";

    $("body").addClass("started");
    $("#level-title").text("Level "+level);
    document.getElementById("level-title").style.display = "block";
    nextSequence();
    started=true;

  }
else{
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  }
});

$(document).keypress(function(){
  document.getElementById("mobile-title").style.display = "none";

  $("body").addClass("started");
  if (!started){
    $("#level-title").text("Level "+level);
    document.getElementById("level-title").style.display = "block";
    nextSequence();
    started=true;

  }
});
function checkAnswer(index){
  if (userClickedPattern[index]===gamePattern[index]){
    if (index===gamePattern.length-1){
      level+=1;
      $("#level-title").text("Level "+level);
      setTimeout(nextSequence(), 1000);

    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    if($(window).width() <=992){
      $("#level-title").text("Game Over,click on any button to Restart");
    }else{
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

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
