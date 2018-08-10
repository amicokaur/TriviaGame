var panel = $('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});



var questions = [{
  question: "Which question is grammatically correct?",
  answers: ["Can you tell me what time is it?", "Can you tell what is time?", "Can you tell me what time it is?",],
  correctAnswer: "Can you tell me what time it is",
  correctImage:"assets/images/grammar_image.png"
}, {
  question: "What colors are Zebras?",
  answers: ["White with black strips", "Black with white stripes", "Both of the above", "None of the above"],
  correctAnswer: "Black with white stripes",
  correctImage:"assets/images/zebra_image.jpg"
}, {
  question: "What is the largest animal that has ever lived?",
  answers: ["Blue whale", "African elephant", "Apatosaurus (aka brontosaurus)", "Spinosaurus"],
  correctAnswer: "Blue whale",
  correctImage:"assets/images/blackwhale_image.gif"
}, {
  question: "Which question is grammatically correct?",
  answers: ["Do you know the market is here?", "Do you know that the market is here", "Do you know if the market is here"],
  correctAnswer: "Do you know if the market is here",
  correctImage:"assets/images/grammer_image.gif"
}, {
  question: "Who is the Most Famous Video Game Character of all Time?",
  answers: ["Solid Snake", "Link", "Mario", "Sonic"],
  correctAnswer: "Mario",
  correctImage:"assets/images/mario_image.gif"
}, {
  question: "Which of the following dogs is the smallest?",
  answers: ["Poodle", "Pomeranian", "Chihuahua", "Dachshund"],
  correctAnswer: "Chihuahua",
  correctImage:"assets/images/chihuahua_image.png"
}, {
  question: "NES was Short for....?",
  answers: ["Never Ending Simulation", "New Enterprise System", "Not Ever Still", "Nintendo Entertainment System"],
  correctAnswer: "Nintendo Entertainment System",
  correctImage:"assets/images/nintendo_image.gif"
}]; 




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append(
    '<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
