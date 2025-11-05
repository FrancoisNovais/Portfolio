/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import initProjectModal from '../src/assets/js/modal.js';

/**
 * Test suite for project modal functionality.
 */
describe('Project Modal', () => {
  /** @type {HTMLElement} Modal container */
  let modal;
  /** @type {HTMLElement} Modal body content */
  let modalBody;
  /** @type {HTMLElement} Modal close button */
  let closeBtn;
  /** @type {HTMLElement} Sample project card */
  let card;

  /**
   * Reset DOM before each test and initialize modal.
   */
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="project-modal" style="display:none">
        <div class="modal-content">
          <span class="modal-close"></span>
          <div class="modal-body project-content"></div>
        </div>
      </div>
      <div class="projects__card" data-url="test.html"></div>
    `;
    modal = document.getElementById('project-modal');
    modalBody = modal.querySelector('.modal-body');
    closeBtn = modal.querySelector('.modal-close');
    card = document.querySelector('.projects__card');

    // Initialize the modal behavior
    initProjectModal();
  });

  /**
   * Modal should be hidden on initial load.
   */
  it('modal should be hidden initially', () => {
    expect(modal.style.display).toBe('none');
  });

  /**
   * Clicking a project card opens the modal and loads content.
   */
  it('clicking on a card opens the modal', async () => {
    // Mock fetch for modal content
    global.fetch = vi.fn(() =>
      Promise.resolve({ text: () => Promise.resolve('<p>Project content</p>') })
    );

    card.click();
    // Wait a tick for async fetch
    await new Promise((r) => setTimeout(r, 0));

    expect(modal.style.display).toBe('flex');
    expect(modalBody.innerHTML).toBe('<p>Project content</p>');
  });

  /**
   * Clicking the close button hides the modal and clears content.
   */
  it('clicking close button hides modal', () => {
    modal.style.display = 'flex';
    modalBody.innerHTML = 'content';
    closeBtn.click();
    expect(modal.style.display).toBe('none');
    expect(modalBody.innerHTML).toBe('');
  });
});
