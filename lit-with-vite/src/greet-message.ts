import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('greet-message')
export class AlertOnClick extends LitElement {
  // @property({type: String}) name = 'World';
  @property({type: String}) name = '';

  render() {
    if (!this.name) throw new Error('name is a required attribute');
    return html`<div>Hello, ${this.name}!</div>`;
  }

  static styles = css`
    :host {
      color: purple;
    }
  `;
}
