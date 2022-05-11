// labeling id's
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

// teveryday i'm shuffling
let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

// to start game and go to next question
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

// The questions
const questions = [
  {
    question: 'What are a group of kittens called?',
    answers: [
      { text: 'Herd', correct: false },
      { text: 'Kindle', correct: false },
      { text: 'Kettle', correct: true }
    ]
  },
  {
    question: 'How many different sounds can a cat make?',
    answers: [
      { text: '150', correct: false },
      { text: '100', correct: true },
      { text: '220', correct: false }
    ]
  },
  {
    question: 'Which U.S. city had a cat as a mayor for almost 20 years?',
    answers: [
      { text: 'Talkeetna, Alaska', correct: true },
      { text: 'Northridge, California', correct: false },
      { text: 'Jackson, Wyoming', correct: false }
    ]
  },
  {
    question: 'Who is one of the most famous tabby cats?',
    answers: [
      { text: 'Felix', correct: false },
      { text: 'Garfield', correct: true },
      { text: 'Tom', correct: false }
    ]
  }
]