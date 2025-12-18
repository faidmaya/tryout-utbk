let questions = [];
let answers = {};
let index = 0;

const participantId = localStorage.getItem('participant_id');

async function loadQuestions() {
  if (!participantId) {
    alert('Participant ID tidak ditemukan, login ulang');
    window.location.href = '/login.html';
    return;
  }

  const qRes = await fetch(
    `/api/questions?participant_id=${participantId}`
  );
  questions = await qRes.json();

  const aRes = await fetch(
    `/api/questions/answers/${participantId}`
  );
  const saved = await aRes.json();

  saved.forEach(a => {
    answers[a.question_id] = a.answer;
  });

  renderNav();
  renderQuestion();
}

function renderQuestion() {
  const q = questions[index];
  if (!q) return;

  let html = `<h2 class="font-medium mb-4">${index + 1}. ${q.question}</h2>`;

  ['a','b','c','d','e'].forEach(letter => {
    const key = 'option_' + letter;
    const checked = answers[q.id] === letter.toUpperCase() ? 'checked' : '';

    html += `
      <label class="block mb-2">
        <input type="radio" name="answer"
          value="${letter.toUpperCase()}"
          ${checked}
          onchange="saveAnswer(${q.id}, this.value)">
        ${letter.toUpperCase()}. ${q[key]}
      </label>
    `;
  });

  document.getElementById('question-box').innerHTML = html;
}

async function saveAnswer(questionId, answer) {
  answers[questionId] = answer;

  await fetch('/api/submit/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      participant_id: participantId,
      question_id: questionId,
      answer
    })
  });

  renderNav();
}

loadQuestions();
