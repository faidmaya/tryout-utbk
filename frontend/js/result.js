async function loadResult() {
  const id = localStorage.getItem('participant_id');

  const res = await fetch('http://localhost:3000/api/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ participant_id: id })
  });

  const r = await res.json();

  document.getElementById('result').innerHTML = `
    <h1 class="text-2xl font-semibold mb-4">Hasil Tryout</h1>
    <p>Benar: ${r.correct}</p>
    <p>Terjawab: ${r.answered}</p>
    <p>Total Soal: ${r.total_questions}</p>
    <p class="text-xl font-bold mt-4">Skor: ${r.score}</p>
  `;
}

loadResult();
