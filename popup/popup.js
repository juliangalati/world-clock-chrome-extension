const TIMEZONES = [
  { tz: 'Pacific/Honolulu',               label: 'Honolulu'      },
  { tz: 'America/Anchorage',              label: 'Anchorage'     },
  { tz: 'America/Los_Angeles',            label: 'Los Angeles'   },
  { tz: 'America/Denver',                 label: 'Denver'        },
  { tz: 'America/Chicago',                label: 'Chicago'       },
  { tz: 'America/New_York',               label: 'New York'      },
  { tz: 'America/Halifax',                label: 'Halifax'       },
  { tz: 'America/St_Johns',               label: "St. John's"    },
  { tz: 'America/Sao_Paulo',              label: 'São Paulo'     },
  { tz: 'America/Argentina/Buenos_Aires', label: 'Buenos Aires'  },
  { tz: 'America/Santiago',               label: 'Santiago'      },
  { tz: 'America/Bogota',                 label: 'Bogotá'        },
  { tz: 'America/Mexico_City',            label: 'Mexico City'   },
  { tz: 'America/Toronto',                label: 'Toronto'       },
  { tz: 'America/Vancouver',              label: 'Vancouver'     },
  { tz: 'Atlantic/Reykjavik',             label: 'Reykjavik'     },
  { tz: 'Europe/London',                  label: 'London'        },
  { tz: 'Europe/Lisbon',                  label: 'Lisbon'        },
  { tz: 'Europe/Madrid',                  label: 'Madrid'        },
  { tz: 'Europe/Paris',                   label: 'Paris'         },
  { tz: 'Europe/Berlin',                  label: 'Berlin'        },
  { tz: 'Europe/Rome',                    label: 'Rome'          },
  { tz: 'Europe/Athens',                  label: 'Athens'        },
  { tz: 'Europe/Helsinki',                label: 'Helsinki'      },
  { tz: 'Europe/Moscow',                  label: 'Moscow'        },
  { tz: 'Africa/Cairo',                   label: 'Cairo'         },
  { tz: 'Africa/Nairobi',                 label: 'Nairobi'       },
  { tz: 'Africa/Johannesburg',            label: 'Johannesburg'  },
  { tz: 'Asia/Dubai',                     label: 'Dubai'         },
  { tz: 'Asia/Karachi',                   label: 'Karachi'       },
  { tz: 'Asia/Kolkata',                   label: 'Kolkata'       },
  { tz: 'Asia/Dhaka',                     label: 'Dhaka'         },
  { tz: 'Asia/Bangkok',                   label: 'Bangkok'       },
  { tz: 'Asia/Shanghai',                  label: 'Shanghai'      },
  { tz: 'Asia/Singapore',                 label: 'Singapore'     },
  { tz: 'Asia/Tokyo',                     label: 'Tokyo'         },
  { tz: 'Asia/Seoul',                     label: 'Seoul'         },
  { tz: 'Australia/Sydney',               label: 'Sydney'        },
  { tz: 'Pacific/Auckland',               label: 'Auckland'      },
  { tz: 'Pacific/Fiji',                   label: 'Fiji'          },
];

const DEFAULT_TZ = 'Europe/Madrid';
const STORAGE_KEY = 'secondTz';

const localTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

let secondTz = DEFAULT_TZ;

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

function labelFor(tz) {
  return (TIMEZONES.find(t => t.tz === tz) ?? { label: tz.split('/').pop().replace(/_/g, ' ') }).label;
}

function update() {
  const now = new Date();

  document.getElementById('local-time').textContent = formatTime(now, localTZ);
  document.getElementById('local-date').textContent = formatDate(now, localTZ);

  document.getElementById('second-time').textContent = formatTime(now, secondTz);
  document.getElementById('second-date').textContent = formatDate(now, secondTz);
}

function setSecondTz(tz) {
  secondTz = tz;
  document.getElementById('second-label').textContent = labelFor(tz) + ' ▾';
  update();
}

const tzSearch = document.getElementById('tz-search');
const tzList = document.getElementById('tz-list');

function renderList(query) {
  const results = query
    ? TIMEZONES.filter(t => t.label.toLowerCase().includes(query.toLowerCase()))
    : TIMEZONES;
  tzList.innerHTML = '';
  for (const { tz, label } of results) {
    const li = document.createElement('li');
    li.textContent = label;
    li.dataset.tz = tz;
    tzList.appendChild(li);
  }
}

function showSearch() {
  document.getElementById('second-label').style.display = 'none';
  document.getElementById('tz-search-container').style.display = 'block';
  tzSearch.value = '';
  renderList('');
  tzSearch.focus();
}

function collapseSearch() {
  document.getElementById('tz-search-container').style.display = 'none';
  document.getElementById('second-label').style.display = '';
}

// Show local timezone name in the label
document.getElementById('local-label').textContent =
  localTZ.split('/').pop().replace(/_/g, ' ');

document.getElementById('second-label').addEventListener('click', showSearch);

tzSearch.addEventListener('input', () => renderList(tzSearch.value));
tzSearch.addEventListener('blur', collapseSearch);
tzSearch.addEventListener('keydown', (e) => { if (e.key === 'Escape') collapseSearch(); });

// mousedown prevents blur on the input when clicking a list item
tzList.addEventListener('mousedown', (e) => e.preventDefault());
tzList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  chrome.storage.sync.set({ [STORAGE_KEY]: li.dataset.tz });
  setSecondTz(li.dataset.tz);
  collapseSearch();
});

async function init() {
  const result = await chrome.storage.sync.get(STORAGE_KEY);
  setSecondTz(result[STORAGE_KEY] ?? DEFAULT_TZ);
  setInterval(update, 1000);
}

init();
