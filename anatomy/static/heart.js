// Quiz questions and answers
const quizData = [
    {
        question: "What does a model of the heart help you visualize?",
        options: ["The external structure only", "The internal and external structures", "Only the blood vessels", "Only the heart valves"],
        correct: 1
    },
    {
        question: "Which part of a heart model would you find the septum?", 
        options: ["Between the atria and ventricles", "In the left atrium", "In the right ventricle", "On the outer wall"],
        correct: 0
    },
    {
        question: "When looking at a model of the heart, which chambers are on the top?",
        options: ["Ventricles", "Atria", "Septa", "Valves"],
        correct: 1
    },
    {
        question: "In a heart model, the aorta is usually depicted as:",
        options: ["A vein", "A capillary", "A large artery", "A small artery"],
        correct: 2
    },
    {
        question: "Which color is typically used to represent deoxygenated blood in heart models?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correct: 1
    },
    {
        question: "What structure is shown as a \"door\" in a model of the heart, ensuring blood flows in the right direction?",
        options: ["Atrium", "Valve", "Ventricle", "Septum"],
        correct: 1
    },
    {
        question: "In a model of the heart, the pulmonary artery carries blood to:",
        options: ["The liver", "The lungs", "The brain", "The kidneys"],
        correct: 1
    },
    {
        question: "Which part of a heart model demonstrates the exchange of oxygen and carbon dioxide?",
        options: ["Coronary artery", "Pulmonary veins", "Aorta", "Capillaries in the lungs"],
        correct: 3
    },
    {
        question: "How can a model of the heart help students understand cardiovascular diseases?",
        options: ["By showing external symptoms", "By demonstrating internal abnormalities and flow of blood", "By teaching surgical techniques", "By diagnosing diseases"],
        correct: 1
    },
    {
        question: "What educational advantage does a heart model provide over 2D diagrams?",
        options: ["Simplicity", "Better spatial understanding and visualization of structures", "Less information", "Limited views"],
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
