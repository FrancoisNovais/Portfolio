/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Simple typing function from your modal code
 * @param {HTMLElement} el Element where text is typed
 * @param {string} text Text to type
 * @param {number} speed Delay per character (ms)
 * @returns {Promise<void>}
 */
function typeText(el, text, speed = 10) {
  return new Promise((resolve) => {
    let index = 0;
    function type() {
      if (index < text.length) {
        el.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

describe('Typed Text', () => {
  /** @type {HTMLElement} Typed text element */
  let typedEl;

  beforeEach(() => {
    document.body.innerHTML = `<span id="typed-text"></span>`;
    typedEl = document.getElementById('typed-text');
  });

  it('should type text into element', async () => {
    const text = 'Hello World';
    await typeText(typedEl, text, 1); // vitesse ultra rapide pour test
    expect(typedEl.textContent).toBe(text);
  });

  it('should start empty', () => {
    expect(typedEl.textContent).toBe('');
  });
});
