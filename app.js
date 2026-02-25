let selectedQuestions = [];
let current = 0;
let score = 0;
let userAnswers = [];

function startExam(subject) {
  selectedQuestions = shuffle([...questionBank[subject]]);
  current = 0;
  score = 0;
  userAnswers = [];

  document.getElementById("homeScreen").classList.add("hidden");
  document.getElementById("quizScreen").classList.remove("hidden");
  document.getElementById("resultScreen").classList.add("hidden");

  loadQuestion();
}

function loadQuestion() {
  const q = selectedQuestions[current];

  document.getElementById("quiz").innerHTML = `
    <div class="question">
      Question ${current+1} of ${selectedQuestions.length}<br><br>
      ${q.question}
    </div>
    ${q.options.map((opt,i)=>`
      <div class="option">
        <input type="radio" name="option" value="${i}"> ${opt}
      </div>`).join("")}
  `;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="option"]:checked');
  if (!selected) return alert("Please select an answer.");

  const answerIndex = parseInt(selected.value);
  userAnswers.push(answerIndex);

  if (answerIndex === selectedQuestions[current].correct) {
    score++;
  }

  current++;

  if (current < selectedQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizScreen").classList.add("hidden");

  const percent = Math.round((score/selectedQuestions.length)*100);

  let review = `<h3>Final Score: ${score}/${selectedQuestions.length} (${percent}%)</h3>`;
  review += `<div class="review-box">`;

  selectedQuestions.forEach((q,i)=>{
    if(userAnswers[i] !== q.correct){
      review += `
      <p>
      <strong>Question:</strong> ${q.question}<br>
      <strong>Your answer:</strong> ${q.options[userAnswers[i]]}<br>
      <strong>Correct answer:</strong> ${q.options[q.correct]}
      </p>`;
    }
  });

  review += "</div>";

  document.getElementById("resultScreen").innerHTML = review;
  document.getElementById("resultScreen").classList.remove("hidden");
}

function goHome() {
  document.getElementById("homeScreen").classList.remove("hidden");
  document.getElementById("quizScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.add("hidden");
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
