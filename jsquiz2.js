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
    //1
    question: "What decade where you born?",
    choices: ["1910-1919", "1920-1929", "1930-1939", "1940-1949", "1950-1959", "1960-1969", "1970-1979", "1980-1989", "1990-1999"],
    correctAnswer:1
  }, {
    //2
    question: "What is the second letter in your name?",
    choices: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
    correctAnswer:1
  }, {
    //3
    question: "What region were you born in?",
    choices: ["Pacific", "Rocky Mountain", "Southwest", "Midwest", "Southeast", "Northeast", "Noncontiguous"],
    correctAnswer:1
  }, {
    //4
    question: "How many children do you have?",
    choices: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9+"],
    correctAnswer:1
  }, {
    //5
    question: "How many grandchildren do you have?",
    choices: [0, "1-3", "4-6", "7-10","11-14", "15+" ],
    correctAnswer:1
  }, {
    //6
    question: "What kind of pet do you have?",
    choices: ["None", "Dog", "Cat", "Fish", "Small mammal", "Bird", "Reptile/Amphibian", "Horse", "Exotic Animal"],
    correctAnswer:1
  }, {
    //7
    question: "Are you or have you ever been married?",
    choices: ["Yes", "No"],
    correctAnswer:1
  }, {
    //8
    question: "How many countries have you traveled to?",
    choices: ["None", "1-3", "4-6", "7-10","11-14", "15+"],
    correctAnswer:1
  }, {
    //9
    question: "What is your favorite type of food?",
    choices: ["American", "Mexican", "Italian", "Thai", "Japanese", "Chinese", "Brazilian", "Hawaiian", "French", "Spanish", "Indian", "Middle Eastern", "African", "Australian", "Vietnamese", "Caribbean", "Creole", "Other"],
    correctAnswer:1
  }, {
    //10
    question: "What is your favorite meal?",
    choices: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack" ],
    correctAnswer:1
  }, {
    //11
    question: "What is the first letter of your mother's name?",
    choices: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
    correctAnswer:1
  }, {
    //12
    question: "Where do you prefer to be?",
    choices: ["Outdoors", "Indoors", "Both", "Neither"],
    correctAnswer:1
  }, {
    //13
     question: "What did you do for your latest birthday?",
    choices: ["Dinner", "Party", "Trip", "Nothing", "Other"],
    correctAnswer:1
}, {
    //14
     question: "What do the digits of your age add up to?",
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    correctAnswer:1
  }, {
    //15
     question: "What month is your birthday?",
    choices: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    correctAnswer:1
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
    
    score.append('Good job!');
    return score;
  }
})();