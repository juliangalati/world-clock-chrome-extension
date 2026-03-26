const TIMEZONES = [
  // Americas
  { tz: 'Pacific/Honolulu',               label: 'Honolulu'          },
  { tz: 'America/Anchorage',              label: 'Anchorage'         },
  { tz: 'America/Los_Angeles',            label: 'Los Angeles'       },
  { tz: 'America/Vancouver',              label: 'Vancouver'         },
  { tz: 'America/Denver',                 label: 'Denver'            },
  { tz: 'America/Mexico_City',            label: 'Mexico City'       },
  { tz: 'America/Chicago',                label: 'Chicago'           },
  { tz: 'America/Panama',                 label: 'Panama City'       },
  { tz: 'America/Bogota',                 label: 'Bogotá'            },
  { tz: 'America/Lima',                   label: 'Lima'              },
  { tz: 'America/New_York',               label: 'New York'          },
  { tz: 'America/Toronto',                label: 'Toronto'           },
  { tz: 'America/Havana',                 label: 'Havana'            },
  { tz: 'America/Caracas',                label: 'Caracas'           },
  { tz: 'America/La_Paz',                 label: 'La Paz'            },
  { tz: 'America/Manaus',                 label: 'Manaus'            },
  { tz: 'America/Halifax',                label: 'Halifax'           },
  { tz: 'America/Santiago',               label: 'Santiago'          },
  { tz: 'America/Sao_Paulo',              label: 'São Paulo'         },
  { tz: 'America/St_Johns',               label: "St. John's"        },
  { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires'      },
  { tz: 'America/Montevideo',             label: 'Montevideo'        },
  // Europe
  { tz: 'Atlantic/Reykjavik',             label: 'Reykjavik'         },
  { tz: 'Europe/Dublin',                  label: 'Dublin'            },
  { tz: 'Europe/London',                  label: 'London'            },
  { tz: 'Europe/Lisbon',                  label: 'Lisbon'            },
  { tz: 'Europe/Madrid',                  label: 'Madrid'            },
  { tz: 'Europe/Paris',                   label: 'Paris'             },
  { tz: 'Europe/Amsterdam',               label: 'Amsterdam'         },
  { tz: 'Europe/Berlin',                  label: 'Berlin'            },
  { tz: 'Europe/Zurich',                  label: 'Zurich'            },
  { tz: 'Europe/Vienna',                  label: 'Vienna'            },
  { tz: 'Europe/Prague',                  label: 'Prague'            },
  { tz: 'Europe/Warsaw',                  label: 'Warsaw'            },
  { tz: 'Europe/Stockholm',               label: 'Stockholm'         },
  { tz: 'Europe/Oslo',                    label: 'Oslo'              },
  { tz: 'Europe/Copenhagen',              label: 'Copenhagen'        },
  { tz: 'Europe/Rome',                    label: 'Rome'              },
  { tz: 'Europe/Budapest',                label: 'Budapest'          },
  { tz: 'Europe/Bucharest',               label: 'Bucharest'         },
  { tz: 'Europe/Athens',                  label: 'Athens'            },
  { tz: 'Europe/Helsinki',                label: 'Helsinki'          },
  { tz: 'Europe/Kyiv',                    label: 'Kyiv'              },
  { tz: 'Europe/Istanbul',                label: 'Istanbul'          },
  { tz: 'Europe/Moscow',                  label: 'Moscow'            },
  // Africa
  { tz: 'Africa/Dakar',                   label: 'Dakar'             },
  { tz: 'Africa/Casablanca',              label: 'Casablanca'        },
  { tz: 'Africa/Tunis',                   label: 'Tunis'             },
  { tz: 'Africa/Lagos',                   label: 'Lagos'             },
  { tz: 'Africa/Cairo',                   label: 'Cairo'             },
  { tz: 'Africa/Khartoum',               label: 'Khartoum'          },
  { tz: 'Africa/Addis_Ababa',             label: 'Addis Ababa'       },
  { tz: 'Africa/Nairobi',                 label: 'Nairobi'           },
  { tz: 'Africa/Johannesburg',            label: 'Johannesburg'      },
  // Middle East & Asia
  { tz: 'Asia/Jerusalem',                 label: 'Jerusalem'         },
  { tz: 'Asia/Beirut',                    label: 'Beirut'            },
  { tz: 'Asia/Baghdad',                   label: 'Baghdad'           },
  { tz: 'Asia/Riyadh',                    label: 'Riyadh'            },
  { tz: 'Asia/Kuwait',                    label: 'Kuwait City'       },
  { tz: 'Asia/Muscat',                    label: 'Muscat'            },
  { tz: 'Asia/Tehran',                    label: 'Tehran'            },
  { tz: 'Asia/Dubai',                     label: 'Dubai'             },
  { tz: 'Asia/Tashkent',                  label: 'Tashkent'          },
  { tz: 'Asia/Almaty',                    label: 'Almaty'            },
  { tz: 'Asia/Karachi',                   label: 'Karachi'           },
  { tz: 'Asia/Colombo',                   label: 'Colombo'           },
  { tz: 'Asia/Kolkata',                   label: 'Kolkata'           },
  { tz: 'Asia/Kathmandu',                 label: 'Kathmandu'         },
  { tz: 'Asia/Dhaka',                     label: 'Dhaka'             },
  { tz: 'Asia/Yangon',                    label: 'Yangon'            },
  { tz: 'Asia/Bangkok',                   label: 'Bangkok'           },
  { tz: 'Asia/Ho_Chi_Minh',               label: 'Ho Chi Minh City'  },
  { tz: 'Asia/Jakarta',                   label: 'Jakarta'           },
  { tz: 'Asia/Kuala_Lumpur',              label: 'Kuala Lumpur'      },
  { tz: 'Asia/Singapore',                 label: 'Singapore'         },
  { tz: 'Asia/Taipei',                    label: 'Taipei'            },
  { tz: 'Asia/Hong_Kong',                 label: 'Hong Kong'         },
  { tz: 'Asia/Shanghai',                  label: 'Shanghai'          },
  { tz: 'Asia/Ulaanbaatar',               label: 'Ulaanbaatar'       },
  { tz: 'Asia/Manila',                    label: 'Manila'            },
  { tz: 'Asia/Tokyo',                     label: 'Tokyo'             },
  { tz: 'Asia/Seoul',                     label: 'Seoul'             },
  // Oceania
  { tz: 'Australia/Perth',                label: 'Perth'             },
  { tz: 'Australia/Adelaide',             label: 'Adelaide'          },
  { tz: 'Australia/Brisbane',             label: 'Brisbane'          },
  { tz: 'Australia/Melbourne',            label: 'Melbourne'         },
  { tz: 'Australia/Sydney',               label: 'Sydney'            },
  { tz: 'Pacific/Port_Moresby',           label: 'Port Moresby'      },
  { tz: 'Pacific/Guam',                   label: 'Guam'              },
  { tz: 'Pacific/Fiji',                   label: 'Fiji'              },
  { tz: 'Pacific/Auckland',               label: 'Auckland'          },
  { tz: 'Pacific/Apia',                   label: 'Apia'              },
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
  const r = size / 2 - 1.5;

  const now = new Date();
  const hours = (now.getHours() % 12) + now.getMinutes() / 60;
  const minutes = now.getMinutes() + now.getSeconds() / 60;

  // White face
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Blue ring
  ctx.strokeStyle = '#1a73e8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Hour markers at 12, 3, 6, 9
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
    ctx.fillStyle = '#1a73e8';
    ctx.beginPath();
    ctx.arc(
      cx + Math.cos(angle) * (r - 3.5),
      cy + Math.sin(angle) * (r - 3.5),
      1.5, 0, Math.PI * 2
    );
    ctx.fill();
  }

  /** @param {number} angle  @param {number} length  @param {number} width */
  function drawHand(angle, length, width) {
    ctx.strokeStyle = '#1a73e8';
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
  drawHand((minutes / 60) * Math.PI * 2 - Math.PI / 2, r * 0.70, 1.5);

  // Center dot
  ctx.fillStyle = '#1a73e8';
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
