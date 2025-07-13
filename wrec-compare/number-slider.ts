import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("number-slider")
export class NumberSlider extends LitElement {
  @property({ type: String }) label = "";
  @property({ type: Number }) value = 0;

  static styles = css`
    :host {
      display: block;
    }

    input[type="number"] {
      width: 6rem;
    }

    label {
      font-weight: bold;
    }
  `;

  render() {
    return html`
      <label>${this.label}</label>
      <input
        type="range"
        min="0"
        value=${this.value}
        @input=${this.handleChange}
      />
    `;
  }

  handleChange(event) {
    const detail = event.target.value;
    this.dispatchEvent(new CustomEvent("change", { detail }));
  }
}
