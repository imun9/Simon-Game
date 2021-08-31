var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(document).mousemove(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequenc();
    started = true;
  }

});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

function nextSequenc() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);}



function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");

  }, 100);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequenc();
      },100);
    }
  }
  else {

    playSound("wrong");
    $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press on screen to Restart");
    setTimeout(function(){

      $("body").removeClass("game-over");
    },700);

    startOver();
  }


}

function startOver(){
  level=0;
  started=false;
  gamePattern=[];
}
