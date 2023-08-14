const questions = [
        {
            "question": "Which Country won the first-ever FIFA World Cup in 1930?",
            "answers": ["A. Brazil", "B. Germany", "C. Uruguay", "D. France"],
            "correctIndex": 2
        },
        {
            "question": "What is the name of the FC Barcelona stadium?",
            "answers": ["A. Santiago Bernabeu", "B. Camp Nou", "C. Allianz Arena", "D. San Siro"],
            "correctIndex": 1
        },
        {
            "question": "Who is the all-time top scorer in men's international football?",
            "answers": ["A. Lionel Messi", "B. Thierry Henry", "C. Cristiano Ronaldo", "D. Robert Lewandowski"],
            "correctIndex": 2
        },
        {
            "question": "The \"Hand of God\" goal is associated with which legendary player?",
            "answers": ["A. Diego Maradona", "B. Pele", "C. Zinedine Zidane", "D. Johan Cruyff"],
            "correctIndex": 0
        },
        {
            "question": "Which player is famously referred to as \"The King\" in the football world?",
            "answers": ["A. Eric Cantona", "B. Pele", "C. Robbie Fowler", "D. Diego Maradona"],
            "correctIndex": 1
        },
        {
            "question": "How long is a standard game of football?",
            "answers": ["A. 70 minutes", "B. 80 minutes", "C. 90 minutes", "D. 100 minutes"],
            "correctIndex": 2
        },
        {
            "question": "Which country has won the most FIFA World Cup titles as of 2023?",
            "answers": ["A. Germany", "B. Argentina", "C. Italy", "D. Brazil"],
            "correctIndex": 3
        },
        {
            "question": "Which football club is owned by former English footballer David Beckham?",
            "answers": ["A. Inter Miami CF", "B. Manchester United", "C. LA Galaxy", "D. Wrexham AFC"],
            "correctIndex": 0
        },
        {
            "question": "Who is the all-time Premier League Top Scorer?",
            "answers": ["A. Wayne Rooney", "B. Alan Shearer", "C. Cristiano Ronaldo", "D. Harry Kane"],
            "correctIndex": 1
        },
        {
            "question": "Which of the following teams have NOT won the UEFA Champions League?",
            "answers": ["A. Arsenal", "B. Celtic", "C. Aston Villa", "D. PSV Eindhoven"],
            "correctIndex": 0
        }
    ]
;

let currentQuestionIndex = 0;
let score = 0;

const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const resultDiv = document.getElementById("result");
const scoreText = document.getElementById("score");
const quizContainers = document.querySelectorAll(".quiz-container");

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        const buttons = document.querySelectorAll(".quiz-button");

        const questionElement = document.querySelector(".quiz-question");
        questionElement.textContent = currentQuestion.question;

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].textContent = currentQuestion.answers[i];
            buttons[i].classList.remove("correct", "wrong");
            buttons[i].disabled = false;
        }

        nextButton.style.display = "none";
    } else {
        showResults();
    }
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswerIndex = questions[currentQuestionIndex].correctIndex;
    const buttons = document.querySelectorAll(".quiz-button");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === questions[currentQuestionIndex].answers[correctAnswerIndex]) {
            button.classList.add("correct");
        }
        if (button.textContent === selectedAnswer && button.textContent !== questions[currentQuestionIndex].answers[correctAnswerIndex]) {
            button.classList.add("wrong");
        }
    });

    if (selectedAnswer === questions[currentQuestionIndex].answers[correctAnswerIndex]) {
        score++;
    }

    nextButton.style.display = "block";
}

function showResults() {
    for (let i = 0; i < quizContainers.length; i++) {
        quizContainers[i].style.display = "none";
    }
    resultDiv.style.display = "block";
    nextButton.style.display = "none";
    startButton.style.display = "block";

    scoreText.innerHTML = `You answered <strong>${score}</strong> out of <strong>${questions.length}</strong> questions correctly`;
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        for (let i = 0; i < quizContainers.length; i++) {
            quizContainers[i].style.display = "block";
        }
        resultDiv.style.display = "none";
        showQuestion();
    } else {
        showResults();
    }
});

startButton.addEventListener("click", () => {
    resetQuiz();
});

const answerButtons = document.querySelectorAll(".quiz-button:not(#next-button)");
answerButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
});

const quizContainer = document.getElementById("quiz");
const aboutContainer = document.getElementById("about");
const contactContainer = document.getElementById("contact");

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    for (let i = 0; i < quizContainers.length; i++) {
        quizContainers[i].style.display = "block";
    }
    resultDiv.style.display = "none";

    quizContainer.style.display = "block";
    aboutContainer.style.display = "none";
    contactContainer.style.display = "none";

    showQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const homeLink = document.getElementById("home-link");
    const aboutLink = document.getElementById("about-link");
    const contactLink = document.getElementById("contact-link");

    homeLink.addEventListener("click", (event) => {
        event.preventDefault();
        resetQuiz();
    });

    aboutLink.addEventListener("click", (event) => {
        event.preventDefault();
        quizContainer.style.display = "none";
        contactContainer.style.display = "none";
        aboutContainer.style.display = "block";
    });

    contactLink.addEventListener("click", (event) => {
        event.preventDefault();
        quizContainer.style.display = "none";
        aboutContainer.style.display = "none";
        contactContainer.style.display = "block";
    });
});

showQuestion();
