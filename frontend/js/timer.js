const participantId = localStorage.getItem('participant_id');
const timerEl = document.getElementById('timer');
const subtestTitleEl = document.getElementById('subtest-title');

if (!participantId) {
  alert('Session tidak valid, login ulang');
  window.location.href = '/login.html';
}

async function startTimer() {
  const res = await fetch(
    `/api/progress?participant_id=${participantId}`
  );
  const data = await res.json();

  console.log('Progress:', data); // DEBUG AMAN

  const startTime = new Date(data.subtest_start_time).getTime();
  const durationMs = data.duration_minutes * 60 * 1000;

  if (subtestTitleEl) {
    subtestTitleEl.textContent =
      `Subtest: ${data.name} (${data.duration_minutes} menit)`;
  }

  function tick() {
    const now = Date.now();
    const remaining = durationMs - (now - startTime);

    if (remaining <= 0) {
      timerEl.textContent = '00:00';
      alert('Waktu subtest habis');
      return;
    }

    const min = Math.floor(remaining / 60000);
    const sec = Math.floor((remaining % 60000) / 1000);

    timerEl.textContent =
      `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  tick();
  setInterval(tick, 1000);
}

startTimer();
