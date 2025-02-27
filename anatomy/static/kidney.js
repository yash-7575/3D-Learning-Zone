// Quiz questions and answers
const quizData = [
    {
        question: "What is the main function of the kidneys?",
        options: ["To pump blood", "To filter waste from the blood", "To produce oxygen", "To help in digestion"],
        correct: 2
    },
    {
        question: "How many kidneys does a human normally have?", 
        options: ["One", "Two", "Three", "Four"],
        correct: 2
    },
    {
        question: "Where are the kidneys located in the human body?",
        options: ["Inside the chest", "In the lower abdomen", "On either side of the spine, near the lower back", "Near the lungs"],
        correct: 3
    },
    {
        question: "What is the name of the tiny filtering units inside the kidneys?",
        options: ["Nephrons", "Alveoli", "Capillaries", "Ureters"],
        correct: 1
    },
    {
        question: "Which liquid waste do the kidneys produce?",
        options: ["Sweat", "Saliva", "Urine", "Bile"],
        correct: 3
    },
    {
        question: "Which organ carries urine from the kidneys to the bladder?",
        options: ["Urethra", "Ureter", "Intestine", "Liver"],
        correct: 2
    },
    {
        question: "What should you drink to keep your kidneys healthy?",
        options: ["Water", "Soft drinks", "Coffee", "Juice"],
        correct: 1
    },
    {
        question: "Which disease is caused by the formation of solid particles in the kidneys?",
        options: ["Hepatitis", "Pneumonia", "Kidney stones", "Diabetes"],
        correct: 4
    },
    {
        question: "What happens if both kidneys fail completely?",
        options: ["The heart stops beating", "The lungs stop working", "The liver stops working", "The body cannot remove waste, and dialysis or a transplant is needed"],
        correct: 4
    },
    {
        question: "Which of these is NOT good for kidney health?",
        options: ["Drinking enough water", "Eating too much salt", "Exercising regularly", "Eating fruits and vegetables"],
        correct: 2
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
