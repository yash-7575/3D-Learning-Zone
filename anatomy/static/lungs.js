// Quiz questions and answers
const quizData = [
    {
        question: "What is the main function of the lungs?",
        options: ["Pump blood", "Digest food", "Exchange oxygen and carbon dioxide", "Produce hormones"],
        correct: 3
    },
    {
        question: "How many lungs do humans have?", 
        options: ["One", "Two", "Three", "Four"],
        correct: 2
    },
    {
        question: "What muscle helps the lungs in breathing?",
        options: ["Heart", "Diaphragm", "Stomach", "Liver"],
        correct: 2
    },
    {
        question: "What happens when we inhale?",
        options: ["Lungs deflate", "Lungs expand and fill with air", "Air goes out of the lungs", "Lungs shrink"],
        correct: 2
    },
    {
        question: "Which gas do we exhale?",
        options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct: 2
    },
    {
        question: "What are the tiny air sacs in the lungs called?",
        options: ["Bronchi", "Alveoli", "Trachea", "Capillaries"],
        correct: 2
    },
    {
        question: "Which tube connects the mouth and nose to the lungs?",
        options: ["Esophagus", "Trachea", "Intestine", "Bronchioles"],
        correct: 2
    },
    {
        question: "What happens to our breathing rate when we exercise?",
        options: ["It slows down", "It stops", "It increases", "It remains the same"],
        correct: 3
    },
    {
        question: "What protects the lungs inside the body?",
        options: ["Skull", "Ribcage", "Spine", "Muscles"],
        correct: 2
    },
    {
        question: "What disease is caused by smoking and damages the lungs?",
        options: ["Diabetes", "Tuberculosis", "Lung cancer", "Asthma"],
        correct: 3
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
