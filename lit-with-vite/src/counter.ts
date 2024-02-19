import {css, html, LitElement} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('my-counter')
export class Counter extends LitElement {
  @state() count = 0;

  override render() {
    return html`
      <button ?disabled=${this.count === 0} @click=${() => this.count--}>
        -
      </button>
      <div>${this.count}</div>
      <button @click=${() => this.count++}>+</button>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      gap: 1rem;
      align-items: center;

      font-family: monospace;
      font-size: 2rem;
    }

    button {
      --size: 3rem;
      width: var(--size);
      height: var(--size);

      background-color: orange;
      border: none;
      border-radius: 50%;
      font-size: 2rem;
    }
  `;
}
