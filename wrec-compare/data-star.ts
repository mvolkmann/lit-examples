import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// This demonstrates how wrec can implement
// some features I saw in a demo of data-star.
@customElement("data-star")
export class DataStar extends LitElement {
  @property({ type: String }) username = "";

  static styles = css`
    .hide {
      display: none;
    }
  `;

  render() {
    return html`
      <input value=${this.username} />
      <div>My name is <span>${this.username.toUpperCase()}</span>.</div>
      <div>length = <span>${this.username.length}</span></div>
      <button class=${this.username.length > 2 ? "" : "hide"}>Save</button>
    `;
  }
}
