import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("radio-group")
export class RadioGroup extends LitElement {
  @property({ type: String }) default = "";
  @property({ type: String }) name = "";
  @property({ type: String }) options = "";
  @property({ type: String }) value = "";

  static styles = css`
    :host > div {
      display: flex;
      gap: 0.5rem;

      > div {
        display: flex;
        align-items: center;
      }
    }
  `;

  firstUpdated() {
    if (!this.default) this.default = this.options.split(",")[0];
    if (!this.value) this.value = this.default;
  }

  render() {
    // Lit re-renders the whole component on every radio button click.
    return html`
      <div>
        ${this.options.split(",").map((option) => this.makeRadio(option))}
      </div>
    `;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent("change", { detail: this.value }));
  }

  makeRadio(option) {
    //TODO: Why is this called after every option click?
    //TODO: This is not called each time in the wrec version.
    return html`
      <div>
        <input
          type="radio"
          id=${option}
          name=${this.name}
          @change=${this.handleChange}
          value=${option}
          ?checked=${option === this.value}
        />
        <label for=${option}>${option}</label>
      </div>
    `;
  }

  updated() {
    const inputs = this.renderRoot.querySelectorAll("input");
    for (const input of inputs) {
      input.checked = input.value === this.value;
    }
  }
}
