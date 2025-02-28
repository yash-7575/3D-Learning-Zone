// Quiz questions and answers
const quizData = [
    {
        question: "What is the main function of the liver?",
        options: ["Pump blood", "To help in breathing", "To filter blood and remove toxins", "To produce oxygen"],
        correct: 3
    },
    {
        question: "Where is the liver located in the human body?", 
        options: ["Left side of the chest", "Upper right side of the abdomen", "Below the lungs", "In the lower abdomen"],
        correct: 2
    },
    {
        question: "Which important digestive liquid does the liver produce?",
        options: ["Bile", "Insulin", "Saliva", "Gastric juice"],
        correct: 1
    },
    {
        question: "Which organ stores the bile produced by the liver?",
        options: [" Stomach", "Gallbladder", "Pancreas", "Intestine"],
        correct: 2
    },
    {
        question: "What vitamin is stored in the liver?",
        options: ["Vitamin C", "Vitamin D", "Vitamin A", "Vitamin E"],
        correct: 3
    },
    {
        question: "Which of these is a major disease that affects the liver?",
        options: ["Asthma", "Hepatitis", "Pneumonia", "Diabetes"],
        correct: 2
    },
    {
        question: "What is the color of a healthy human liver?",
        options: ["Reddish-brown", "Blue", "Green", "Yellow"],
        correct: 1
    },
    {
        question: "How many lobes does the human liver have?",
        options: ["One", "Two", "Three", "Four"],
        correct: 4
    },
    {
        question: "What happens if the liver stops working?",
        options: ["The heart stops beating", "The lungs stop working", "The bones become weak", "The body cannot remove toxins and digestion is affected"],
        correct: 4
    },
    {
        question: "Which of these habits is bad for the liver?",
        options: ["Eating healthy food", "Drinking too much alcohol", "Exercising regularly", "Drinking enough water"],
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

     // Send score to Django backend
     fetch('/login/submit_score_liver/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken() // Ensure CSRF token is included
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            score: score
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Score submitted:', data);
    })
    .catch(error => console.error('Error:', error));
});

function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        document.cookie.split(';').forEach(cookie => {
            let trimmed = cookie.trim();
            if (trimmed.startsWith('csrftoken=')) {
                cookieValue = trimmed.substring('csrftoken='.length);
            }
        });
    }
    return cookieValue;
}


// Start the quiz
loadQuestion();
