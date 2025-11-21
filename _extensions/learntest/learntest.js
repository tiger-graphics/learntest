window.RevealLearnTest = function () {
  var keyCodes = {
    backspace: 8, tab: 9, enter: 13, shift: 16, ctrl: 17, alt: 18, pausebreak: 19, capslock: 20,
    esc: 27, space: 32, pageup: 33, pagedown: 34, end: 35, home: 36, leftarrow: 37, uparrow: 38,
    rightarrow: 39, downarrow: 40, insert: 45, delete: 46, 0: 48, 1: 49, 2: 50, 3: 51, 4: 52,
    5: 53, 6: 54, 7: 55, 8: 56, 9: 57, a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72,
    i: 73, j: 74, k: 75, l: 76, m: 77, n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85,
    v: 86, w: 87, x: 88, y: 89, z: 90, leftwindowkey: 91, rightwindowkey: 92, selectkey: 93,
    numpad0: 96, numpad1: 97, numpad2: 98, numpad3: 99, numpad4: 100, numpad5: 101, numpad6: 102,
    numpad7: 103, numpad8: 104, numpad9: 105, multiply: 106, add: 107, subtract: 109, decimalpoint: 110,
    divide: 111, f1: 112, f2: 113, f3: 114, f4: 115, f5: 116, f6: 117, f7: 118, f8: 119, f9: 120,
    f10: 121, f11: 122, f12: 123, numlock: 144, scrolllock: 145, semicolon: 186, equalsign: 187,
    comma: 188, dash: 189, period: 190, forwardslash: 191, graveaccent: 192, openbracket: 219,
    backslash: 220, closebracket: 221, singlequote: 222
  };
  
// Texts for multi-language setup
// Indices: 0 = english, 1 = german, to be continued
  let scoreIntroText = ["Achieved Points ", "Erreichte Punkte "];
  let scoreInfoText = ["Points for this Exercise: ","Punktzahl für diese Aufgabe: "]
  let ofText = [" of ", " von "];
  let outOfText = [" out of ", " von "];
  let checkBtnText = ["Check","Check"];
  let helpBtnText = ["Help", "Hilfe"];
  let solutionBtnText = ["Solution", "Lösung"];
  let resetBtnText = ["Reset", "Zurücksetzen"];
  let previousBtnText = ["Previous", "Zurück"];
  let nextBtnText = ["Next", "Weiter"];
  let summaryBtnText = ["Summary", "Auswertung"];
  let exitBtnText = ["Exit", "Übung verlassen"];
  let defaultCorrectText = ["Correct!", "Richtig!"];
  let defaultIncorrectText = ["Incorrect!", "Falsch!"];
  let defaultMultiCorrectText = ["Correct! You selected all the right answers.", "Richtig! Sie haben alle richtigen Antworten ausgewählt."];
  let defaultMultiIncorrectText = ["Incorrect! You need to select ALL correct answers and NO incorrect ones." , "Falsch! Sie müssen ALLE richtigen Antworten auswählen und dürfen KEINE falschen Antworten auswählen."];
  let summaryHeadText = ["<h3>These are the results of the individual exercises</h3>", "<h3>Dies sind die Ergebnisse der einzelnen Aufgaben</h3>"];
  let exerciseEntryText = ["Exercise ", "Aufgabe "];
  let exerciseText = ["Exercise ", "Aufgabe "];
  let pointsText = [" Points", " Punkte"];
  let maxResultText = [" Points<br>", " Punkten<br>"];
  let finalResultText = [" Points", " Punkten"];
  let finalResultEntryText = ["Total Score: ","Gesamtergebnis: "];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  function updateScore(scoreElement, actualCount, totalCount, langSelect) {
    const percentage = ((actualCount / totalCount) * 100).toFixed(0);
    text = scoreIntroText[langSelect] + actualCount + outOfText[langSelect] + totalCount + " (= " + percentage +"%)";
    scoreElement.textContent = text;
  }

  return {
    id: "RevealLearnTest",
    init: function (deck) {
      const config = deck.getConfig();
      console.log(config);
      const options = config.learntest || {};

      var settings = {};
      
      // Debug flag
      settings.quizDebug = options.quizDebug || false;

      // determine the language for bButtons and information display
      settings.quizLanguage = options.quizLanguage || "en"
	  if (settings.quizDebug) console.log("options.Language=" + options.quizLanguage + " settings.quizLanguage="+settings.quizLanguage);
      let langSelect = 0;
      if (settings.quizLanguage == "en") {langSelect = 0;}
      if (settings.quizLanguage == "de") {langSelect = 1;}
   
      let buttonContainer = document.createElement('div'); // Create container for the buttons
      buttonContainer.classList.add('button-container'); // add a class for styling

      let scoreContainer = document.createElement('div'); // Create a container for the score display
      scoreContainer.classList.add('score-container'); // add a class for styling

// create Buttons
// Check
      let checkButton = document.createElement('button'); // Create the button
      checkButton.innerHTML = checkBtnText[langSelect];   // assign the labeling
      checkButton.classList.add('check-button');          // add the individual class e. g. for color
      checkButton.classList.add('action-buttons');        // add class for general settings
// Help
      let helpButton = document.createElement('button');
      helpButton.innerHTML = helpBtnText[langSelect];
      helpButton.classList.add('help-button');
      helpButton.classList.add('action-buttons');
// Solution
      let solutionButton = document.createElement('button');
      solutionButton.innerHTML = solutionBtnText[langSelect];
      solutionButton.classList.add('solution-button');
      solutionButton.classList.add('action-buttons');
// Reset for multiple choice slides
      let resetButton = document.createElement('button');
      resetButton.innerHTML = resetBtnText[langSelect];
      resetButton.classList.add('reset-button');
      resetButton.classList.add('action-buttons');
// Previous Slide
      let prevButton = document.createElement('button');
      prevButton.innerHTML = previousBtnText[langSelect];
      prevButton.classList.add('prev-button');
      prevButton.classList.add('action-buttons');
// Next Slide
      let nextButton = document.createElement('button');
      nextButton.innerHTML = nextBtnText[langSelect];
      nextButton.classList.add('next-button');
      nextButton.classList.add('action-buttons');
// Exit to leave the exercise
      let exitButton = document.createElement('button');
      exitButton.innerHTML = exitBtnText[langSelect];
      exitButton.classList.add('exit-button');
      exitButton.classList.add('action-buttons');
// Feedback Element for display of Help, Solution and Results
      let feedbackElement = document.createElement('div');
      feedbackElement.classList.add('feedback');
      feedbackElement.innerHTML = '';

// check for special settings via yml-options
// Determine the configuration for some keys
// Check key        
      settings.checkKey = options.checkKey ? options.checkKey.toLowerCase() : "c";
      settings.checkKeyCode = keyCodes[settings.checkKey] || 67;
      deck.addKeyBinding({ keyCode: settings.checkKeyCode, key: settings.checkKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let checkBtn = currentSlide.querySelector('.check-button');
        checkBtn.click();
      });
// Help key      
      settings.helpKey = options.helpKey ? options.helpKey.toLowerCase() : "h";
      settings.helpKeyCode = keyCodes[settings.helpKey] || 72;
      deck.addKeyBinding({ keyCode: settings.helpKeyCode, key: settings.helpKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let helpBtn = currentSlide.querySelector('.help-button');
        helpBtn.click();
      });
// Exit key
      settings.exitKey = options.exitKey ? options.exitKey.toLowerCase() : "x";
      settings.exitKeyCode = keyCodes[settings.exitKey] || 88;
      deck.addKeyBinding({ keyCode: settings.exitKeyCode, key: settings.exitKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let exitBtn = currentSlide.querySelector('.exit-button');
        exitBtn.click();
      });
// Soluton key
      settings.solutionKey = options.solutionKey ? options.solutionKey.toLowerCase() : "s";
      settings.solutionKeyCode = keyCodes[settings.solutionKey] || 83;
      deck.addKeyBinding({ keyCode: settings.solutionKeyCode, key: settings.solutionKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let solutionBtn = currentSlide.querySelector('.solution-button');
        solutionBtn.click();
      });
// Reset key      
      settings.resetKey = options.resetKey ? options.resetKey.toLowerCase() : "r";
      settings.resetKeyCode = keyCodes[settings.resetKey] || 82;
      deck.addKeyBinding({ keyCode: settings.resetKeyCode, key: settings.resetKey }, () => {
        let currentSlide = deck.getCurrentSlide();
        let resetBtn = currentSlide.querySelector('.reset-button');
        resetBtn.click();
      });

// Evaluate more run-time options      
      settings.disableDeckShuffle = options.disableDeckShuffle || false;
      settings.allowNumberKeys = options.allowNumberKeys && true;
      settings.disableOnCheck = options.disableOnCheck || false;
      settings.enableHelp = options.enableHelp && true;
      settings.enableSolution = options.enableSolution && true;
      settings.disableReset = options.disableReset || false;
      settings.shuffleOptions = options.shuffleOptions || false;

      settings.defaultCorrect = options.defaultCorrect || defaultCorrectText[langSelect];
      settings.defaultIncorrect = options.defaultIncorrect || defaultIncorrectText[langSelect];
      settings.includeScore = options.includeScore || false;

      settings.exitTarget = options.exitTarget || "../index.html";
      settings.defaultScore = options.defaultScore || "1";
      
      if (settings.quizDebug) console.log("Configuration on run");
      if (settings.quizDebug) console.log(config);
      if (settings.quizDebug) console.log("Settings on run");
      if (settings.quizDebug) console.log(settings);

// Init the deck
	  let totalScore = 0;
      let actualScore = 0;
      let slideResult = 0;
      let summaryElement = "";
      let summaryContent = [];
      
      // check for Title slide
      let hasTitle = deck.getSlides().filter(slide => slide.classList.contains('quarto-title-block')).length;
      // check for a summary slide
      let hasSummary = deck.getSlides().filter(slide => slide.classList.contains('quiz-summary')).length;

	  // allw deck shuffle only if there is no summary slide and if it naot disabled by settings
      if (!hasSummary && !settings.disableDeckShuffle) {
		// Shuffle key to shuffle the complete deck only if there is no summary slide
	      settings.shuffleKey = options.shuffleKey ? options.shuffleKey.toLowerCase() : "t";
	// align with above defined key codes      
	      settings.shuffleKeyCode = keyCodes[settings.shuffleKey] || 84;
	// add key binding
	      deck.addKeyBinding({ keyCode: settings.shuffleKeyCode, key: settings.shuffleKey }, () => {
	        deck.shuffle();
	        deck.slide(0, 0, 0);
	      });
	  }
    
      // check for the number of slides with exercises
      let totalCount = deck.getSlides().filter(slide => slide.classList.contains('quiz-question')).length;

// Loop over all slides of the deck      
      deck.getSlides().forEach((slide, index) => {
        // check if this slide is a quiz slide
        let quizQuestion = slide.classList.contains('quiz-question');
        if (quizQuestion) {
		  // create all buttons on each quiz slide
          let cloneCheckBtn = checkButton.cloneNode(true);
          let cloneHelpBtn = helpButton.cloneNode(true);
          let cloneExitBtn = exitButton.cloneNode(true);
          let cloneSolutionBtn = solutionButton.cloneNode(true);
          let cloneResetBtn = resetButton.cloneNode(true);
          let clonePrevBtn = prevButton.cloneNode(true);
          let cloneNextBtn = nextButton.cloneNode(true);
          let cloneFeedbackElement = feedbackElement.cloneNode(true);
          let cloneButtonContainer = buttonContainer.cloneNode(true);
          let cloneScoreContainer = scoreContainer.cloneNode(true);
        
          let selectedOptions = []; // nothing selected at the beginning
          let isAnswered = false;   // will be set to true after Check
          cloneCheckBtn.disabled = true; // the Check-Button gets enabled after an option was selected
          let isMultipleChoice = slide.classList.contains('quiz-multiple'); // check for multiple choice

		  // on the first slide disable the Previous-Button
		  // the first slide has index=0 if there is no title page and 1 (==hasTitle) if there is one
		  if (index == hasTitle) { clonePrevBtn.disabled = true; }
		  // for the last quiz slide set the label for the "Next"-Button to "Summary" if there is a summary slide. 
		  // else disable the "Next"-Button
		  if (index == totalCount - 1 + hasTitle) {
			if (hasSummary) {
				cloneNextBtn.innerHTML = summaryBtnText[langSelect];
			} else {
				cloneNextBtn.disabled = true;
			}
		  }
		  if (hasSummary >1 ) {
			cloneFeedbackElement.innerHTML = "Error in the markdown code of the page:<br> Too many summary pages!"
		  }
      

          // assign each list element the class of 'option-button'
          let options = slide.querySelectorAll('li');
          options.forEach(opt => {
            opt.classList.add('option-button');
          });
          if (settings.shuffleOptions) {
            options = shuffleArray(Array.from(options));
            options.forEach(opt => {
              slide.appendChild(opt);
            });
          };

      // assign the default score for the quiz slide
    	let maxScore = Number(settings.defaultScore);
    	let slideScore = maxScore;
    	// by default there is no help defined
    	let helpAvailable = false;
    	// by default there is no solution defined
    	let solutionAvailable = false;
		let candidates = slide.querySelectorAll('span');  
		// check for individual slide settings
		candidates.forEach( candidate => {
		// evaluate and then assign the individual score for the slide
			let hasScore = candidate.hasAttribute('data-score');        
			if (hasScore) {
				maxScore = Number(candidate.getAttribute('data-score'));
				slideScore = maxScore;
			}
			// Check for help and solution entries
			if(!helpAvailable) {
		       helpAvailable = candidate.hasAttribute('data-help') || candidate.hasAttribute('data-short-help');
		    }
			if(!solutionAvailable) {
		       solutionAvailable = candidate.hasAttribute('data-solution') || candidate.hasAttribute('data-short-solution');
		    }
		});
		// compute the maximum score for the deck
		totalScore += maxScore;
		if (settings.quizDebug) console.log("Score for slide number " + index + " is: " + maxScore + " TotalScore= " + totalScore);
          // prepare the score board on top of the side  for score and test-slide counter
		if (settings.includeScore) {
			let scoreElement = document.createElement('div'); 		// container for the right hand side score display
			scoreElement.classList.add('score');					// add class for styling an positioning
			let maxScoreElement = document.createElement('div');	// container for center placed slide score
			maxScoreElement.classList.add('max-score');				// add class for styling an positioning
			let slideCounterElement = document.createElement('div');// container for the slide counter
			slideCounterElement.classList.add('slidecounter');		// add class for styling an positioning
			cloneScoreContainer.appendChild(slideCounterElement);
			cloneScoreContainer.appendChild(maxScoreElement);        
			cloneScoreContainer.appendChild(scoreElement);
			
			// put the information for slide counter and slide score into the elements 
			// the right hand side score display gets dynamic updates (look for updateScore calls in the code)
			maxScoreElement.textContent = scoreInfoText[langSelect] + maxScore;
			// Slide number to show index + 1, because index starts at 0 - hasTitle which is one if there is a title page
			slideCounterElement.textContent = exerciseText[langSelect] + (index+1 - hasTitle) + ofText[langSelect] + totalCount;
		}
	
         function helpQuiz() {
          // check for help to be displayed
          let candidates = slide.querySelectorAll('span');  
          candidates.forEach( candidate => {
			 // check for an extra help page
             hasHelp = candidate.hasAttribute('data-help');
			 if (hasHelp) {
			  // get the name of the help page 
		      let helpText = candidate.getAttribute('data-help'); 

			  if (settings.quizDebug) console.log("candidate.helpText=" + helpText);
		      // prepare the help page for embedding in the feedback area
			  linkText = "<iframe height=\"100%\" width=\"100%\" src=\"" + helpText + ".html\"></iframe>";
			  if (settings.quizDebug) console.log("linkText=" + linkText);
			  // deploy the help page
			  cloneFeedbackElement.innerHTML = linkText;
             } 
			// check for short help
			let hasShortHelp = candidate.hasAttribute('data-short-help');
			if (hasShortHelp) {
			  // get it 
		      let helpText = candidate.getAttribute('data-short-help');   
			  if (settings.quizDebug) console.log("candidate.shorthelpText=" + helpText);
			  // deploy it into innerHTML instead of textContent to enable basic HTML-Tags in the short help
			  cloneFeedbackElement.innerHTML = helpText;
			 }
           });
          };   
                 
         function solutionQuiz() {
          // check for solution to be displayed 
          let candidates = slide.querySelectorAll('span');  
          candidates.forEach( candidate => {
			 // check for an extra solution page
             let hasSolution = candidate.hasAttribute('data-solution');
			 if (hasSolution) {
			  // get the name of the solution page 
		      let solutionText = candidate.getAttribute('data-solution');   
			  if (settings.quizDebug) console.log("candidate.solutionText=" + solutionText);
		      // prepare the solution page for embedding in the feedback area
			  linkText = "<iframe height=\"100%\" width=\"100%\" src=\"" + solutionText + ".html\"></iframe>";
			  if (settings.quizDebug) console.log("linkText=" + linkText);
			  // deploy the solution page
			  cloneFeedbackElement.innerHTML = linkText;
             } 

			 // Check for short solution
             let hasShortSolution = candidate.hasAttribute('data-short-solution');
			 if (hasShortSolution) {
			  // get it	 
		      let solutionText = candidate.getAttribute('data-short-solution');   
		      // Debug-Ausgabe  
			  if (settings.quizDebug) console.log("candidate.shortsolutionText=" + solutionText);
			  // deploy it into innerHTML instead of textContent to enable basic HTML-Tags in the short help
			  cloneFeedbackElement.textContent = solutionText;
			 }			 
			 
           });
          };          
          
          function resetSlide() {
            options.forEach(opt => {
              opt.classList.remove('selected', 'correct', 'incorrect');
              opt.disabled = false;
            });
            selectedOptions = [];
            isAnswered = false;
            cloneFeedbackElement.textContent = '';
            cloneCheckBtn.disabled = true;
          };

          options.forEach(option => {
            option.addEventListener('click', function () {
				
              if (!isAnswered) {
                if (isMultipleChoice) {
                  // Multiple choice: toggle selection
                  if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedOptions = selectedOptions.filter(opt => opt !== this);
                  } else {
                    this.classList.add('selected');
                    selectedOptions.push(this);
                  }
                } else {
                  // Single choice: only one selection allowed
                  options.forEach(opt => opt.classList.remove('selected'));
                  this.classList.add('selected');
                  selectedOptions = [this];
                }
                cloneCheckBtn.disabled = selectedOptions.length === 0;
              }
            });
          });
          if (!settings.disableReset) {
            cloneResetBtn.addEventListener('click', () => {
              if (settings.quizDebug) console.log("clicked reset");
              cloneCheckBtn.disabled = false;
              resetSlide();
            });
          }
          // event handler for the help button
          if (settings.enableHelp) {
			cloneHelpBtn.addEventListener('click', () => {
				if (settings.quizDebug) console.log("clicked help");
				cloneHelpBtn.disabled = false;
                // reduce the number of achievable points after help
				slideScore = maxScore/2.0;
				slideResult = slideScore;
				helpQuiz();
			});
          }
          
          // event handler for the solution button
          if (settings.enableSolution) {
            cloneSolutionBtn.addEventListener('click', () => {
              if (settings.quizDebug) console.log("clicked solution");
              // reduce the number of achievable points after peeping into the solution
              slideScore = 0;
              slideResult = 0;
              solutionQuiz();
            });
          }
          
          clonePrevBtn.addEventListener('click', () => {
            if (settings.quizDebug) console.log("clicked prev slide")
            deck.prev();
          });
          
          cloneNextBtn.addEventListener('click', () => {
            if (settings.quizDebug) console.log("clicked next slide")
			// update the summary when leaving the slide
            if (hasSummary) {
			  if (settings.quizDebug) console.log("Updating Summary at index:" + index);
			  summaryContent[index+1 - hasTitle] = exerciseEntryText[langSelect]+ (index+1-hasTitle) + ": " + slideResult + outOfText[langSelect] + maxScore + maxResultText[langSelect];
              // when the Next button leads to the summary slide then fill in the summary content
              if (index >= totalCount-1) {
			      const percentage = ((actualScore / totalScore) * 100).toFixed(0);
			      // fil in the final result 
				  summaryContent[totalCount+1] = finalResultEntryText[langSelect] + actualScore + outOfText[langSelect] + totalScore + finalResultText[langSelect] + " = " + percentage + "%";
				  summary="";
                  for (let i = hasTitle; i <= totalCount+1; i++) {
					  summary = summary + summaryContent[i];
				  }
				  // add an emoji -- it is HTML coding
				  emoji = "🙂";
				  if (percentage < 80) {emoji = "😐"};
				  if (percentage < 50) {emoji = "🙁"};
				  if (percentage < 10) {emoji = "😱"};
				  // append the emoji to the final result 
				  summary = summary + '<font size="15"> ' + emoji + '</font>';
				  // deploy the summary
				  summaryElement.innerHTML = summary;
			  }
			}
			// and go for it
            deck.next();
          });

          // event handler for the Exit button
          cloneExitBtn.addEventListener('click', () => {
            if (settings.quizDebug) console.log("clicked exit" + settings.exitTarget)
            window.location = (settings.exitTarget);
          });
          
          // event handler for the Check button
          cloneCheckBtn.addEventListener('click', function () {
            if (settings.quizDebug) console.log("clicked check; slideScore=" + slideScore);
            if (selectedOptions.length > 0 && !isAnswered) {
              isAnswered = true;
              
              if (isMultipleChoice) {
                // Multiple choice logic: check if ALL correct answers are selected AND no incorrect answers
                let correctOptions = Array.from(options).filter(opt => 
                  opt.querySelector('span') && opt.querySelector('span').classList.contains('correct')
                );
                
                let selectedCorrect = selectedOptions.filter(opt => 
                  opt.querySelector('span') && opt.querySelector('span').classList.contains('correct')
                );
                let selectedIncorrect = selectedOptions.filter(opt => 
                  !(opt.querySelector('span') && opt.querySelector('span').classList.contains('correct'))
                );
                
                let isFullyCorrect = selectedCorrect.length === correctOptions.length && selectedIncorrect.length === 0;
                
                // Mark all options as correct or incorrect
                options.forEach(opt => {
                  if (opt.querySelector('span') && opt.querySelector('span').classList.contains('correct')) {
                    opt.classList.add('correct');
                  } else {
                    opt.classList.add('incorrect');
                  }
                });
                
                if (isFullyCorrect) {
                  cloneFeedbackElement.textContent = defaultMultiCorrectText[langSelect];
                  cloneFeedbackElement.style.color = '#27ae60';
                  actualScore+= slideScore;
                  slideResult = slideScore;
                  slideScore = 0;
                } else {
                  cloneFeedbackElement.textContent = defaultMultiIncorrectText[langSelect];
                  cloneFeedbackElement.style.color = '#c0392b';
                  slideResult = 0;
                }
              } else {
                // Single choice logic (original)
                let selectedOption = selectedOptions[0];
				let isCorrect = selectedOption.querySelector('span') && selectedOption.querySelector('span').classList.contains('correct');
                let hasExplanation = selectedOption.querySelector('span') && selectedOption.querySelector('span').hasAttribute('data-explanation');
                let explanation = null;
                if (hasExplanation) {
                  explanation = selectedOption.querySelector('span').getAttribute('data-explanation');
                }
                if (isCorrect) {
                  selectedOption.classList.add('correct');
                  cloneFeedbackElement.textContent = explanation || settings.defaultCorrect;
                  cloneFeedbackElement.style.color = '#27ae60';
                  actualScore+= slideScore;
                  slideResult = slideScore;
                  slideScore = 0;
                } else {
                  selectedOption.classList.add('incorrect');
                  cloneFeedbackElement.textContent = explanation || settings.defaultIncorrect;
                  cloneFeedbackElement.style.color = '#c0392b';
                  slideResult = 0;
                }
              }
              if (settings.includeScore) {
                deck.getSlides().forEach(slide => {
                  let scoreElement = slide.querySelector('.score');
                  if (scoreElement) {
                    updateScore(scoreElement, actualScore, totalScore, langSelect);
                  }
                });
              }

              if (settings.disableOnCheck) {
                cloneCheckBtn.disabled = true;
                cloneResetBtn.disabled = true;
//                cloneHelpBtn.disabled = true;
//                cloneSolutionBtn.disabled = true;
                options.forEach(opt => opt.disabled = true);
              } else {
                isAnswered = false;
                cloneCheckBtn.disabled = false;
                cloneResetBtn.disabled = false;
//                cloneHelpBtn.disabled = false;
//                cloneSolutionBtn.disabled = false;
                options.forEach(opt => opt.disabled = false);
              }
            } // end if if (selectedOption.length >0...
          }); // end of eventHandler for Check button

          if (settings.allowNumberKeys) {
            document.addEventListener('keydown', function (event) {
              // Assuming option buttons have class names like 'option-button' and are meant to be selected in order
              // const optionButtons = document.querySelectorAll('.option-button');

              // The key values for number keys are '1', '2', '3', etc.
              // Convert the key to an index (e.g., '1' becomes 0)
              const keyIndex = parseInt(event.key, 10) - 1;

              // Check if the pressed key is a number that corresponds to an option button
              if (keyIndex >= 0 && keyIndex < options.length) {
                // Simulate a click on the corresponding option button
                // only simulate on the current slide
                let currentSlide = deck.getCurrentSlide();
                let optionButtons = currentSlide.querySelectorAll('.option-button');
                optionButtons[keyIndex].click();
              }
            });
          }; // end of settings.allowNumberKeys
          
          // make score board, buttons and feedback element visible
          slide.appendChild(cloneScoreContainer);
          slide.appendChild(cloneButtonContainer);

		  // and now the buttons from left to right
          cloneButtonContainer.appendChild(cloneCheckBtn);
		  // if, in general, Help shall be available, make the button visible...
          if (settings.enableHelp) {
             cloneButtonContainer.appendChild(cloneHelpBtn);
             // ... but disable it, if there no help defined for this slide
             if (!helpAvailable) {cloneHelpBtn.disabled = true;}
		  }
		  // if, in general, Solutions shall be available, make the button visible...
          if (settings.enableSolution) {
             cloneButtonContainer.appendChild(cloneSolutionBtn);
             // ... but disable it, if there no solution defined for this slide
             if (!solutionAvailable) {cloneSolutionBtn.disabled = true;}
          }
          // the Reset button only makes sense on multiple choice slides
          // and will be available, if allowed in the settings   
          if (isMultipleChoice && !settings.disableReset) {
			  cloneButtonContainer.appendChild(cloneResetBtn);
		  }
          cloneButtonContainer.appendChild(clonePrevBtn);
          cloneButtonContainer.appendChild(cloneNextBtn);
          cloneButtonContainer.appendChild(cloneExitBtn);
          // and finally the feedback element
          slide.appendChild(cloneFeedbackElement);
        } // end of if (quiz-question)
        
        		// check if this slide is the summary slide  
        isSummary = slide.classList.contains('quiz-summary');   
        if (isSummary) {
		// set up the summary slide
		   summaryElement = feedbackElement.cloneNode(true);
		   summaryContent[0] = summaryHeadText[langSelect];
		   let summaryButtons = buttonContainer.cloneNode(true);
		   let summaryExitBtn = exitButton.cloneNode(true);
		   let summaryPrevBtn = prevButton.cloneNode(true);
		   slide.appendChild(summaryButtons);
		   slide.appendChild(summaryElement);
		   summaryButtons.appendChild(summaryPrevBtn);
           summaryButtons.appendChild(summaryExitBtn);

		   summaryPrevBtn.addEventListener('click', () => {
			   deck.prev();
			});
		   summaryExitBtn.addEventListener('click', () => {
               if (settings.quizDebug) console.log("clicked exit" + settings.exitTarget)
               window.location = (settings.exitTarget);
            });
		} // end of if (isSummary)
		
		// check if this slide is the title slide  
        isTitle = slide.classList.contains('quarto-title-block');   
		if (isTitle) {
		   let titleButton = buttonContainer.cloneNode(true);
		   let titleStartButton = nextButton.cloneNode(true);
		   slide.appendChild(titleButton);
		   titleStartButton.classList.add('start-button'); 
		   titleButton.appendChild(titleStartButton);
		   titleStartButton.innerHTML = "Start";

		   titleStartButton.addEventListener('click', () => {
			   deck.next();
			});
		}

       }); //end of forEach(slide, index)
	  // necessary for correct display when starting the deck
	  if (settings.includeScore) {
		deck.getSlides().forEach(slide => {
		let scoreElement = slide.querySelector('.score');
		if (scoreElement) {
			updateScore(scoreElement, actualScore, totalScore, langSelect);
		  }
		});
	  } // end of settings.includeScore
    }, // end of function deck()
  };
};
