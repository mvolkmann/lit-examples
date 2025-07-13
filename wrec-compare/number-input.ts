import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("number-input")
export class NumberInput extends LitElement {
  @property({ type: String }) label = "";
  @property({ type: Number }) value = 0;

  static styles = css`
    button {
      background-color: cornflowerblue;
      border: none;
      border-radius: 50%;
      color: white;
    }

    input[type="number"] {
      text-align: right;
      width: 2rem;
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      appearance: none;
    }

    label {
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <label>${this.label}</label>
      <button
        ?disabled=${this.value === 0}
        @click=${this.decrement}
        type="button"
      >
        -
      </button>
      <input type="number" value=${this.value} @input=${this.handleInput} />
      <button @click=${this.increment} type="button">+</button>
    `;
  }

  decrement() {
    this.dispatchChange(--this.value);
  }

  increment() {
    this.dispatchChange(++this.value);
  }

  handleInput(event) {
    this.dispatchChange(event.target.value);
  }

  dispatchChange(detail) {
    this.dispatchEvent(new CustomEvent("change", { detail }));
  }
}
