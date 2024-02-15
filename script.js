const questions = {
    easy: [
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
            question: "What is the capital of France?",
            options: ["Paris", "Rome", "Berlin"],
            correctAnswer: "Paris"
        },
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra"],
            correctAnswer: "Canberra"
        },
        {
            question: "What is the currency of Japan?",
            options: ["Yuan", "Yen", "Won"],
            correctAnswer: "Yen"
        }
    ],
    medium: [
        {
            question: "What is the longest river in the world?",
            options: ["Nile", "Amazon", "Yangtze"],
            correctAnswer: "Nile"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Mars", "Venus", "Jupiter"],
            correctAnswer: "Mars"
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso"],
            correctAnswer: "Leonardo da Vinci"
        },
        {
            question: "What is the largest mammal?",
            options: ["Elephant", "Blue Whale", "Giraffe"],
            correctAnswer: "Blue Whale"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["William Shakespeare", "Jane Austen", "Charles Dickens"],
            correctAnswer: "William Shakespeare"
        }
    ],
    hard: [
        {
            question: "What is the capital of Canada?",
            options: ["Toronto", "Ottawa", "Vancouver"],
            correctAnswer: "Ottawa"
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Au", "Ag", "Fe"],
            correctAnswer: "Au"
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["Mount Everest", "K2", "Kangchenjunga"],
            correctAnswer: "Mount Everest"
        },
        {
            question: "Who discovered penicillin?",
            options: ["Alexander Fleming", "Marie Curie", "Isaac Newton"],
            correctAnswer: "Alexander Fleming"
        },
        {
            question: "In which year did the Titanic sink?",
            options: ["1912", "1907", "1921"],
            correctAnswer: "1912"
        }
    ]
};


let currentQuestion = 0;
let score = 0;
let startTime, endTime;
let selectedDifficulty = 'easy';

const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');
const counterElement = document.querySelector('.counter');
const nextButton = document.querySelector('.next-btn');
const difficultySelect = document.getElementById('difficulty');
const progressElement = document.querySelector('.progress');

function displayQuestion() {
    const q = questions[selectedDifficulty][currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = '';

    q.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkAnswer(option));
        optionsElement.appendChild(optionElement);
    });

    counterElement.textContent = `Question ${currentQuestion + 1} of ${questions[selectedDifficulty].length}`;
    updateProgress();
}

function checkAnswer(answer) {
    const q = questions[selectedDifficulty][currentQuestion];
    if (answer === q.correctAnswer) {
        score++;
        optionsElement.childNodes.forEach(option => {
            if (option.textContent === answer) {
                option.style.backgroundColor = '#5cb85c';
            }
        });
    } else {
        optionsElement.childNodes.forEach(option => {
            if (option.textContent === answer) {
                option.style.backgroundColor = '#d9534f';
            }
            if (option.textContent === q.correctAnswer) {
                option.style.backgroundColor = '#5cb85c';
            }
        });
    }
    nextButton.disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions[selectedDifficulty].length) {
        displayQuestion();
        nextButton.disabled = true;
    } else {
        endTime = new Date();
        const timeSpent = (endTime - startTime) / 1000;
        quizContainer.innerHTML = `
            <h2>Your score: ${score} out of ${questions[selectedDifficulty].length}</h2>
            <p>Time spent: ${timeSpent} seconds</p>
            <button onclick="location.reload()">Restart Quiz</button>
        `;
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / questions[selectedDifficulty].length) * 100;
    progressElement.style.width = `${progress}%`;
}

nextButton.addEventListener('click', nextQuestion);

difficultySelect.addEventListener('change', function() {
    selectedDifficulty = this.value;
    currentQuestion = 0;
    score = 0;
    displayQuestion();
});

document.querySelector('.theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    quizContainer.classList.toggle('dark-theme');
});

displayQuestion();
startTime = new Date();
