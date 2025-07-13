import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("temperature-eval")
export class TemperatureEval extends LitElement {
  @property({ type: Number }) temperature = 0;

  render() {
    return html`<p>${this.temperature < 32 ? "freezing" : "not freezing"}</p>`;
  }
}
