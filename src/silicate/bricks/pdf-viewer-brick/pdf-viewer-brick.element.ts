import { Element } from '../../../front/element';

@Element('brick-pdf-viewer')
export class PdfViewerBrickElement extends HTMLElement {
  private readonly $toggleBtn = this.querySelector<HTMLButtonElement>('.pdf-viewer__toggle-btn');
  private readonly $pdf = this.querySelector<HTMLIFrameElement>('.pdf-viewer__document');

  constructor() {
    super();

    this.open = false;
    this.$toggleBtn.addEventListener('click', () => {
      this.open = !this.open;
    });
  }

  get open(): boolean {
    return this.dataset.open === 'true';
  }

  set open(newOpen: boolean) {
    this.dataset.open = newOpen.toString();

    this.$pdf.style.display = this.open ? 'block' : 'none';
  }
}
