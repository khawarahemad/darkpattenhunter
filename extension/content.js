// == DarkPatternHunter Content Script ==

const PATTERNS = [
  {
    name: 'Pre-checked Checkbox',
    selector: 'input[type=checkbox][checked]'
  },
  {
    name: 'Confirmshaming',
    textPatterns: [
      /no,?\s*i (don\'t|do not) want/i,
      /no,?\s*i like paying more/i,
      /no,?\s*thanks/i,
      /no,?\s*keep me signed up/i
    ]
  },
  {
    name: 'Fake Urgency',
    selector: '[class*=countdown], [id*=countdown], [class*=timer], [id*=timer]'
  },
  {
    name: 'Visual Bias',
    selector: 'button, input[type=button], input[type=submit]'
  }
];

let detected = [];
let ignored = 0;

function getElementKey(el) {
  if (!el) return '';
  let path = [];
  while (el && el.nodeType === 1 && el.tagName !== 'BODY') {
    let sibIdx = 0;
    let sib = el.previousElementSibling;
    while (sib) { sibIdx++; sib = sib.previousElementSibling; }
    path.unshift(`${el.tagName}:nth-child(${sibIdx+1})`);
    el = el.parentElement;
  }
  return path.join('>');
}

function isIgnored(el) {
  const key = getElementKey(el);
  return localStorage[`dph-ignore::${location.hostname}::${key}`] === 'true';
}

function setIgnored(el) {
  const key = getElementKey(el);
  localStorage[`dph-ignore::${location.hostname}::${key}`] = 'true';
}

function injectWarning(el, message) {
  if (isIgnored(el)) return;
  const bubble = document.createElement('div');
  bubble.className = 'inline-warning';
  bubble.innerHTML = `⚠️ ${message} <button>Ignore</button>`;
  bubble.querySelector('button').onclick = e => {
    setIgnored(el);
    bubble.remove();
    el.classList.remove('dph-highlight');
    updateTopBar();
  };
  el.classList.add('dph-highlight');
  el.insertAdjacentElement('afterend', bubble);
  detected.push({el, bubble});
  updateTopBar();
}

function updateTopBar() {
  let count = detected.filter(({el}) => !isIgnored(el) && document.body.contains(el)).length;
  let bar = document.getElementById('dph-topbar');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'dph-topbar';
    document.body.appendChild(bar);
  }
  if (count > 0) {
    bar.textContent = `⚠️ ${count} Dark Pattern${count>1?'s':''} Detected on This Page`;
    bar.style.display = '';
  } else {
    bar.style.display = 'none';
  }
}

function detectPatterns() {
  // Pre-checked checkboxes
  document.querySelectorAll(PATTERNS[0].selector).forEach(el => {
    injectWarning(el, 'This checkbox is pre-checked.');
  });

  // Confirmshaming
  document.querySelectorAll('button, a, label, span, div').forEach(el => {
    if (el.childElementCount === 0 && el.textContent) {
      for (const pat of PATTERNS[1].textPatterns) {
        if (pat.test(el.textContent)) {
          injectWarning(el, 'This may be a confirmshaming phrase.');
          break;
        }
      }
    }
  });

  // Fake urgency
  document.querySelectorAll(PATTERNS[2].selector).forEach(el => {
    if (/\d+\s*(seconds|minutes|left|remaining|hurry|now)/i.test(el.textContent)) {
      injectWarning(el, 'This may be a fake urgency timer.');
    }
  });

  // Visual bias (tiny opt-out vs bold accept)
  // Heuristic: find buttons with very small font or opacity
  document.querySelectorAll(PATTERNS[3].selector).forEach(el => {
    const style = window.getComputedStyle(el);
    if (parseFloat(style.fontSize) < 12 || parseFloat(style.opacity) < 0.5) {
      injectWarning(el, 'This button may be visually minimized (visual bias).');
    }
  });
}

// Run detection after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', detectPatterns);
} else {
  detectPatterns();
}

// Re-run on DOM changes (for SPAs)
const observer = new MutationObserver(() => {
  detected = [];
  document.querySelectorAll('.inline-warning').forEach(e => e.remove());
  document.querySelectorAll('.dph-highlight').forEach(e => e.classList.remove('dph-highlight'));
  detectPatterns();
});
observer.observe(document.body, {childList: true, subtree: true});
