/**
 * Draws an analog clock face onto an OffscreenCanvas and sets it as the
 * extension's toolbar icon. Called on install, startup, and every minute.
 */
function drawClockIcon() {
  const size = 32;
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 1;

  const now = new Date();
  const hours = (now.getHours() % 12) + now.getMinutes() / 60;
  const minutes = now.getMinutes() + now.getSeconds() / 60;

  // Face
  ctx.fillStyle = '#1a73e8';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Rim
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();

  /** @param {number} angle  @param {number} length  @param {number} width */
  function drawHand(angle, length, width) {
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(
      cx + Math.cos(angle) * length,
      cy + Math.sin(angle) * length
    );
    ctx.stroke();
  }

  drawHand((hours / 12) * Math.PI * 2 - Math.PI / 2, r * 0.50, 2.5);
  drawHand((minutes / 60) * Math.PI * 2 - Math.PI / 2, r * 0.72, 1.5);

  // Center dot
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, 2, 0, Math.PI * 2);
  ctx.fill();

  return ctx.getImageData(0, 0, size, size);
}

function formatTime(date, timeZone) {
  return date.toLocaleTimeString('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function updateIcon() {
  const imageData = drawClockIcon();
  chrome.action.setIcon({ imageData: { 32: imageData } });

  const now = new Date();
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localLabel = localTZ.split('/').pop().replace(/_/g, ' ');
  const localTime = formatTime(now, localTZ);
  const madridTime = formatTime(now, 'Europe/Madrid');
  chrome.action.setTitle({ title: `${localTime} — ${localLabel}\n${madridTime} — Madrid` });
}

chrome.runtime.onInstalled.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'tick') updateIcon();
});

chrome.alarms.create('tick', { periodInMinutes: 1 });

updateIcon();
