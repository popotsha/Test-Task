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


let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const counterElement = document.querySelector('.counter');
const nextButton = document.querySelector('.next-btn');
const resultElement = document.getElementById('result');

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

    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(questions[currentQuestionIndex]);
        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        nextButton.disabled = true;
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    counterElement.textContent = '';
    nextButton.style.display = 'none';
    resultElement.textContent = `You scored ${score} out of ${questions.length}!`;
}
  
displayQuestion(questions[currentQuestionIndex]);
