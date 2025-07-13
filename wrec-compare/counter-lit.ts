import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("counter-lit")
export class CounterLit extends LitElement {
  @property({ type: Number }) count = 0;

  static styles = css`
    :host {
      display: block;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    button {
      background-color: lightgreen;
    }

    button:disabled {
      background-color: gray;
    }
  `;

  render() {
    return html`
      <button
        @click=${() => this.count--}
        type="button"
        ?disabled=${this.count === 0}
      >
        -
      </button>
      <span>${this.count}</span>
      <button @click=${() => this.count++} type="button">+</button>
      <span>${this.count < 10 ? "single" : "double"}</span> digit
    `;
  }
}
