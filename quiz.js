// Quiz Questions Data
const quizData = [
    {
        question: "Which programming language is known as the 'language of the web'?",
        options: ["Python", "C++", "JavaScript", "Java"],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to link a JavaScript file?",
        options: ["<link>", "<js>", "<script>", "<href>"],
        correct: 2
    }
];

// Variables
let currentIdx = 0;
let score = 0;

// Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const qNumEl = document.getElementById("q-number");
const scoreEl = document.getElementById("score-text");
const progressFill = document.getElementById("progress-fill");

// Load Quiz Question
function loadQuiz() {
    const currentData = quizData[currentIdx];

    // Update Header
    qNumEl.innerText = `Question ${currentIdx + 1}/${quizData.length}`;
    progressFill.style.width = `${(currentIdx / quizData.length) * 100}%`;

    // Load Question
    questionEl.innerText = currentData.question;

    // Load Options
    optionsEl.innerHTML = "";
    currentData.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.innerText = option;

        btn.addEventListener("click", () => handleSelect(btn, index));
        optionsEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

// Handle Option Click
function handleSelect(selectedBtn, index) {
    const correctIdx = quizData[currentIdx].correct;
    const allBtns = document.querySelectorAll(".option-btn");

    // Disable all buttons
    allBtns.forEach(btn => btn.disabled = true);

    // Check Answer
    if (index === correctIdx) {
        selectedBtn.classList.add("correct");
        score++;
        scoreEl.innerText = `Score: ${score}`;
    } else {
        selectedBtn.classList.add("wrong");
        allBtns[correctIdx].classList.add("correct");
    }

    nextBtn.style.display = "block";
}

// Next Button Click
nextBtn.addEventListener("click", () => {
    currentIdx++;

    if (currentIdx < quizData.length) {
        loadQuiz();
    } else {
        showFinalResults();
    }
});

// Show Final Result
function showFinalResults() {
    document.getElementById("quiz-content").classList.add("hide");

    const resultArea = document.getElementById("result-area");
    resultArea.classList.remove("hide");

    progressFill.style.width = "100%";

    document.getElementById("final-score").innerText =
        `Your Score: ${score} / ${quizData.length}`;
}

// Start Quiz
loadQuiz();
