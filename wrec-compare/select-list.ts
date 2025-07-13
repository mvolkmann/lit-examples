import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("select-list")
export class SelectList extends LitElement {
  @property({ type: String }) name = "";
  @property({ type: String }) options = "";
  @property({ type: String }) value = "";

  firstUpdated() {
    const options = this.options.split(",");
    if (!this.value || !options.includes(this.value)) {
      this.value = options[0];
    }
  }

  render() {
    return html`
      <select name=${this.name} value="this.value" @change=${this.handleChange}>
        ${this.options.split(",").map((option) => this.makeOption(option))}
      </select>
    `;
  }

  // This method cannot be private because it is
  // called from the expression in the html method.
  makeOption(option) {
    return html` <option value=${option}>${option}</option> `;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
  }
}
