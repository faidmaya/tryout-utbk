function renderNav() {
  const nav = document.getElementById('nav');
  nav.innerHTML = '';

  questions.forEach((q, i) => {
    const btn = document.createElement('button');
    btn.textContent = i + 1;

    btn.className = `
      w-10 h-10 rounded-full font-semibold
      ${answers[q.id]
        ? 'bg-blue-600 text-white'
        : 'bg-blue-100 text-blue-800'}
      hover:bg-blue-700 hover:text-white transition
    `;

    btn.onclick = () => {
      index = i;
      renderQuestion();
    };

    nav.appendChild(btn);
  });
}
