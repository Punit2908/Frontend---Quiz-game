const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
        ],
    },
    {
        question: "Which of these is NOT a programming language?",
        answers: [
            { text: "Java", correct: false },
            { text: "Python", correct: false },
            { text: "Banana", correct: true },
            { text: "JavaScript", correct: false },
        ],
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Go", correct: false },
            { text: "Gd", correct: false },
            { text: "Au", correct: true },
            { text: "Ag", correct: false },
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;

totalQuestionsSpan.innerText = quizQuestions.length;
maxScoreSpan.innerText = quizQuestions.length;

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerDisabled = false;

    startScreen.classList.remove('active');
    quizScreen.classList.add('active');

    showQuestion();
}

function showQuestion() {
    answerDisabled = false;

    const currenQuestion = quizQuestions[currentQuestionIndex];
    questionText.innerText = currenQuestion.question;

    answersContainer.innerHTML = '';
    currentQuestionSpan.innerText = currentQuestionIndex+1;
    //Creating a button for each possible answer
    currenQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');

        //storing the correctness of button in button
        button.dataset.correct = answer.correct;
        button.addEventListener('click', selectAnswer);
        answersContainer.append(button);
    });
}

function selectAnswer(event) {
    if (answerDisabled) return;
    answerDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        selectedButton.classList.add("correct"); // Turn the button green
        score++; // Add 1 to the score
        scoreSpan.textContent = score; // Update the score display
    } else {
        selectedButton.classList.add("incorrect"); // Turn the button red
    }

    setTimeout(() => {
        currentQuestionIndex++; // Move to the next question index

        // Is the quiz over?
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion(); // If not, show the next question
        } else {
            showResults(); // If yes, show the final results
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}