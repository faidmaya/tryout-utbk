async function login() {
  const name = document.getElementById('name').value.trim();

  if (!name) {
    alert('Nama wajib diisi');
    return;
  }

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  const data = await res.json();

  // 🔑 PALING PENTING
  localStorage.setItem('participant_id', data.id);

  window.location.href = '/tryout.html';
}
