document.addEventListener('DOMContentLoaded', () => {
  const openedDays = JSON.parse(localStorage.getItem("openedDays") || "[]");

  // Handle click on calendar days
  document.body.addEventListener('click', (e) => {
    const day = e.target.closest('.day');
    if (!day) return;

    const parent = day.closest('.calendar-item');
    const surprise = parent.querySelector('.surprise');

    // Only allow opening if not already opened
    if (!openedDays.includes(day.dataset.day)) {
      // Fade-out the door
      day.classList.add('fade-out');

      // Show surprise after fade
      setTimeout(() => {
        day.style.display = "none";
        surprise.classList.remove('hidden');

        // Optional: add sparkle effect
        const sp = document.createElement('div');
        sp.className = 'sparkle';
        parent.appendChild(sp);
        setTimeout(() => sp.remove(), 800);
      }, 400);

      // Save opened day
      openedDays.push(day.dataset.day);
      localStorage.setItem("openedDays", JSON.stringify(openedDays));

      // Update progress bar if exists
      const progressFill = document.getElementById('fill');
      const countElem = document.getElementById('count');
      if (progressFill && countElem) {
        const count = openedDays.length;
        countElem.innerText = count;
        progressFill.style.width = (count / 24 * 100) + "%";
      }
    }
  });
});
