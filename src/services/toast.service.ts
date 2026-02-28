import {
  Injectable,
  Renderer2,
  RendererFactory2,
  inject,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

type ToastType = 'info' | 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private renderer: Renderer2;
  private document = inject(DOCUMENT);
  private container: HTMLElement | null = null;

  // Optional signal to track active count (useful for debugging / devtools)
  readonly activeCount = signal(0);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private createContainer(): void {
    if (this.container) return; // already created

    const container = this.renderer.createElement('div');

    this.renderer.setAttribute(container, 'id', 'toast-container');
    this.renderer.addClass(container, 'toast');
    this.renderer.addClass(container, 'toast-bottom');
    this.renderer.addClass(container, 'toast-end');

    this.renderer.appendChild(this.document.body, container);

    this.container = container;
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    this.createContainer();
    if (!this.container) return;
    const toast = this.renderer.createElement('div');

    this.renderer.addClass(toast, 'alert');
    this.renderer.addClass(toast, `alert-${type}`);
    this.renderer.addClass(toast, 'shadow-lg');

    const span = this.renderer.createElement('span');
    const text = this.renderer.createText(message);

    this.renderer.appendChild(span, text);
    this.renderer.appendChild(toast, span);

    const button = this.renderer.createElement('button');
    this.renderer.addClass(button, 'ml-4');
    this.renderer.addClass(button, 'btn');
    this.renderer.addClass(button, 'btn-sm');
    this.renderer.addClass(button, 'btn-ghost');

    const closeText = this.renderer.createText('x');
    this.renderer.appendChild(button, closeText);

    const removeToast = () => {
      if (this.container) {
        this.renderer.removeChild(this.container, toast);
      }
    };

    this.renderer.listen(button, 'click', removeToast);

    this.renderer.appendChild(toast, button);

    this.renderer.appendChild(this.container, toast);

    setTimeout(removeToast, 5000);
  }
}
