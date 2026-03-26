const MADRID_TZ = 'Europe/Madrid';

const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** @param {Date} date @param {string} timeZone */
function formatTime(date, timeZone) {
  return date.toLocaleTimeString('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/** @param {Date} date @param {string} timeZone */
function formatDate(date, timeZone) {
  return date.toLocaleDateString('en-GB', {
    timeZone,
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function update() {
  const now = new Date();

  document.getElementById('local-time').textContent = formatTime(now, localTZ);
  document.getElementById('local-date').textContent = formatDate(now, localTZ);

  document.getElementById('madrid-time').textContent = formatTime(now, MADRID_TZ);
  document.getElementById('madrid-date').textContent = formatDate(now, MADRID_TZ);
}

// Show local timezone name in the label
document.getElementById('local-label').textContent =
  localTZ.split('/').pop().replace(/_/g, ' ');

update();
setInterval(update, 1000);
