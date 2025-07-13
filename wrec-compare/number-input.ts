import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("number-input")
class NumberInput extends LitElement {
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
      <label>this.label</label>
      <button
        ?disabled=${this.value === 0}
        @onclick=${() => this.value--}
        type="button"
      >
        -
      </button>
      <input type="number" value="this.value" />
      <button @click=${() => this.value++} type="button">+</button>
    `;
  }
}
