// Quiz questions and answers
const quizData = [
    {
        question: "What is the main function of the brain?",
        options: ["To control body functions and process information", "To pump blood", "To digest food", "To produce oxygen"],
        correct: 1
    },
    {
        question: "Which part of the brain controls balance and coordination?", 
        options: ["Cerebrum", "Brainstem", "Cerebellum", "Spinal cord"],
        correct: 3
    },
    {
        question: "Which is the largest part of the brain?",
        options: ["Cerebrum", "Cerebellum", "Brainstem", "Medulla"],
        correct: 1
    },
    {
        question: "Which part of the brain is responsible for thinking and memory?",
        options: ["Cerebrum", "Cerebellum", "Brainstem", "Medulla"],
        correct: 1
    },
    {
        question: "What connects the brain to the spinal cord?",
        options: ["Cerebrum", "Cerebellum", "Brainstem", "Medulla"],
        correct: 2
    },
    {
        question: "How many hemispheres does the brain have?",
        options: ["One", "Two", "Three", "Four"],
        correct: 2
    },
    {
        question: "What protects the brain inside the head?",
        options: ["Skull", "Ribcage", "Muscles", "Lungs"],
        correct: 1
    },
    {
        question: "Which part of the brain controls involuntary actions like breathing and heartbeat?",
        options: ["Cerebrum", "Cerebellum", "Medulla", "Spinal cord"],
        correct: 3
    },
    {
        question: "What are the cells in the brain called?",
        options: ["Alveoli", "Neurons", "Arteries", "Fibers"],
        correct: 2
    },
    {
        question: "Which part of the brain helps us solve math problems?",
        options: ["Cerebrum", "Cerebellum", "Brainstem", "Spinal cord "],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

// DOM elements
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const resultsEl = document.getElementById('results');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const progressBar = document.querySelector('.progress');

// Initialize quiz
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = question.question;

    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;

        if (userAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }

        button.addEventListener('click', () => selectOption(index));
        optionsEl.appendChild(button);
    });

    updateNavButtons();
    updateProgressBar();
}

// Handle option selection
function selectOption(index) {
    userAnswers[currentQuestion] = index;
    const options = optionsEl.getElementsByClassName('option');

    for (let option of options) {
        option.classList.remove('selected');
    }
    options[index].classList.add('selected');

    updateNavButtons();
}

// Navigation and UI updates
function updateNavButtons() {
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.style.display = currentQuestion === quizData.length - 1 ? 'none' : 'block';
    submitBtn.style.display = currentQuestion === quizData.length - 1 ? 'block' : 'none';
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
});

submitBtn.addEventListener('click', () => {
    // Calculate score
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === quizData[index].correct ? 1 : 0);
    }, 0);

    // Display results
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
    resultsEl.style.display = 'block';

    // Disable all interactions
    optionsEl.querySelectorAll('button').forEach(btn => btn.disabled = true);
    submitBtn.disabled = true;
    prevBtn.disabled = true;
});

// Start the quiz
loadQuestion();
