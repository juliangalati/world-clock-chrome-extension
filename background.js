const TIMEZONES = [
  { tz: 'America/Anchorage',              label: 'Anchorage'     },
  { tz: 'Europe/Athens',                  label: 'Athens'        },
  { tz: 'Pacific/Auckland',               label: 'Auckland'      },
  { tz: 'Asia/Bangkok',                   label: 'Bangkok'       },
  { tz: 'Europe/Berlin',                  label: 'Berlin'        },
  { tz: 'America/Bogota',                 label: 'Bogotá'        },
  { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires'  },
  { tz: 'Africa/Cairo',                   label: 'Cairo'         },
  { tz: 'America/Chicago',                label: 'Chicago'       },
  { tz: 'America/Denver',                 label: 'Denver'        },
  { tz: 'Asia/Dhaka',                     label: 'Dhaka'         },
  { tz: 'Asia/Dubai',                     label: 'Dubai'         },
  { tz: 'Pacific/Fiji',                   label: 'Fiji'          },
  { tz: 'America/Halifax',                label: 'Halifax'       },
  { tz: 'Europe/Helsinki',                label: 'Helsinki'      },
  { tz: 'Pacific/Honolulu',               label: 'Honolulu'      },
  { tz: 'Africa/Johannesburg',            label: 'Johannesburg'  },
  { tz: 'Asia/Karachi',                   label: 'Karachi'       },
  { tz: 'Asia/Kolkata',                   label: 'Kolkata'       },
  { tz: 'Europe/Lisbon',                  label: 'Lisbon'        },
  { tz: 'Europe/London',                  label: 'London'        },
  { tz: 'America/Los_Angeles',            label: 'Los Angeles'   },
  { tz: 'Europe/Madrid',                  label: 'Madrid'        },
  { tz: 'America/Mexico_City',            label: 'Mexico City'   },
  { tz: 'Europe/Moscow',                  label: 'Moscow'        },
  { tz: 'Africa/Nairobi',                 label: 'Nairobi'       },
  { tz: 'America/New_York',               label: 'New York'      },
  { tz: 'Europe/Paris',                   label: 'Paris'         },
  { tz: 'Atlantic/Reykjavik',             label: 'Reykjavik'     },
  { tz: 'Europe/Rome',                    label: 'Rome'          },
  { tz: 'America/Santiago',               label: 'Santiago'      },
  { tz: 'America/Sao_Paulo',              label: 'São Paulo'     },
  { tz: 'Asia/Seoul',                     label: 'Seoul'         },
  { tz: 'Asia/Shanghai',                  label: 'Shanghai'      },
  { tz: 'Asia/Singapore',                 label: 'Singapore'     },
  { tz: 'America/St_Johns',               label: "St. John's"    },
  { tz: 'Australia/Sydney',               label: 'Sydney'        },
  { tz: 'Asia/Tokyo',                     label: 'Tokyo'         },
  { tz: 'America/Toronto',                label: 'Toronto'       },
  { tz: 'America/Vancouver',              label: 'Vancouver'     },
];

const DEFAULT_TZ = 'Europe/Madrid';
const STORAGE_KEY = 'secondTz';

function labelFor(tz) {
  return (TIMEZONES.find(t => t.tz === tz) ?? { label: tz.split('/').pop().replace(/_/g, ' ') }).label;
}

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

async function updateIcon() {
  const imageData = drawClockIcon();
  chrome.action.setIcon({ imageData: { 32: imageData } });

  const result = await chrome.storage.sync.get(STORAGE_KEY);
  const secondTz = result[STORAGE_KEY] ?? DEFAULT_TZ;

  const now = new Date();
  const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localLabel = localTZ.split('/').pop().replace(/_/g, ' ');
  const localTime = formatTime(now, localTZ);
  const secondTime = formatTime(now, secondTz);
  chrome.action.setTitle({ title: `${localTime} — ${localLabel}\n${secondTime} — ${labelFor(secondTz)}` });
}

chrome.runtime.onInstalled.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);
chrome.storage.onChanged.addListener(updateIcon);

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'tick') updateIcon();
});

chrome.alarms.create('tick', { periodInMinutes: 1 });

updateIcon();
