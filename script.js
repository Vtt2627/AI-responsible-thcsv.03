const startButton = document.getElementById("startButton");
const quiz = document.getElementById("quiz");
const startSection = document.getElementById("startSection");
const nextButton = document.getElementById("nextButton");
const result = document.getElementById("result");
const scoreResult = document.getElementById("scoreResult");
const attentionResult = document.getElementById("attentionResult");
const recommendationResult = document.getElementById("recommendationResult");

let currentQuestion = 0;
let answers = [];

startButton.addEventListener("click", function () {
    const studentCode = document.getElementById("studentCode").value;
    if (studentCode === "") {
        alert("Vui lòng nhập mã học sinh.");
        return;
    }
    quiz.style.display = "block";
    startSection.style.display = "none";
    showQuestion();
});

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById("questionNumber").textContent = q.id;
    document.getElementById("questionText").textContent = q.question;
    
    if (currentQuestion === questions.length - 1) {
        nextButton.textContent = "Nộp bài";
    } else {
        nextButton.textContent = "Tiếp tục";
    }

    const options = document.getElementById("options");
    options.innerHTML = "";
    q.options.forEach(function(option, index) {
        options.innerHTML += `
            <label>
                <input type="radio" name="answer" value="${index}">
                ${option}
            </label>
            <br><br>
        `;
    });
}

nextButton.addEventListener("click", function () {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        alert("Vui lòng chọn một phương án.");
        return;
    }
    answers[currentQuestion] = Number(selected.value);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
});

function calculateScore() {
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
        if (answers[i] === questions[i].answer) {
            totalScore++;
        }
    }
    return totalScore;
}

function analyzeBehaviors() {
    let result = {};
    for (let i = 0; i < questions.length; i++) {
        const behavior = questions[i].behavior;
        if (answers[i] === questions[i].answer) {
            result[behavior] = 1;
        } else {
            result[behavior] = 0;
        }
    }
    return result;
}

function getNeedAttention(behaviorResults) {
    let needAttention = [];
    for (const behavior in behaviorResults) {
        if (behaviorResults[behavior] === 0) {
            needAttention.push(behavior);
        }
    }
    return needAttention;
}

function getRecommendations(needAttention) {
    let result = [];
    for (let i = 0; i < needAttention.length; i++) {
        const behavior = needAttention[i];
        result.push({
            behavior: behavior,
            recommendation: recommendations[behavior]
        });
    }
    return result;
}

function saveResult(studentCode, score, behaviorResults, needAttention, resultRecommendations) {
    const resultData = {
        studentCode: studentCode,
        attempt: Date.now(),
        score: score,
        answers: answers,
        behaviorResults: behaviorResults,
        needAttention: needAttention,
        recommendations: resultRecommendations
    };
    let results = JSON.parse(localStorage.getItem("aiResponsibleResults")) || [];
    results.push(resultData);
    localStorage.setItem("aiResponsibleResults", JSON.stringify(results));
}

function showResult(score, needAttention, resultRecommendations) {
    quiz.style.display = "none";
    result.style.display = "block";
    scoreResult.textContent = "Điểm của bạn: " + score + "/9";
    
    attentionResult.innerHTML = "";
    recommendationResult.innerHTML = "";

    if (needAttention.length === 0) {
        attentionResult.innerHTML = "<p>Chưa có nội dung cần chú ý trong các tình huống đánh giá.</p>";
    } else {
        needAttention.forEach(function(behavior) {
            attentionResult.innerHTML += "<p>• " + behavior + " – " + behaviors[behavior] + "</p>";
        });
    }

    resultRecommendations.forEach(function(item) {
        recommendationResult.innerHTML += "<p>• " + item.behavior + ": " + item.recommendation + "</p>";
    });
}

function finishQuiz() {
    const studentCode = document.getElementById("studentCode").value;
    const score = calculateScore();
    const behaviorResults = analyzeBehaviors();
    const needAttention = getNeedAttention(behaviorResults);
    const resultRecommendations = getRecommendations(needAttention);

    saveResult(studentCode, score, behaviorResults, needAttention, resultRecommendations);
    showResult(score, needAttention, resultRecommendations);
}