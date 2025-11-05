/**
 * Simple typing animation for the logo.
 * @param {string} selector - CSS selector of the element to type into
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 */
export default function typeText(selector, text, speed = 100) {
  const el = document.querySelector(selector);
  if (!el) return;

  let index = 0;
  function type() {
    if (index < text.length) {
      el.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  window.addEventListener('DOMContentLoaded', type);
}
