const questions = [
    {
        question: "How many planets are in the solar system?",
        options: ["8", "9", "10"],
        correctAnswer: "8"
    },
    {
        question: "What is the freezing point of water?",
        options: ["0", "-5", "-6"],
        correctAnswer: "0"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze"],
        correctAnswer: "Nile"
    },
    {
        question: "How many chromosomes are in the human genome?",
        options: ["42", "44", "46"],
        correctAnswer: "46"
    },
    {
        question: "Which of these characters are friends with Harry Potter?",
        options: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
        correctAnswer: ["Ron Weasley", "Hermione Granger"]
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Ottawa", "Vancouver"],
        correctAnswer: "Ottawa"
    },
    {
        question: "What is the Jewish New Year called?",
        options: ["Hanukkah", "Yom Kippur", "Rosh Hashanah"],
        correctAnswer: "Rosh Hashanah"
    },
    {
        question: "Which of these are prime numbers?",
        options: ["2", "4", "6", "11", "12"],
        correctAnswer: ["2", "11"]
    }
];

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.classList.toggle('dark-theme');
}

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeInSeconds = 0;
let questionTimes = []; // Массив для хранения времени на каждый вопрос

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const counterElement = document.querySelector('.counter');
const nextButton = document.querySelector('.next-btn');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');

function startTimer() {
    timer = setInterval(updateTime, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

function updateTime() {
    timeInSeconds++;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    stopTimer();
    timeInSeconds = 0;
    timerElement.textContent = '00:00';
}

function displayQuestion(question) {
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.textContent = option;
        optionElement.classList.add('option');
        optionElement.onclick = () => checkAnswer(optionElement);
        optionsElement.appendChild(optionElement);
    });
    startTimer();
}

function checkAnswer(selectedOption) {
    const selectedAnswer = selectedOption.textContent;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;
    const resultColor = isCorrect ? 'green' : 'red';

    optionsElement.querySelectorAll('.option').forEach(option => {
        option.style.backgroundColor = option.textContent === correctAnswer ? 'green' : 'red';
        option.style.color = 'white';
        option.onclick = null;
    });

    if (isCorrect) {
        score++;
    }

    questionTimes[currentQuestionIndex] = timeInSeconds; // Сохранение времени для текущего вопроса
    resetTimer();
    nextButton.disabled = false;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = (currentQuestionIndex + 1) / questions.length * 100;
    progressBar.value = progress;
}

function nextQuestion() {
    stopTimer();
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        nextButton.disabled = true;
        updateProgressBar(); // Обновление шкалы прогресса
    } else {
        showResult();
    }
}


function getTotalTime() {
    return questionTimes.reduce((totalTime, time) => totalTime + time, 0);
}

function showResult() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    counterElement.textContent = '';
    nextButton.style.display = 'none';
    const totalTime = getTotalTime();
    resultElement.textContent = `You scored ${score} out of ${questions.length}! Total time: ${formatTime(totalTime)}`;
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

displayQuestion(questions[currentQuestionIndex]);
resetTimer();
