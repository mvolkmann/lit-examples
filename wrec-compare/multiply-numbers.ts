import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("multiply-numbers")
export class MultiplyNumbers extends LitElement {
  @property({ type: Number }) n1 = 0;
  @property({ type: Number }) n2 = 0;

  render() {
    return html`
      <div>
        <span>${this.n1}</span> * <span>${this.n2}</span> =
        <span>${this.n1 * this.n2}</span>
      </div>
    `;
  }
}
