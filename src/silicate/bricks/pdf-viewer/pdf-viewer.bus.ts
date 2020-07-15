/**
 * Register the pdf viewers toggles
 */
function registerPdfViewers(): void {
  const toggles = document.getElementsByClassName('pdf-viewer__toggle-btn');

  for (const toggle of toggles) {
    toggle.addEventListener('click', () => {
      const $brick = toggle.parentElement;

      $brick.toggleAttribute('data-open');

      const $iframe: HTMLIFrameElement = toggle.parentElement.querySelector('.pdf-viewer__document');

      if ($brick.dataset.hasOwnProperty('open')) {
        $iframe.style.display = 'block';
      } else {
        $iframe.style.display = 'none';
      }
    });
  }
}

registerPdfViewers();