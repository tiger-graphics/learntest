# Learning Test Extension For Quarto

This is a RevealJS extension that allows you to create learning tests with single or multiple choice questions in Quarto.  
It is based on the **quiz** extension by [Sam Parmar](https://github.com/parmsam) but was extended to more 
detailed scoring and educational possibilities.
This extension allows to provide help and solutions for more challenging exercises and individual scoring for the different exercises.  
It is 100% compatible to quizzes already created with the **quiz** extension. 

Here's an example of how a simple exercise looks like: 

![Example of the Learning Test Extension](example.png)

## Installing

This will install the extension under the `_extensions` subdirectory.
If you're using version control, you will want to check in this directory.

```bash
quarto add tiger-graphics/quarto-learntest
```

## Usage

Simply add the extension to the list of RevealJS plugins like:

``` yaml
title: My Test
format:
    revealjs: default
revealjs-plugins:
  - learntest
```

Then use the following syntax within a slide to create a test question. There will be a button for each option and buttons to check 
or reset each question, as well as to navigate.

``` markdown
## Test question goes here {.quiz-question}

- Answer 1
- [Answer 2 which is correct]{.correct}
- Answer 3
- Answer 4
```

## Advanced usage

You can customize the behavior of the quiz extension by setting options in the YAML header of your document. The default options are captured in [_extensions.yml](_extensions/learntest/_extension.yml).

Here's an example of what that might look like:

```yaml
title: "Single and Multiple Choice Test Examples"
format:
  revealjs:
    slide-number: false
    scrollable: true
    menu: false
    learntest:
      checkKey: 'c'
      resetKey: 'q'
      disableDeckShuffle: true
      allowNumberKeys: true
      disableOnCheck: true
      enableHelp: true
      enableSolution: true
      disableReset: false
      shuffleOptions: false
      includeScore: true
      defaultCorrect: "Correct :-)"
      defaultScore: "4"
      exitTarget: "index.html"
      quizLanguage: "en"
      quizDebug: false
    
revealjs-plugins:
  - learntest 
```

Let's take a look at the parameters in more detail:

First, the *QUARTO* setting ``title``

That *QUARTO* setting will generate a title slide with the given content and this extension will add a *Start* button to it.

Second, some *RevealJS* settings:  

* `slide-number: false` should be used in case a title or a summary shall be generated, because then the number of slides is one above the number of slides with exercises.
* `scrollable: true` should alway be set
* `menu: false` should be set to lead the student to use the navigation buttons on the slides

and now the settings for the *learntest* extension:  

* `disableDeckShuffle: true` is recommended to suppress the option to randomly hop through the slides, including the summary
* `allowNumberKeys: true` allows to select and deselect an answer by a number key.
* `disableOnCheck: true` see below for more details
* `enableHelp: true` offers help for the exercise on the slide to the student. Must be written, of course. See below.
* `enableSolution: true` offers the view of the solution of the exercise. Must also be written, of course. See below.
* `disableReset: false` allows to reset multiple-choice selections; the button is not shown if set to `true`.
* `shuffleOptions: false` if `true`, arranges the options randomly at each start of the test/reloading the deck.
* `includeScore: true` displays the progress of the exercise, the achievable number of points for the current slide and the total scoring at the top.
* `defaultCorrect: "Correct :-)"` overrules the standard response. Same for `defaultIncorrect`.
* `defaultScore: "4"` defines the default number of points for each slide of the deck; can be overruled for each single slide. See below 
* `exitTarget: "../index.html"` defines the page to go when leaving the learning test
* `quizLanguage: "en"` selects the localisation for the labelling (top line with the score, buttons, correct/incorrect response and summary). Currently, English (`en`) and German (`de`) are included.
* `quizDebug: false` gives a lot of output in the java script console of the browser when set to `true`.

### Buttons 
The following buttons may appear on the slides depending on available feautures.
![All Buttons](all_buttons.png)

| Name| Meaning| Specials |
|:-|:------|:------------|
| Check | Check whether the selected option(s) is(are) correct | finishes the current slide if `disableOnCheck: true` is set. No more changes are possible.|
| Help | Show help, if available | disabled if there is no help, not displayed if `enableHelp: false` is set|
| Solution| Show solution, if available | disabled if there is no solution given, not displayed if `enableSolution: false` is set|
| Reset | Resets all selected options in multiple-choice exercises | only displayed on multiple-choice slides `{.quiz-multiple}`|
| Prev| Go one slide back | |
| Next | Go one slide further | Will be labeled *Summary* if there is a summary slide `{.quiz-summary}`|
| Exit | Leave the deck | jumps to the defined `exitTarget`|


### Keyboard Shortcuts

Keyboard shortcut keys are identified by their function (e. g. `help` for the /Help/ key) followed by the term 'Key'.  
If you want to assign another key to a shortcut you can change it by setting the according option in the YAML header like: `helpKey: '?'`

The following keyboard shortcuts are available with their YAML options for alternatives:

| Function | Default value | YAML option |
|:-|:-|:-------|
| Check | c | `checkKey: 'c'`|
| Help | h | `helpKey: 'h'`|
| Solution | s | `solutionKey: 's'`|
| Reset | r | `resetKey: 'r'`|
| Exit | x | `exitKey: 'x'`|
| Shuffle | t | `shuffleKey: 't'`|
**Hint:** the *Shuffle* function executes a jump to a random slide of the deck and is **not** available if `disableDeckShuffle: true` is set or the deck has summary slide `{.quiz-summary}`. 

### Shortcuts to pick an answer option using number keys

You can also set the `allowNumberKeys` option to `true` to allow users to select an answer by pressing the number key corresponding to the option. For example, if the correct answer is the second option, the user can press '2' to select the correct answer. By default they're set to true. 

### Disabling features

The `disableOnCheck` option will disable the quiz question after it has been checked. This means that the user can't change their answer after they've checked it unless they reset the question. This is false by default. 

The `disableReset` option will disable the quiz question reset button across all questions. This means the user can't reset the question after they've checked it. This is false by default. Note that they can still check other questions if the `disableOnCheck` option is false. It can be used along with `disableOnCheck` to prevent the user from changing their answer after they've checked it (unless they refresh their browser page to reset all questions). 

### Shuffling question options

The `shuffleOptions` option will shuffle the order of the options when the question is displayed. This is true by default. You can refresh your browser to reshuffle the options. 

### Setting correct and incorrect text for all questions

The `defaultCorrect` and `defaultIncorrect` options allow you to set the default text for the correct and incorrect explanations. By default, they are set to "Correct!" and "Incorrect!" if you don't define them.

### Multiple-choice questions (select all that apply)

You can create questions that require multiple correct answers to be selected by adding the `quiz-multiple` class along with `quiz-question`. For these questions, users must select ALL correct answers and NO incorrect answers to get the question right.

``` markdown
## Exercise 2{.quiz-question .quiz-multiple}
Which of the shown numbers are prime numbers?
- 1
- [2]{.correct}
- [3]{.correct}
- 4
- [5]{.correct}
- 6
- [7]{.correct}
- 9
- 10
```

In multiple-choice questions:
- Users can select multiple options by clicking on them
- Selected options will show a checkmark (✓) to indicate they are selected
- Clicking a selected option will deselect it
- The question is only correct if ALL options marked with `.correct` are selected AND no incorrect options are selected

### Custom explanations for each option

Within a slide, you can use the `data-explanation` attribute to provide an explanation for the each option including the correct answer. It is a [data attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes), in case you are wondering why it has a "data-*" prefix. This will be displayed when the user checks their answer. For example, here's what a math quiz question might look like:

``` markdown
## What is the formula for the area of a circle? {.quiz-question}

- [$πr^2$]{.correct}
- [$2πr$]{data-explanation="This is the formula for the circumference of a circle."}
- [$4πr^2$]{data-explanation="This is the formula for the surface area of a sphere."}
- [$\frac{4}{3}r^3$]{data-explanation="This is the formula for the volume of a sphere."}
```

### Including current score in each slide

The `includeScore` option will include a score information on top of each slide.  
It will be formatted as follows

* Left hand side: The counter of exercise `Exercise N of M` were `N` is the number of the current slide and `M` is the total number of slides with exercises.
* Center: The number of achievable points for the current slide.
* Right hand side: `Achieved Points X out of Y (=A%)` were `X` is the running score from all 'Check'ed slides, `Y` the sum of achievable points of the complete deck and A is the percentage of X and Y.   

Note that this option will disable the reset button on multiple choice slides after an answer check to ensure the running score is accurate.  
The check button will still be enabled, unless you use `disableOnCheck`. This is false by default. 

### Custom score for each slide
With the attribute `[]{data-score="n"}` the number of `n` points will be the individual maximum score for this slide.  
It overrides the setting from `defaultScore: "4"` for the current slide.

### Custom help for each slide
Within a slide, you can use one of two possibilities to provide help to solve the exercise.

**Hint:** When clicking the *Help* button the amount of achievable points for the current slide will be reduced to 50% of the maximum score.

#### Short help

``` markdown
[]{data-short-help=This might help you to find the correct solution <br>Otherwise have a look into the solution.}
```

When the button *Help* is clicked the given text is displayed in the area on the slide below the buttons. The text may contain simple HTML tags (like ``<br>``) but no images or formulas.  
If the help needs to be more elaborated, you can use the following:

#### Help defined in a separate document

``` markdown
[]{data-help="test-example1-Help"}
```

This code leads to display an extra HTML page in the area below the buttons when *Help* is clicked.  
In this example the help page will be generated from the file `test-example1-Help.md` which is rendered by QUARTO to `test-example1-Help.html`.
This page will not be reachable from the deck but only by clicking *Help*.

### Custom solution for each slide
Within a slide, you can use one of two possibilities to provide a solution for the exercise.

**Hint:** When clicking the *Solution* button the amount of achievable points for the current slide will be set to 0.

#### Short solution

``` markdown
[]{data-short-solution="This is the solution."}
```

When the button *Solution* is clicked the given text is displayed in the area on the slide below the buttons. The text may contain simple HTML tags (like ``<br>``) but no images or formulas.  
If the solution needs to be more elaborated, you can use the following:

#### Solution defined in a separate document

``` markdown
[]{data-solution="test-example1-Solution"}
```

This code leads to display an extra HTML page in the area below the buttons when *Solution* is clicked.  
In this example the help page will be generated from the file `test-example1-Solution.md` which is rendered by QUARTO to `test-example1-Solution.html`.
This page will not be reachable from the deck but only by clicking the *Solution* button.

### Summary Slide
The following code ensures that a summary page is created.  
``## Summary {.quiz-summary}``  
``## Summary`` creates the header **Summary** (it may be an empty header ``##{.quiz-summary}``) and the attribute ``.quiz-summary`` controls the creation of the summary.  
Any amount of content may be inserted before the automatically generated summary appears.

**Hint:** There must not be more that one summary slide!

```markdown
## Summary {.quiz-summary}
On this summary page the following content is automatically generated:
```

![Summary Slide of the Example](example-summary.png)

The summary page will only offer two buttons: one to go back to review the previous slide(s) and one to leave the deck.  
The emoticons are selected based on the percentage of correct answers. 

|  | |
|:-|:-|
|$\ge$ 80%|🙂|
|50% - 80%|😐|
|10% - 50%|🙁|
|$\lt$ 10% |😱|

 
## Example

Here is the source code for an example: [example.md](example.md) and referenced [help](quiz-example1-Help.md) and [solution](quiz-example1-Solution.md) files.

The output of the example is [here](https://tigergraphics.quarto.pub/quarto-learntest).
