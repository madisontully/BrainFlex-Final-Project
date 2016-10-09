(function() {

  function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex){
      randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  var questions = [{
    question: "The mother of Johnny had three children. The first child was named April. The second child was named May. What was the name of the third child?",
    choices: ["July", "Johnny", "June", "April", "May"],
    correctAnswer: 1
  }, {
    question: "What word in the English Language is always spelled incorrectly?",
    choices: ["balloon", "incorrectly", "color", "armory", "always"],
    correctAnswer: 1
  }, {
    question: "How much dirt is in a hole in the ground that is 2'x3'x4'?",
    choices: ["24'", "44'", "36'", "0'", "156'"],
    correctAnswer: 3
  }, {
    question: "If you were running in a race, and you passed the person in second place, what place would you be in?",
    choices: ["1st", "2nd", "3rd", "4th", "5th"],
    correctAnswer: 1
  }, {
    question: "72, 58, 51, 37, 30...  What is the 7th item in this pattern?",
    choices: [20, 3, 12, 8, 9],
    correctAnswer: 4
  }, {
    question: "What is a seven letter word containing thousands of letters?",
    choices: ["jacuzzi", "jujutsu", "mailbox", "cashbox", "boxfish"],
    correctAnswer: 2
  }, {
    question: "Wednesday, Tom and Joe went to a restaurant and ate dinner. When they were done they paid for the food and left. But Tom and Joe didn't pay for the food. Who did?",
    choices: ["Tom", "Joe", "the waitress", "Wednesday"],
    correctAnswer: 3
  }, {
    question: "What body part is pronounced as one letter but written with three, only two different letters are used?",
    choices: ["ear", "eye", "lip", "toe"],
    correctAnswer: 1
  }, {
    question: "A murderer is condemned to death. They have to choose between three rooms. The first is full of raging fires, the second is full of assassins with loaded guns, and the third is full of lions that haven't eaten in 3 years. Which room is safest for them?",
    choices: ["The first room", "The second room", "The third room", "None"],
    correctAnswer: 2
  }, {
    question: "Mr. Smith has 4 daughters. Each of his daughters has a brother. How many children does Mr. Smith have?",
    choices: ["4", "5", "6", "7", "8"],
    correctAnswer: 1
  }, {
    question: "Five men were eating apples, A finished before B, but behind C. D finished before E, but behind B. What was the finishing order?",
    choices: ["ABCDE", "CABDE", "DEBAC", "EDCBA", "DACEB"],
    correctAnswer: 1
  }, {
    question: "A man is shown a portrait painting. He looks closely, then exclaims rather cryptically: 'Brothers and sisters have I none, but that man's father is my father's son.' Who is the man in the portrait?",
    choices: ["The man", "The man's father", "The man's son", "The man's uncle", "The man's grandfather"],
    correctAnswer: 2
  }, {
    question: "If you were standing directly on the south pole facing north, which direction would you travel if you took one step backward?",
    choices: ["North", "South", "East", "West"],
    correctAnswer: 0
  }, {
    question: "What is at the end of a rainbow?",
    choices: ["A leprechaun", "A pot of gold", "The letter 'w'", "A puddle"],
    correctAnswer: 2
  }, {
    question: "The 22nd and 24th presidents of the United States of America had the same parents but were not brothers. What were their last names?",
    choices: ["Cleveland", "Adams", "Bush", "Roosevelt", "Harrison"],
    correctAnswer: 0
  }];

  shuffle(questions);
  console.log(questions);
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();